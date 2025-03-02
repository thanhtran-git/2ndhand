import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

export default function AdTypeField() {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Gebot / Gesuch</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="offer" />
                <span>Ich biete</span>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="search" />
                <span>Ich suche</span>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
