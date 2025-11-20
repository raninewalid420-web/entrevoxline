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
import { AnnulationCmd } from "../api/annulation_cmd";
import useAsync from "../hooks/useAsync";
import { useAuth } from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Schéma de validation
const formSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(8, "Numéro invalide"),
  numeroDJ: z.string().min(1, "Numéro DJ requis"),
  dateCommande: z.string().min(1, "Date obligatoire"),
  raison: z.string().min(5, "Veuillez préciser la raison de l’annulation"),
});

export default function AnnulationCommande() {
  const { user } = useAuth();
  const { execute } = useAsync(AnnulationCmd, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      numeroDJ: "",
      dateCommande: "",
      raison: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const result = await execute(values, user.id);

      if (result?.success) {
        toast.success("Enregistrée avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement.");
        console.error("Erreur API:", result.error);
      }

      form.reset();
    } catch (err) {
      toast.error(
        "Erreur lors de l'enregistrement de l'annulation de commande."
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-2xl mx-auto">
        {/* 🟦 En-tête */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
          <div className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-semibold rounded uppercase tracking-wide">
            Annulation
          </div>
          <h1 className="text-3xl font-bold text-white mt-3">
            Annulation de commande
          </h1>
          <p className="text-slate-100 mt-2 text-sm">
            Merci d’indiquer les détails relatifs à votre commande afin de
            procéder à l’annulation.
          </p>
        </div>

        {/* 📄 Formulaire */}
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nom du client */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : Mohamed Walid" {...field} />
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
                      <Input placeholder="77 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Numéro DJ */}
              <FormField
                control={form.control}
                name="numeroDJ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro DJ</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex : DJ-2025-0012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date de la commande */}
              <FormField
                control={form.control}
                name="dateCommande"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de la commande</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Raison de l’annulation */}
              <FormField
                control={form.control}
                name="raison"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raison de l’annulation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Expliquez brièvement la raison..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton d’envoi */}
              <Button
                type="submit"
                className=" text-white w-full py-6 text-lg font-semibold bg-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                Enregistrer
              </Button>
            </form>
          </Form>
        </div>

        {/* 🟡 Message d’aide */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-5">
          <p className="text-yellow-900 text-sm leading-relaxed">
            ⚠️ <strong>Pour guider le client :</strong> pour avoir un suivi,
            merci d’également faire un ticket dans l’app en cliquant sur{" "}
            <strong>Menu</strong>, puis <strong>Contact</strong>, puis{" "}
            <strong>Envoyer un ticket</strong> et remplir le formulaire.
          </p>
        </div>
      </div>
    </div>
  );
}
