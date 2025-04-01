import AppEmptyList from "../app-empty-list";
import { Loader2, Search } from "lucide-react";
import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@/design/components/ui/input";
import { Control, useFormContext } from "react-hook-form";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/design/components/ui/form";
import Show from "../utils/show";
import Each from "../utils/each";
import { cn } from "@/design/lib/utils";

export interface IAppFormAutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  bindKey?: string;
  suggestions: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  control: Control<any>;
  popoverClassName?: string;
  emptyIcon?: React.ReactNode;
  containerClassName?: string;
  onTermChanged?: (term: string) => void;
  renderItem?: (item: any) => React.ReactNode;
}

export default function AppFormAutoComplete({
  bindKey,
  isLoading,
  renderItem,
  suggestions,
  onTermChanged,
  popoverClassName,
  containerClassName,
  emptyMessage = "No results found",
  emptyIcon = <Search className="w-4 h-4" />,
  ...props
}: IAppFormAutoCompleteProps) {
  const { control, name, label, required } = props;

  const { setValue, watch } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const skipNextSearchRef = useRef(false);

  const fieldValue = watch(name);
  const debouncedSearchTerm = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (fieldValue) {
      setInputValue(getItemValue(fieldValue));
    }
  }, [fieldValue]);

  useEffect(() => {
    if (debouncedSearchTerm && !skipNextSearchRef.current) {
      onTermChanged?.(debouncedSearchTerm);
      setShowSuggestions(true);
    }
    skipNextSearchRef.current = false;
  }, [debouncedSearchTerm, onTermChanged]);

  const getItemValue = useCallback(
    (item: any): string => {
      if (typeof item === "string") return item;
      if (bindKey && typeof item === "object") return item[bindKey] || "";
      return item.toString();
    },
    [bindKey]
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    setValue(name, value, { shouldValidate: true });
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: any) => {
    skipNextSearchRef.current = true;
    const value = getItemValue(suggestion);
    setInputValue(value);
    setValue(name, value, { shouldValidate: true });
    setShowSuggestions(false);
    setIsFocused(false);
  };

  useEffect(() => {
    if (!isFocused && !isLoading) {
      setTimeout(() => setShowSuggestions(false), 200);
    }
  }, [isFocused, isLoading]);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={containerClassName || ""}>
          <div className="relative">
            <Show>
              <Show.When condition={!!label}>
                <FormLabel>
                  {required && <span className="text-red-400 mr-0.5">*</span>}
                  {label}
                </FormLabel>
              </Show.When>
            </Show>
            <FormControl>
              <Input
                {...field}
                {...props}
                autoComplete="off"
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => setIsFocused(false)}
              />
            </FormControl>

            <Show>
              <Show.When condition={showSuggestions || !!isLoading}>
                <ul
                  className={cn(
                    "mt-1 rounded max-h-48 overflow-y-auto bg-background shadow-lg absolute z-10 w-full border border-foreground/10",
                    popoverClassName
                  )}
                >
                  <Show>
                    <Show.When condition={!!isLoading}>
                      <li className="px-4 py-8 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-foreground/40 animate-spin" />
                      </li>
                    </Show.When>
                    <Show.Else>
                      <Show>
                        <Show.When condition={suggestions.length > 0}>
                          <Each
                            data={suggestions}
                            render={(suggestion, index) => (
                              <li
                                key={index}
                                onMouseDown={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                className="px-4 py-2 cursor-pointer hover:bg-muted"
                              >
                                {renderItem
                                  ? renderItem(suggestion)
                                  : getItemValue(suggestion)}
                              </li>
                            )}
                          />
                        </Show.When>
                        <Show.Else>
                          <li className="p-4">
                            <AppEmptyList />
                          </li>
                        </Show.Else>
                      </Show>
                    </Show.Else>
                  </Show>
                </ul>
              </Show.When>
            </Show>
          </div>
        </FormItem>
      )}
    />
  );
}
