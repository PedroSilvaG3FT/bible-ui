import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/design/components/ui/form";
import { Control } from "react-hook-form";
import { SwitchProps } from "@radix-ui/react-switch";
import { Switch } from "@/design/components/ui/switch";

interface IAppFormSwitchProps extends SwitchProps {
  name: string;
  label: string;
  control: Control<any>;
}
export default function AppFormSwitch(props: IAppFormSwitchProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <Switch
                {...field}
                {...props}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{props.label}</FormLabel>
          </FormItem>

          <FormMessage />
        </>
      )}
    />
  );
}
