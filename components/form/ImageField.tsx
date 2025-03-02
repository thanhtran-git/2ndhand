"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ImageUrlField() {
  const { control, setValue, clearErrors } = useFormContext();
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowImageUrlInput(event.target.checked);

    // Optionally, reset the imageUrl value when the checkbox is unchecked
    if (!event.target.checked) {
      setValue("imageUrl", undefined); // Reset imageUrl in the form context
      clearErrors("imageUrl"); // Optionally clear any validation errors for imageUrl
    }
  };

  return (
    <FormItem>
      <FormLabel>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        Bild-URL (optional)
      </FormLabel>
      {showImageUrlInput && (
        <FormField
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <FormControl>
              <Input
                placeholder="Füge die URL eines gehosteten Bildes ein"
                {...field}
              />
            </FormControl>
          )}
        />
      )}
      <FormMessage />
    </FormItem>
  );
}
