"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  type: z.enum(["offer", "search"], {
    required_error: "Bitte wählen Sie, ob Sie anbieten oder suchen",
  }),
  title: z.string().min(6, {
    message: "Der Titel muss mindestens 6 Zeichen lang sein.",
  }),
  category: z.string({
    required_error: "Bitte wählen Sie eine Kategorie.",
  }),
  price: z.coerce.number(),
  priceType: z.string(),
  description: z.string(),
  postalCode: z
    .string()
    .regex(/^\d*$/, "PLZ darf nur Zahlen enthalten")
    .min(5, "PLZ muss mindestens 5 Zeichen lang sein")
    .max(5, "PLZ darf nicht mehr als 5 Zeichen lang sein")
    .default(""),
  city: z.string(),
  street: z.string().optional(),
});

export default function ClassifiedForm() {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "offer",
      title: "",
      category: "",
      price: 1,
      priceType: "",
      description: "",
      postalCode: "",
      city: "",
      street: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session || !session.user) {
      alert("Du musst eingeloggt sein, um eine Anzeige zu erstellen.");
      return;
    }

    setLoading(true);

    const classifiedAdData = {
      ...values,
      userId: session.user.id, // Attach userId from session
      name: session.user.name, // Attach user's name from session
    };

    try {
      console.log("Sending Data:", classifiedAdData);
      const response = await fetch("/api/classifiedads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classifiedAdData),
      });

      if (response.ok) {
        alert("Anzeige erfolgreich aufgegeben!");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert("Fehler beim Speichern: " + errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Inserat aufgeben</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
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
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="offer" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Ich biete
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="search" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Ich suche
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input placeholder="Titel eingeben" {...field} />
                      </FormControl>
                      <FormDescription>
                        Tipp: Mit einem aussagekräftigen Titel verkaufst du
                        besser
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                          <SelectItem value="electronics">
                            Elektronik
                          </SelectItem>
                          <SelectItem value="furniture">Möbel</SelectItem>
                          <SelectItem value="clothing">Kleidung</SelectItem>
                          <SelectItem value="other">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                            <SelectItem value="negotiable">
                              Verhandelbar
                            </SelectItem>
                            <SelectItem value="free">Zu verschenken</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Beschreibe deinen Artikel"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Du hast noch 4000 Zeichen übrig
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <div className="space-y-2">
                  <FormLabel>Bilder</FormLabel>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button type="button" variant="outline">
                        Bilder hinzufügen
                      </Button>
                    </div>
                  </div>
                  <FormDescription>
                    Tipp: Lade bis zu 20 Bilder mit einer maximalen Größe von 5 MB hoch.
                  </FormDescription>
                </div> */}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ort</h3>
                  <div className="flex flex-wrap gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>PLZ</FormLabel>
                          <FormControl>
                            <Input placeholder="PLZ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Stadt</FormLabel>
                          <FormControl>
                            <Input placeholder="Stadt" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Straße/Nr. (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Straße und Hausnummer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" type="button">
              Vorschau
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Speichern..." : "Anzeige aufgeben"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
