"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PriceFields() {
  const { control } = useFormContext();
  return (
    <div className="flex flex-wrap gap-4">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Preis</FormLabel>
            <FormControl>
              <div className="flex">
                <Input {...field} className="rounded-r-none" />
                <div className="flex items-center px-3 border border-l-0 border-input bg-muted rounded-r-md">
                  €
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="priceType"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>&nbsp;</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Preistyp" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fixed">Festpreis</SelectItem>
                <SelectItem value="negotiable">Verhandelbar</SelectItem>
                <SelectItem value="free">Zu verschenken</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
