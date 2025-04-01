import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "@/design/components/ui/input";

interface IAppFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: string;
  control: Control<any>;
  containerClassName?: string;
}
export default function AppFormInput(props: IAppFormInputProps) {
  const { containerClassName, ...inputProps } = props;

  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem className={containerClassName || ""}>
          {props.label && (
            <FormLabel>
              {props.required && <span className="text-red-400 mr-0.5">*</span>}
              {props.label}
            </FormLabel>
          )}
          <FormControl>
            <Input {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
