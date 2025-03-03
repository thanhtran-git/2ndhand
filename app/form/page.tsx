"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { formSchema, ClassifiedFormValues } from "@/lib/validation";
import { toast, Toaster } from "sonner";

import AdTypeField from "@/components/form/AdTypeField";
import TitleField from "@/components/form/TitleField";
import CategoryField from "@/components/form/CategoryField";
import PriceField from "@/components/form/PriceField";
import DescriptionField from "@/components/form/DescriptionField";
import ImageField from "@/components/form/ImageField";
import AddressField from "@/components/form/AddressField";
import submitAd from "@/app/actions/submitAd";

export default function ClassifiedForm() {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm<ClassifiedFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "offer",
      title: "",
      category: "",
      price: 1,
      imageUrl: "",
      priceType: "",
      description: "",
      postalCode: "",
      city: "",
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/sign-in");
  }

  const onSubmit = async (values: ClassifiedFormValues) => {
    setLoading(true);
    try {
      const response = await submitAd(values);

      if (response?.success) {
        toast.success("Anzeige erfolgreich aufgegeben.", {
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
          position: "bottom-center",
        });

        setTimeout(() => {
          router.push("/mein-konto");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Inserat aufgeben</h2>
              <div className="space-y-7">
                <AdTypeField />
                <TitleField />
                <CategoryField />
                <PriceField />
                <DescriptionField />
                <ImageField />
                <AddressField />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#89db53] hover:bg-green-600 text-white w-full"
            >
              {loading ? "Speichern..." : "Anzeige aufgeben"}
            </Button>
          </div>
        </form>
      </FormProvider>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
