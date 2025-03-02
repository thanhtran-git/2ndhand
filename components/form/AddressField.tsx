import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function AddressField() {
  const { control } = useFormContext();
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <FormField
          control={control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Ort</FormLabel>
              <FormControl>
                <Input placeholder="PLZ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>&nbsp;</FormLabel>
              <FormControl>
                <Input placeholder="Stadt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
