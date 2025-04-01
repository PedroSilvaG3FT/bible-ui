import { cn } from "@/design/lib/utils";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useBible } from "@/contexts/bible.context";
import { Input } from "@/design/components/ui/input";
import { Button } from "@/design/components/ui/button";
import Show from "@/modules/@shared/components/utils/show";
import Each from "@/modules/@shared/components/utils/each";
import { StringUtil } from "@/modules/@shared/util/string.util";
import { CommandShortcut } from "@/design/components/ui/command";
import AppEmptyList from "@/modules/@shared/components/app-empty-list";
import { IBibleItem } from "@/modules/@shared/interfaces/bible.interface";

interface IProps {
  className?: string;
  inputClassName?: string;
  isDisabledBackdropBlur?: boolean;
}

export default function BookSearchComponent(props: IProps) {
  const navigate = useNavigate();

  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { oldTestamentData, newTestamentData } = useBible();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IBibleItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setOptions([...oldTestamentData, ...newTestamentData]);
  }, [oldTestamentData, newTestamentData]);

  const filteredOptions = options.filter((book) =>
    StringUtil.removeAccents(book.name.toLowerCase()).includes(
      StringUtil.removeAccents(query.toLowerCase())
    )
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (item: IBibleItem) => {
    setQuery("");
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
    navigate(`/${item.abbrev}/1`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }

      if (!open || filteredOptions.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const nextIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          scrollToHighlighted(nextIndex);
          return nextIndex;
        });
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const nextIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          scrollToHighlighted(nextIndex);
          return nextIndex;
        });
      }

      if (event.key === "Enter" && highlightedIndex !== -1) {
        event.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, [open, filteredOptions, highlightedIndex]);

  const scrollToHighlighted = (index: number) => {
    if (listRef.current) {
      const item = listRef.current.children[index] as HTMLElement;
      item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  return (
    <article className={cn("relative", props.className)} ref={dropdownRef}>
      <Input
        type="text"
        value={query}
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        placeholder="Buscar um livro..."
        rightSlot={
          <CommandShortcut className="mobile:hidden">⌘ + K</CommandShortcut>
        }
        className={cn(
          "h-12 relative z-20 rounded-sm cursor-pointer !bg-transparent",
          props.inputClassName
        )}
      />

      <Show>
        <Show.When condition={open}>
          <article
            onClick={() => setOpen(false)}
            className={cn(
              "h-full w-full fixed top-0 left-0 z-10",
              !props.isDisabledBackdropBlur && "backdrop-blur-md"
            )}
          ></article>

          <ul
            ref={listRef}
            className="absolute z-20 left-0 right-0 mt-1 bg-background border rounded-sm shadow-lg max-h-64 overflow-y-auto"
          >
            <Each
              data={filteredOptions}
              empty={<AppEmptyList text="Livro não encontrado" />}
              render={(book, index) => (
                <li
                  key={book.name}
                  onClick={() => handleSelect(book)}
                  className={`p-4 flex items-center justify-between border-b cursor-pointer group hover:bg-secondary text-sm ${
                    highlightedIndex === index ? "bg-secondary" : ""
                  }`}
                >
                  <section>
                    <p>{book.name}</p>
                    <h6 className="text-foreground/50 text-sm">
                      {book.chapters.length} Capitulos
                    </h6>
                  </section>

                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "relative transition-all duration-500 left-0 group-hover:left-2",
                      highlightedIndex === index ? "left-2" : ""
                    )}
                  >
                    <ArrowRight />
                  </Button>
                </li>
              )}
            />
          </ul>
        </Show.When>
      </Show>
    </article>
  );
}
