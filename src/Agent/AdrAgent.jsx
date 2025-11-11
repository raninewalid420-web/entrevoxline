"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ✅ Validation Schema avec zod
const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  telephone: z.string().min(8, "Le numéro est requis."),
  email: z.string().email("Adresse email invalide."),
  adresse: z.string().min(3, "Adresse requise."),
  typeIncident: z.string().min(3, "Veuillez préciser le type d'incident."),
  description: z.string().min(5, "Veuillez entrer une description."),
  lieuIncident: z.string().min(3, "Veuillez indiquer le lieu."),
  responsable: z.string().optional(),
  date: z.string().min(1, "Date obligatoire."),
  dejaSignale: z.enum(["oui", "non"]),
});

export default function AdrForm() {
  const [casSensible, setCasSensible] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      email: "",
      adresse: "",
      typeIncident: "",
      description: "",
      lieuIncident: "",
      responsable: "",
      date: "",
      dejaSignale: "non",
    },
  });

  const onSubmit = (values) => {
    console.log("✅ Données soumises :", values);
    alert("Merci ! Votre plainte a été enregistrée avec succès.");
    form.reset();
    setCasSensible(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-slate-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
              ADR - LIGNE VERTE 2020
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Enregistrement des Plaintes
          </h1>
          <p className="text-slate-600">
            Bonjour et bienvenue sur la ligne verte 2020 du projet PCERD. Nous sommes ici pour recueillir vos plaintes ou doléances afin de mieux vous servir.
          </p>
        </div>

        {/* Boutons de sélection de cas */}
        <div className="flex gap-4 mb-6">
          <Button 
            onClick={() => setCasSensible(false)}
            className={`${!casSensible ? 'bg-slate-700 hover:bg-slate-800' : 'bg-slate-300 hover:bg-slate-400'} transition-colors`}
          >
            Cas Normal
          </Button>
          <Button 
            onClick={() => setCasSensible(true)}
            className={`${casSensible ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-300 hover:bg-slate-400'} transition-colors`}
          >
            Cas Sensible (VBG, EAS, HS)
          </Button>
        </div>

        {/* Script d'accueil pour cas sensible */}
        {casSensible && (
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">Script d'accueil - Cas Sensible</h3>
                <div className="space-y-3 text-sm text-red-800 leading-relaxed">
                  <p><strong>Agent :</strong> Bonjour et bienvenue dans notre service, comment puis-je vous aider aujourd'hui ?</p>
                  <p><strong>Agent :</strong> Merci de m'avoir partagé cela, je suis désolé d'apprendre ce que vous avez traversé et je veux que vous sachiez que vous êtes en sécurité ici, nous sommes là pour vous soutenir.</p>
                  <p><strong>Agent :</strong> Pour que votre plainte soit traitée de la meilleure manière possible, je vais vous mettre en contact avec un(e) de nos conseiller(ère)s spécialisé(e)s qui pourra vous aider et vous accompagner dans ce processus.</p>
                  <p><strong>Agent :</strong> D'accord, je vais transférer votre appel immédiatement et merci de votre patience.</p>
                </div>
                <div className="mt-4 pt-4 border-t border-red-200">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Transférer l'appel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              {casSensible ? "Formulaire Cas Sensible (VBG, EAS, HS)" : "Formulaire des Plaintes"}
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="77 00 00 00" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@email.com" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Adresse de l'appelant</FormLabel>
                      <FormControl>
                        <Input placeholder="Adresse" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lieuIncident"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Lieu de l'incident</FormLabel>
                    <FormControl>
                      <Input placeholder="Où a eu lieu l'incident ?" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeIncident"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Type d'incident</FormLabel>
                    <FormControl>
                      <Input placeholder={casSensible ? "VBG, EAS, ou HS" : "Ex : fuite d'eau, accident..."} {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Responsable (personne ou société)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de la personne ou société responsable" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Date et heure de l'incident</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Décrivez l'incident en détail..." {...field} className="border-slate-300 min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dejaSignale"
                render={({ field }) => (
                  <FormItem className="bg-slate-50 p-4 rounded-lg">
                    <FormLabel className="text-slate-800 font-medium">Avez-vous déjà signalé cette plainte auparavant ?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-8 mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="oui" />
                          <FormLabel htmlFor="oui" className="font-normal cursor-pointer">Oui</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="non" />
                          <FormLabel htmlFor="non" className="font-normal cursor-pointer">Non</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className={`w-full py-6 text-lg font-semibold ${casSensible ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-800'}`}
              >
                Soumettre la plainte
              </Button>
            </form>
          </Form>
        </div>

        {/* Message final */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
          <p className="text-blue-900 text-sm leading-relaxed">
            Nous vous remercions d'avoir pris le temps de nous informer de votre plainte. Nous nous engageons à traiter votre demande avec sérieux et à vous répondre sous une semaine.
          </p>
        </div>
      </div>
    </div>
  );
}