"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// ✅ Validation du formulaire
const formSchema = z.object({
  typeInfo: z.string().min(1, "Type d'information requis"),
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro invalide"),
  commentaire: z.string().min(5, "Commentaire obligatoire"),
});

export default function InformationAgent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeInfo: "",
      nom: "",
      telephone: "",
      commentaire: "",
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Données Informations :", data);
    alert("Informations envoyées avec succès !");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 border-r-3">
      <div className="max-w-3xl mx-auto">
        {/* 🟦 En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Ligne 2020
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">
            Informations sur la ligne 2020
          </h1>
          <p className="text-white mt-2">
            Merci de renseigner les détails ci-dessous afin d’obtenir ou de
            signaler une information liée à la ligne 2020.
          </p>
        </div>

        {/* 🧾 Formulaire */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Type d'info */}
              <FormField
                control={form.control}
                name="typeInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'information</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="horaire">
                          Horaire / Itinéraire
                        </SelectItem>
                        <SelectItem value="tarif">
                          Tarif ou paiement
                        </SelectItem>
                        <SelectItem value="objet-perdu">
                          Objet perdu
                        </SelectItem>
                        <SelectItem value="autre">Autre information</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Téléphone */}
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: +253 77 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Commentaire */}
              <FormField
                control={form.control}
                name="commentaire"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaire</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Votre commentaire..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="border-radius-8 text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold"
                >
                  Soumettre
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
