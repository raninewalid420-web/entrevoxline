"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// ✅ Schéma de validation
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

export default function CartinFormTabs() {
  const [casActif, setCasActif] = useState("normal");

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
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl ">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
              ADR - LIGNE VERTE 2020
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Enregistrement des Plaintes
          </h1>
          <p className="text-white">
            Bonjour et bienvenue sur la ligne verte 2020 du projet PCERD. Nous sommes ici pour recueillir vos plaintes ou doléances afin de mieux vous servir.
          </p>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="normal" onValueChange={(v) => setCasActif(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-slate-200 rounded-lg p-1">
            <TabsTrigger
              value="normal"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-700 font-semibold transition-all rounded-md"
            >
              Cas Normal
            </TabsTrigger>
            <TabsTrigger
              value="sensible"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-slate-700 font-semibold transition-all rounded-md"
            >
              Cas Sensible (VBG / EAS / HS)
            </TabsTrigger>
          </TabsList>

          {/* 🧾 Cas Normal - Avec formulaire */}
          <TabsContent value="normal">
            <Formulaire form={form} onSubmit={onSubmit} />
          </TabsContent>

          {/* 🚨 Cas Sensible - Sans formulaire, juste le script */}
          <TabsContent value="sensible">
            <ScriptCasSensible />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ----------------------- FORMULAIRE (Cas Normal uniquement) ----------------------- */
function Formulaire({ form, onSubmit }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800">
          Formulaire de Plaintes - Cas Normal
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Veuillez remplir tous les champs obligatoires
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Informations personnelles */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-slate-800 pb-2 border-b border-slate-200">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FieldInput form={form} name="nom" label="Nom complet" placeholder="Entrez votre nom" />
              <FieldInput form={form} name="telephone" label="Téléphone" placeholder="77 00 00 00" />
              <FieldInput form={form} name="email" label="Email" placeholder="exemple@email.com" />
              <FieldInput form={form} name="adresse" label="Adresse" placeholder="Votre adresse" />
            </div>
          </div>

          {/* Détails de l'incident */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-slate-800 pb-2 border-b border-slate-200">
              Détails de l'incident
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FieldInput
                form={form}
                name="lieuIncident"
                label="Lieu de l'incident"
                placeholder="Où a eu lieu l'incident ?"
              />
              <FieldInput
                form={form}
                name="typeIncident"
                label="Type d'incident"
                placeholder="Ex : fuite d'eau, accident..."
              />
            </div>

            <FieldInput
              form={form}
              name="responsable"
              label="Responsable (optionnel)"
              placeholder="Nom de la personne ou société responsable"
            />

            <FieldInput
              form={form}
              name="date"
              label="Date et heure de l'incident"
              type="datetime-local"
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Description détaillée
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez l'incident en détail..."
                      {...field}
                      className="border-slate-300 min-h-[140px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Signalement antérieur */}
          <FormField
            control={form.control}
            name="dejaSignale"
            render={({ field }) => (
              <FormItem className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <FormLabel className="text-slate-800 font-medium text-base">
                  Avez-vous déjà signalé cette plainte auparavant ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-8 mt-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oui" id="oui" />
                      <FormLabel htmlFor="oui" className="cursor-pointer font-normal">
                        Oui
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non" id="non" />
                      <FormLabel htmlFor="non" className="cursor-pointer font-normal">
                        Non
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Boutons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-slate-700 text-white hover:bg-slate-800 py-6 text-lg font-semibold"
            >
              Soumettre la plainte
            </Button>
           
          </div>
        </form>
      </Form>

      {/* Message final */}
      <div className="mx-6 mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
        <p className="text-blue-900 text-sm leading-relaxed">
          Nous vous remercions d'avoir pris le temps de nous informer. Nous nous engageons à traiter votre demande avec sérieux et à vous répondre sous une semaine.
        </p>
      </div>
    </div>
  );
}

/* ----------------------- FIELD RÉUTILISABLE ----------------------- */
function FieldInput({ form, name, label, placeholder, type = "text" }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-slate-700 font-medium">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="border-slate-300 focus:border-slate-500 focus:ring-slate-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/* ----------------------- SCRIPT CAS SENSIBLE (Sans formulaire) ----------------------- */
function ScriptCasSensible() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-red-600 border-b border-red-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Cas Sensible - Procédure Spéciale
        </h2>
        <p className="text-red-50 text-sm mt-1">
          Ce type de cas nécessite un accompagnement spécialisé
        </p>
      </div>

      <div className="p-8">
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Script d'accueil obligatoire
          </h3>
          <div className="space-y-4 text-sm text-red-900 leading-relaxed">
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="font-semibold mb-1">Étape 1 - Accueil</p>
              <p><strong>Agent :</strong> Bonjour et bienvenue dans notre service, comment puis-je vous aider aujourd'hui ?</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="font-semibold mb-1">Étape 2 - Empathie</p>
              <p><strong>Agent :</strong> Merci de m'avoir partagé cela, je suis désolé d'apprendre ce que vous avez traversé et je veux que vous sachiez que vous êtes en sécurité ici, nous sommes là pour vous soutenir.</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="font-semibold mb-1">Étape 3 - Orientation</p>
              <p><strong>Agent :</strong> Pour que votre plainte soit traitée de la meilleure manière possible, je vais vous mettre en contact avec un(e) de nos conseiller(ère)s spécialisé(e)s qui pourra vous aider et vous accompagner dans ce processus.</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="font-semibold mb-1">Étape 4 - Transfert</p>
              <p><strong>Agent :</strong> D'accord, je vais transférer votre appel immédiatement et merci de votre patience.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Important</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Les cas sensibles (VBG - Violences Basées sur le Genre, EAS - Exploitation et Abus Sexuels, HS - Harcèlement Sexuel) ne sont PAS traités via ce formulaire. Ils doivent être immédiatement transférés à un conseiller spécialisé.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Transférer vers conseiller spécialisé
          </Button>
        </div>
      </div>
    </div>
  );
}