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
              <SelectContent>
                <SelectItem value="Autos">Autos</SelectItem>
                <SelectItem value="Fahrrad">Fahrräder & Zubehör</SelectItem>
                <SelectItem value="Motorrad">Motorrad</SelectItem>
                <SelectItem value="PC">PC</SelectItem>
                <SelectItem value="Haushaltsgerate">Haushaltsgeräte</SelectItem>
                <SelectItem value="Unterhaltungselektronik">
                  Unterhaltungselektronik
                </SelectItem>
                <SelectItem value="Mobel">Möbel</SelectItem>
                <SelectItem value="Pflanzen">Pflanzen</SelectItem>
                <SelectItem value="Kleidung">Kleidung & Schuhe</SelectItem>
                <SelectItem value="Accessoires">
                  Uhren, Taschen, Schmuck
                </SelectItem>
                <SelectItem value="Kunst">Kunst & Antiquitäten</SelectItem>
                <SelectItem value="Sammelbares">Sammelbares</SelectItem>
                <SelectItem value="Bucher">Bücher</SelectItem>
                <SelectItem value="CD">CDs & DVDs</SelectItem>
                <SelectItem value="Tickets">Tickets</SelectItem>
                <SelectItem value="Sammelkarten">Sammelkarten</SelectItem>
                <SelectItem value="Sonstiges">Sonstiges</SelectItem>
              </SelectContent>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
