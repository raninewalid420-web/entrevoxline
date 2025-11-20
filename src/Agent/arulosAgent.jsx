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
import useAsync from "../hooks/useAsync";
import { CreateArulos } from "../api/arulos";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Validation du formulaire
const formSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro invalide"),
  logement: z.string().min(1, "Numéro de logement requis"),
  typeAppel: z.string().min(1, "Type d'appel requis"),
  projet: z.string().min(1, "Nom du projet requis"),
  quartier: z.string().min(1, "Quartier requis"),
  equipement: z.string().min(1, "Équipement requis"),
  affectation: z.string().min(1, "Affectation requise"),
  commentaire: z.string().min(5, "Commentaire obligatoire"),
  facture: z.string().optional(),
  // 🆕 Champ conditionnel
  nomChefChantier: z.string().optional(),
});

export default function ArulosAgent() {
  const { user } = useAuth();
  const { execute } = useAsync(CreateArulos, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      logement: "",
      typeAppel: "",
      projet: "",
      quartier: "",
      equipement: "",
      affectation: "",
      commentaire: "",
      facture: "",
      nomChefChantier: "", // 🆕
    },
  });

  const typeAppelValue = form.watch("typeAppel");

  const onSubmit = async (values) => {
    try {
      const result = await execute(values, user.id);

      if (result?.success) {
        toast.success("Enregistrée avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }

      form.reset();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement de la plainte.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 border-r-3">
      <ToastContainer position="top-center" />
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Arulos
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">
            Soumettre une Doléance ou Plainte
          </h1>
          <p className="text-white mt-2">
            Bonjour et bienvenue sur la plateforme e.Doléance / Plainte
            d’Arulos.
            <br />
            Comment puis-je vous assister aujourd’hui ?
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom complet" {...field} />
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
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 77 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logement */}
              <FormField
                control={form.control}
                name="logement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de logement</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: LGM-22" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type d'appel */}
              <FormField
                control={form.control}
                name="typeAppel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'appel</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white w-full">
                        <SelectItem
                          value="doleance"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Doléance
                        </SelectItem>
                        <SelectItem
                          value="plainte"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Plainte
                        </SelectItem>
                        <SelectItem
                          value="information"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Information
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nom du projet */}
              <FormField
                control={form.control}
                name="projet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du projet</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du projet concerné" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quartier */}
              <FormField
                control={form.control}
                name="quartier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quartier</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Balbala Sud" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Équipement */}
              <FormField
                control={form.control}
                name="equipement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Équipement</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Pompe, compteur, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Affectation */}
              <FormField
                control={form.control}
                name="affectation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affectation</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white w-full">
                        <SelectItem
                          value="reloge"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Reloge
                        </SelectItem>
                        <SelectItem
                          value="recul_de_facade"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Recul de façade
                        </SelectItem>
                        <SelectItem
                          value="information"
                          className="cursor-pointer hover:bg-blue-950 hover:text-white"
                        >
                          Information
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Textarea
                        placeholder="Décrivez votre doléance ou plainte..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Champ Nom Chef Chantier (affiché seulement si plainte) */}
              {typeAppelValue === "plainte" && (
                <FormField
                  control={form.control}
                  name="nomChefChantier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du chef de chantier</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nom complet du chef de chantier"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Numéro facture */}
              <FormField
                control={form.control}
                name="facture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro facture (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: FAC-0012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold cursor-pointer"
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
