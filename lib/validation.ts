import * as z from "zod";

export const formSchema = z.object({
  type: z.enum(["offer", "search"]),
  title: z
    .string()
    .min(6, { message: "Der Titel muss mindestens 6 Zeichen lang sein." })
    .max(70, { message: "Der Titel darf maximal 100 Zeichen lang sein." })
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s\-.,!?()]+$/, {
      message: "Nur Buchstaben, Zahlen und übliche Satzzeichen erlaubt.",
    }),

  category: z.string({
    required_error: "Bitte wählen Sie eine Kategorie.",
  }),
  imageUrl: z
    .string()
    .url({
      message: "Die URL muss mit https:// beginnen.",
    })
    .or(z.literal(""))
    .nullable()
    .optional(),
  price: z.coerce.number().max(999999, {
    message: "Der Preis darf nicht mehr als 999.999€ betragen.",
  }),
  priceType: z.string(),
  description: z
    .string()
    .min(10, {
      message: "Die Beschreibung muss mindestens 10 Zeichen lang sein.",
    })
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s\-.,!?/()]+$/, {
      message: "Nur Buchstaben, Zahlen und übliche Satzzeichen erlaubt.",
    }),
  postalCode: z
    .string()
    .regex(/^\d*$/, "PLZ darf nur Zahlen enthalten")
    .min(5, "PLZ muss mindestens 5 Zeichen lang sein")
    .max(5, "PLZ darf nicht mehr als 5 Zeichen lang sein")
    .default(""),
  city: z
    .string()
    .min(2, { message: "Der Ortsname muss mindestens 2 Zeichen lang sein." })
    .max(50, { message: "Der Ortsname darf maximal 60 Zeichen lang sein." })
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, {
      message: "Nur Buchstaben, Leerzeichen und Bindestriche erlaubt.",
    }),
});

export type ClassifiedFormValues = z.infer<typeof formSchema>;
