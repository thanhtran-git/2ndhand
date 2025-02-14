"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"

const formSchema = z.object({
  type: z.enum(["offer", "search"], {
    required_error: "Bitte wählen Sie, ob Sie anbieten oder suchen",
  }),
  title: z.string().min(2, {
    message: "Der Titel muss mindestens 2 Zeichen lang sein.",
  }),
  category: z.string({
    required_error: "Bitte wählen Sie eine Kategorie.",
  }),
  price: z.string(),
  priceType: z.string(),
  description: z.string(),
  postalCode: z.string().min(5).max(5),
  city: z.string(),
  street: z.string().optional(),
  showFullAddress: z.boolean().default(false),
  name: z.string().min(2),
  terms: z.boolean().refine((val) => val === true, {
    message: "Sie müssen die Nutzungsbedingungen akzeptieren",
  }),
})

export default function ClassifiedForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "offer",
      showFullAddress: false,
      terms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                            <FormLabel className="font-normal">Ich biete</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="search" />
                            </FormControl>
                            <FormLabel className="font-normal">Ich suche</FormLabel>
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
                      <FormDescription>Tipp: Mit einem aussagekräftigen Titel verkaufst du besser</FormDescription>
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
                          <SelectItem value="electronics">Elektronik</SelectItem>
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
                              ,00 EUR
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
                            <SelectItem value="negotiable">Verhandelbar</SelectItem>
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
                        <Textarea placeholder="Beschreibe deinen Artikel" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>Du hast noch 4000 Zeichen übrig</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Bilder (empfohlen)</FormLabel>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button type="button" variant="outline">
                        Bilder hinzufügen
                      </Button>
                    </div>
                  </div>
                  <FormDescription>
                    Tipp: Lade bis zu 20 Bilder mit einer maximalen Größe von 12 MB hoch.
                  </FormDescription>
                </div>

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
                          <Input placeholder="Straße und Hausnummer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="showFullAddress"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Vollständige Adresse anzeigen</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormDescription>
                    Tipp: Standardmäßig zeigen wir nur die Postleitzahl und den Ort an. Wenn du die vollständige Adresse
                    anzeigen lassen möchtest, setze bitte einen Haken im Kästchen.
                  </FormDescription>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Deine Angaben</h3>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Tipp: Du kannst deinen Profilnamen jederzeit in den Einstellungen ändern
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Ja, zu regelmäßigen Mails von uns mit Produktinfos, Tipps, Aktionen und spannenden Geschichten
                          über uns und mobile.de - Abmelden geht jederzeit
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" type="button">
              Vorschau
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              Anzeige aufgeben
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}

