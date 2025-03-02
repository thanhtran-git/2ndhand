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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MAX_LENGTH = 50;

export default function TitleField() {
  const { control } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Titel</FormLabel>
          <FormControl>
            <Input
              placeholder="Titel eingeben"
              maxLength={MAX_LENGTH}
              {...field}
              onChange={(e) => {
                setCharCount(e.target.value.length);
                field.onChange(e);
              }}
            />
          </FormControl>
          <FormDescription
            className={`text-sm ${
              charCount >= MAX_LENGTH ? "text-red-500" : "text-gray-500"
            }`}
          >
            {MAX_LENGTH - charCount} Zeichen übrig
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
