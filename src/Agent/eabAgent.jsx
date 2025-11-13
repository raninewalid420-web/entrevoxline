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

// ✅ Schéma de validation
const formSchema = z.object({
  nomClient: z.string().min(2, "Le nom est requis."),
  telephone: z
    .string()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^\d+$/, "Seulement des chiffres."),
  service: z.string().min(1, "Le service est requis."),
  doleance: z.string().min(5, "Veuillez décrire votre doléance."),
  reponse: z.string().min(3, "Veuillez indiquer la réponse à fournir."),
  compte: z.string().optional(),
});

export default function EABAgent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomClient: "",
      telephone: "",
      service: "",
      doleance: "",
      reponse: "",
      compte: "",
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Données EAB envoyées :", data);
    alert("✅ Formulaire East Africa Bank soumis avec succès !");
    form.reset();
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded uppercase tracking-wide">
              EAST AFRICA BANK - SERVICE CLIENT
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Formulaire East Africa Bank
          </h1>
          <p className="text-white">
            Enregistrement des doléances et plaintes clients
          </p>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Informations du client
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Nom du client */}
              <FormField
                control={form.control}
                name="nomClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Nom du client</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Abdirahman Mohamed"
                        {...field}
                        className="border-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Téléphone & Compte */}
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Numéro de téléphone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="77 00 00 00"
                          {...field}
                          className="border-slate-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="compte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Numéro de compte (optionnel)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 0021....45"
                          {...field}
                          className="border-slate-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Service concerné</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-slate-200 shadow-lg">
                        <SelectItem value="Compte" className="hover:bg-slate-100 cursor-pointer">Compte bancaire</SelectItem>
                        <SelectItem value="Crédit" className="hover:bg-slate-100 cursor-pointer">Crédit / Prêt</SelectItem>
                        <SelectItem value="Carte bancaire" className="hover:bg-slate-100 cursor-pointer">Carte bancaire</SelectItem>
                        <SelectItem value="Service Mobile" className="hover:bg-slate-100 cursor-pointer">Service Mobile Banking</SelectItem>
                        <SelectItem value="Transfert" className="hover:bg-slate-100 cursor-pointer">Transfert d'argent</SelectItem>
                        <SelectItem value="Autre" className="hover:bg-slate-100 cursor-pointer">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Doléance */}
              <FormField
                control={form.control}
                name="doleance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Doléance / Plainte du client</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez la doléance ou la plainte du client..."
                        {...field}
                        className="border-slate-300 min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Réponse à fournir */}
              <FormField
                control={form.control}
                name="reponse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Réponse fournie au client</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez la réponse ou solution apportée..."
                        {...field}
                        className="border-slate-300 min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Boutons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold"
                >
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Message final */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
          <p className="text-blue-900 text-sm leading-relaxed">
            La doléance a été enregistrée avec succès. Un agent de la East Africa Bank assurera le suivi de cette demande.
          </p>
        </div>
      </div>
    </div>
  );
}