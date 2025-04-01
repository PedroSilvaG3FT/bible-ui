import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import { Textarea, TextareaProps } from "@/design/components/ui/textarea";

interface IAppFormTextareaProps extends TextareaProps {
  name: string;
  label: string;
  control: Control<any>;
}
export default function AppFormTextarea(props: IAppFormTextareaProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          {props.label && (
            <FormLabel>
              {props.required && <span className="text-red-400 mr-0.5">*</span>}
              {props.label}
            </FormLabel>
          )}
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
