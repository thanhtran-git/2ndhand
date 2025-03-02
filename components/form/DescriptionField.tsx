"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionField() {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Beschreibung</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Beschreibe deinen Artikel"
              className="resize-none"
              maxLength={300}
              {...field}
            />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
