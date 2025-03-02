"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoryField() {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kategorie</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Wähle deine Kategorie" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="bike">Fahrrädder & Zubehör</SelectItem>
              <SelectItem value="electronics">Elektronik</SelectItem>
              <SelectItem value="furniture">Möbel</SelectItem>
              <SelectItem value="clothing">Kleidung & Schuhe</SelectItem>
              <SelectItem value="art">Kunst & Antiquitäten</SelectItem>
              <SelectItem value="sport">Sport & Freizeit</SelectItem>
              <SelectItem value="books-music">Buch & Musik</SelectItem>
              <SelectItem value="CD">CDs & DVDs</SelectItem>
              <SelectItem value="photography">Bilder & Fotografie</SelectItem>
              <SelectItem value="tickets">Tickets</SelectItem>
              <SelectItem value="collectibles">Sammelbares</SelectItem>
              <SelectItem value="other">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
