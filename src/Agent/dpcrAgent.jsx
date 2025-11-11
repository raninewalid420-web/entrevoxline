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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ✅ Mapping des villes par région
const villesParRegion = {
  "Djibouti-ville": ["Balbala", "Boulaos", "Ambouli"],
  "Ali Sabieh": ["Ali Sabieh", "Holholl"],
  "Dikhil": ["Dikhil", "As Eyla"],
  "Arta": ["Arta", "Loyada"],
  "Obock": ["Obock", "Moulhol"],
  "Tadjourah": ["Randa", "Tadjourah"]
};

// ✅ Validation Schema
const formSchema = z.object({
  idAppel: z.string().min(1, "Identifiant requis."),
  nomAppelant: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  contact: z.string().min(8, "Le contact est requis."),
  typeUsager: z.enum(["Voyageur", "Transporteur", "Conducteur", "Communauté riveraine"]),
  typeDemande: z.enum(["Information générale", "Incident / Urgence", "Plainte / Doléance", "Autre"]),
  description: z.string().min(5, "Veuillez entrer une description détaillée."),
  region: z.string().min(1, "Veuillez sélectionner une région."),
  ville: z.string().min(1, "Veuillez sélectionner une ville."),
  route: z.string().min(1, "Veuillez sélectionner une route."),
  dateHeure: z.string().min(1, "Date et heure obligatoires."),
  gravite: z.enum(["Très urgent", "Urgent", "Moyen", "Faible"]),
  documents: z.any().optional(),
});

export default function DPCRForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idAppel: "",
      nomAppelant: "",
      contact: "",
      typeUsager: "Voyageur",
      typeDemande: "Information générale",
      description: "",
      region: "",
      ville: "",
      route: "",
      dateHeure: "",
      gravite: "Moyen",
    },
  });

  const onSubmit = (values) => {
    console.log("✅ Données soumises :", values);
    alert("Merci ! Votre plainte/incident a été enregistré avec succès.");
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-slate-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
              DPCR - INCIDENTS ROUTIERS
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Formulaire de Collecte des Plaintes et Incidents
          </h1>
          <p className="text-slate-600">
            Enregistrement des incidents et urgences routières
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Informations sur l'incident
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Identifiant et Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="idAppel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Identifiant unique de l'appel</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: AP-001" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nomAppelant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Nom de l'appelant</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom complet" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact */}
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="77 00 00 00" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type d'usager */}
              <FormField
                control={form.control}
                name="typeUsager"
                render={({ field }) => (
                  <FormItem className="bg-slate-50 p-4 rounded-lg">
                    <FormLabel className="text-slate-800 font-medium">Type d'usager</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Voyageur" id="voyageur" />
                          <FormLabel htmlFor="voyageur" className="font-normal cursor-pointer">Voyageur</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Transporteur" id="transporteur" />
                          <FormLabel htmlFor="transporteur" className="font-normal cursor-pointer">Transporteur</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Conducteur" id="conducteur" />
                          <FormLabel htmlFor="conducteur" className="font-normal cursor-pointer">Conducteur</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Communauté riveraine" id="communaute" />
                          <FormLabel htmlFor="communaute" className="font-normal cursor-pointer">Communauté riveraine</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type de demande */}
              <FormField
                control={form.control}
                name="typeDemande"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Type de demande</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-slate-300">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Information générale">Information générale</SelectItem>
                        <SelectItem value="Incident / Urgence">Incident / Urgence</SelectItem>
                        <SelectItem value="Plainte / Doléance">Plainte / Doléance</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez l'incident ou la situation en détail..." 
                        {...field} 
                        className="border-slate-300 min-h-[120px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Région, Ville, Route */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Région</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-slate-300">
                            <SelectValue placeholder="Sélectionner une région" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Djibouti-ville">Djibouti-ville</SelectItem>
                          <SelectItem value="Ali Sabieh">Ali Sabieh</SelectItem>
                          <SelectItem value="Dikhil">Dikhil</SelectItem>
                          <SelectItem value="Obock">Obock</SelectItem>
                          <SelectItem value="Tadjourah">Tadjourah</SelectItem>
                          <SelectItem value="Arta">Arta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ville"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Sélectionner une ville" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="route"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Route</FormLabel>
                      <FormControl>
                        <Input placeholder="Sélectionner une route" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date et heure */}
              <FormField
                control={form.control}
                name="dateHeure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Date et heure</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gravité */}
              <FormField
                control={form.control}
                name="gravite"
                render={({ field }) => (
                  <FormItem className="bg-slate-50 p-4 rounded-lg">
                    <FormLabel className="text-slate-800 font-medium">Gravité</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Très urgent" id="tres-urgent" />
                          <FormLabel htmlFor="tres-urgent" className="font-normal cursor-pointer">Très urgent</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Urgent" id="urgent" />
                          <FormLabel htmlFor="urgent" className="font-normal cursor-pointer">Urgent</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Moyen" id="moyen" />
                          <FormLabel htmlFor="moyen" className="font-normal cursor-pointer">Moyen</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Faible" id="faible" />
                          <FormLabel htmlFor="faible" className="font-normal cursor-pointer">Faible</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Documents joints */}
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Documents joints</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        multiple 
                        className="border-slate-300 cursor-pointer" 
                        onChange={(e) => field.onChange(e.target.files)}
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
                  className="flex-1 bg-slate-700 hover:bg-slate-800 py-6 text-lg font-semibold"
                >
                  Soumettre
                </Button>
                <Button 
                  type="button"
                  onClick={onReset}
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 py-6 text-lg font-semibold"
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Message final */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
          <p className="text-blue-900 text-sm leading-relaxed">
            Votre signalement a été enregistré. Notre équipe traitera votre demande selon le niveau de gravité indiqué.
          </p>
        </div>
      </div>
    </div>
  );
}