"use client";

import { useState } from "react";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

// ✅ Données dynamiques
const villesParRegion = {
  "Djibouti-ville": ["Balbala", "Boulaos", "Ambouli"],
  "Ali Sabieh": ["Ali Sabieh", "Holhol"],
  "Dikhil": ["Dikhil", "As Eyla"],
  "Arta": ["Arta", "Loyada"],
  "Obock": ["Obock", "Moulhoule"],
  "Tadjourah": ["Randa", "Tadjourah"],
};

const routesParVille = {
  Balbala: ["RN1", "RN2"],
  Boulaos: ["RN3"],
  Ambouli: ["RN4"],
  "Ali Sabieh": ["RN5"],
  Holhol: ["RN6"],
  Dikhil: ["RN7"],
  "As Eyla": ["RN8"],
  Arta: ["RN9"],
  Loyada: ["RN10"],
  Obock: ["RN11"],
  Moulhoule: ["RN12"],
  Randa: ["RN13"],
  Tadjourah: ["RN14"],
};

// ✅ Validation du formulaire
const formSchema = z.object({
  idAppel: z.string().min(1, "Identifiant requis."),
  nomAppelant: z.string().min(2, "Le nom est requis."),
  contact: z.string().min(8, "Le contact est requis."),
  typeUsager: z.enum(["Voyageur", "Transporteur", "Conducteur", "Communauté riveraine"]),
  typeDemande: z.enum(["Information générale", "Incident / Urgence", "Plainte / Doléance", "Autre"]),
  description: z.string().min(5, "Description obligatoire."),
  region: z.string().min(1, "Région requise."),
  ville: z.string().min(1, "Ville requise."),
  route: z.string().min(1, "Route requise."),
  dateHeure: z.string().min(1, "Date et heure requises."),
  gravite: z.enum(["Très urgent", "Urgent", "Moyen", "Faible"]),
  documents: z.any().optional(),
});

export default function FormDPCR() {
  const [villes, setVilles] = useState([]);
  const [routes, setRoutes] = useState([]);

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

  // 🔁 Dynamique Région → Ville
  const handleRegionChange = (region) => {
    form.setValue("region", region);
    form.setValue("ville", "");
    form.setValue("route", "");
    setVilles(villesParRegion[region] || []);
    setRoutes([]);
  };

  // 🔁 Dynamique Ville → Route
  const handleVilleChange = (ville) => {
    form.setValue("ville", ville);
    form.setValue("route", "");
    setRoutes(routesParVille[ville] || []);
  };

  const onSubmit = (data) => {
    console.log("✅ Données envoyées :", data);
    alert("✅ Formulaire soumis avec succès !");
  };

  const onReset = () => {
    form.reset();
    setVilles([]);
    setRoutes([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header avec badge bleu */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 bg-yellow-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
              DPCR - INCIDENTS ROUTIERS
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Formulaire de Collecte des Plaintes et Incidents
          </h1>
          <p className="text-white">
            Enregistrement des incidents et urgences routières
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">
              Informations sur l'incident
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
              
              {/* Identifiant */}
              <FormField
                control={form.control}
                name="idAppel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Identifiant unique de l'appel</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: AP-044" {...field} className="border-slate-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom & Contact */}
              <div className="grid md:grid-cols-2 gap-5">
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

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="+253 77 000 000 / email" {...field} className="border-slate-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Type d'usager */}
              <FormField
                control={form.control}
                name="typeUsager"
                render={({ field }) => (
                  <FormItem className="bg-slate-50 p-4 rounded-lg">
                    <FormLabel className="text-slate-800 font-medium">Type d'usager</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3 mt-2">
                        {["Voyageur", "Transporteur", "Conducteur", "Communauté riveraine"].map((t) => (
                          <div key={t} className="flex items-center space-x-2">
                            <RadioGroupItem value={t} id={t} />
                            <FormLabel htmlFor={t} className="font-normal cursor-pointer">{t}</FormLabel>
                          </div>
                        ))}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border border-slate-200 shadow-lg">
                        <SelectItem value="Information générale" className="hover:bg-slate-100 cursor-pointer">Information générale</SelectItem>
                        <SelectItem value="Incident / Urgence" className="hover:bg-slate-100 cursor-pointer">Incident / Urgence</SelectItem>
                        <SelectItem value="Plainte / Doléance" className="hover:bg-slate-100 cursor-pointer">Plainte / Doléance</SelectItem>
                        <SelectItem value="Autre" className="hover:bg-slate-100 cursor-pointer">Autre</SelectItem>
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
                      <Textarea placeholder="Décrivez l'incident en détail..." {...field} className="border-slate-300 min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Région - Ville - Route */}
              <div className="grid md:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Région</FormLabel>
                      <Select onValueChange={handleRegionChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                            <SelectValue placeholder="Sélectionner une région" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border border-slate-200 shadow-lg">
                          {Object.keys(villesParRegion).map((r) => (
                            <SelectItem key={r} value={r} className="hover:bg-slate-100 cursor-pointer">{r}</SelectItem>
                          ))}
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
                      <Select onValueChange={handleVilleChange} value={field.value} disabled={!villes.length}>
                        <FormControl>
                          <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            <SelectValue placeholder={villes.length ? "Sélectionner une ville" : "Choisir une région"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border border-slate-200 shadow-lg">
                          {villes.map((v) => (
                            <SelectItem key={v} value={v} className="hover:bg-slate-100 cursor-pointer">{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value} disabled={!routes.length}>
                        <FormControl>
                          <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            <SelectValue placeholder={routes.length ? "Sélectionner une route" : "Choisir une ville"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border border-slate-200 shadow-lg">
                          {routes.map((r) => (
                            <SelectItem key={r} value={r} className="hover:bg-slate-100 cursor-pointer">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {["Très urgent", "Urgent", "Moyen", "Faible"].map((g) => (
                          <div key={g} className="flex items-center space-x-2">
                            <RadioGroupItem value={g} id={g} />
                            <FormLabel htmlFor={g} className="font-normal cursor-pointer">{g}</FormLabel>
                          </div>
                        ))}
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
                <Button type="submit" className=" text-white w-full py-6 text-lg font-semibold bg-slate-700 hover:bg-slate-800">
                  Soumettre
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