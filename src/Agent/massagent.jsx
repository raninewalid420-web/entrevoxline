"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function MassAgent() {
    const [selectedProject, setSelectedProject] = useState("")

    const regions = ["Ali Sabieh", "Dikhil", "Arta", "Tadjourah", "Obock"]
    const communes = ["Commune 1", "Commune 2"]
    const quartiers = ["Quartier 1", "Quartier 2"]
    const localites = ["Localité 1", "Localité 2"]
    const delegates = ["Délégué 1", "Délégué 2"]

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("✅ Formulaire soumis avec succès !")
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-5 rounded-t-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="px-3 py-1 bg-green-800 text-white text-xs font-semibold rounded uppercase tracking-wide">
                            MASS - FORMULAIRE DE PLAINTE
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Enregistrement des Plaintes MASS
                    </h1>
                    <p className="text-white">
                        Formulaire unifié pour tous les projets du programme MASS
                    </p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Informations générales
                            </h2>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Section principale */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label className="text-slate-700 font-medium">Numéro de plainte</Label>
                                    <Input placeholder="Ex: 149" className="border-slate-300" />
                                </div>
                                <div>
                                    <Label className="text-slate-700 font-medium">Date d'enregistrement</Label>
                                    <Input type="date" defaultValue="2025-11-13" className="border-slate-300" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label className="text-slate-700 font-medium">Nom du plaignant</Label>
                                    <Input placeholder="Entrez le nom complet" className="border-slate-300" />
                                </div>
                                <div>
                                    <Label className="text-slate-700 font-medium">Nom conjoint / manager</Label>
                                    <Input placeholder="Nom du conjoint ou manager" className="border-slate-300" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label className="text-slate-700 font-medium">Numéro de téléphone</Label>
                                    <Input placeholder="+253 77 00 00 00" className="border-slate-300" />
                                </div>
                                <div>
                                    <Label className="text-slate-700 font-medium">Date de naissance</Label>
                                    <Input type="date" className="border-slate-300" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <Label className="text-slate-700 font-medium">Genre</Label>
                                    <Select>
                                        <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-slate-200 shadow-lg">
                                            <SelectItem value="homme" className="hover:bg-slate-100 cursor-pointer">Homme</SelectItem>
                                            <SelectItem value="femme" className="hover:bg-slate-100 cursor-pointer">Femme</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-slate-700 font-medium">CIN</Label>
                                    <Input placeholder="Ex: 00112233" className="border-slate-300" />
                                </div>
                            </div>

                            <div>
                                <Label className="text-slate-700 font-medium">Catégorie de plainte</Label>
                                <Input placeholder="Ex: Technique, Sociale..." className="border-slate-300" />
                            </div>

                            {/* Sélection du projet */}
                            <div>
                                <Label className="text-slate-700 font-medium">Projet concerné</Label>
                                <Select onValueChange={setSelectedProject}>
                                    <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                                        <SelectValue placeholder="Sélectionner un projet" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-slate-200 shadow-lg">
                                        <SelectItem value="purcsa" className="hover:bg-slate-100 cursor-pointer">PURCSA</SelectItem>
                                        <SelectItem value="agr" className="hover:bg-slate-100 cursor-pointer">AGR</SelectItem>
                                        <SelectItem value="aseri" className="hover:bg-slate-100 cursor-pointer">ASERI</SelectItem>
                                        <SelectItem value="ps" className="hover:bg-slate-100 cursor-pointer">PS</SelectItem>
                                        <SelectItem value="pass" className="hover:bg-slate-100 cursor-pointer">PASS</SelectItem>
                                        <SelectItem value="pirb" className="hover:bg-slate-100 cursor-pointer">PIRB</SelectItem>
                                        <SelectItem value="eaps" className="hover:bg-slate-100 cursor-pointer">EAPS</SelectItem>
                                        <SelectItem value="freshfood" className="hover:bg-slate-100 cursor-pointer">FRESH FOOD</SelectItem>
                                        <SelectItem value="crec" className="hover:bg-slate-100 cursor-pointer">CREC</SelectItem>
                                        <SelectItem value="hors-projet" className="hover:bg-slate-100 cursor-pointer">HORS PROJET</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sections spécifiques par projet */}
                            {selectedProject === "purcsa" && (
                                <>
                                    {/* Partie MASS classique */}
                                    <Section title="PURCSA">
                                        <SelectField label="Région" items={regions} />
                                        <SelectField label="Localité" items={localites} />
                                        <TextAreaField label="Description de la plainte" />
                                    </Section>

                                    {/* Partie Traitement Communautaire */}
                                    <Section title="Traitement Communautaire">
                                        <SelectField label="Nom du délégué" items={delegates} />
                                        <SelectField label="Catégorie" items={["Technique", "Sociale", "Infrastructure", "Autre"]} />
                                        <SelectField label="Plainte / Type d’activité" items={["Infrastructure", "Service", "Autre"]} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField label="Date Dépôt" placeholder="jj/mm/aaaa" />
                                            <InputField label="Date Résolution" placeholder="jj/mm/aaaa" />
                                        </div>

                                        <SelectField label="Résolution Comité Local" items={["Acceptée", "Refusée", "En attente"]} />
                                        <SelectField label="Satisfaction" items={["Satisfait", "Partiellement satisfait", "Non satisfait"]} />
                                        <SelectField label="Status de plainte" items={["Ouverte", "En cours", "Résolue"]} />
                                    </Section>
                                </>
                            )}


                            {selectedProject === "agr" && (
                                <Section title="AGR">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <SelectField label="Type de problème" items={["Technique", "Financier", "Autre"]} />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {selectedProject === "aseri" && (
                                <Section title="ASERI">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <SelectField label="Type de problème" items={["Technique", "Administratif", "Autre"]} />
                                    <InputField label="Numéro étudiant universitaire" placeholder="Ex: 2025UNI0123" />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {selectedProject === "ps" && (
                                <Section title="PS">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <TextAreaField label="Description de la plainte" />
                                    <SelectField label="Type de plainte" items={["Technique", "Sociale", "Autre"]} />
                                    <SelectField label="Status de plainte" items={["Ouverte", "En cours", "Résolue"]} />
                                </Section>
                            )}

                            {selectedProject === "pass" && (
                                <Section title="PASS">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Localité" items={localites} />
                                    <TextAreaField label="Description de la plainte" />
                                    <SelectField label="Nom du délégué" items={delegates} />
                                    <SelectField label="Type de problème" items={["Technique", "Social", "Autre"]} />
                                    <SelectField label="Status de plainte" items={["Ouverte", "En cours", "Résolue"]} />
                                </Section>
                            )}

                            {selectedProject === "pirb" && (
                                <Section title="PIRB">
                                    <SelectField label="Ménages issus des quartiers impactés" items={["Oui", "Non"]} />
                                    <TextAreaField label="Description de la plainte" />
                                    <SelectField label="Type de problème" items={["Infrastructure", "Social", "Autre"]} />
                                    <SelectField label="Status de plainte" items={["Ouverte", "En cours", "Résolue"]} />
                                </Section>
                            )}

                            {selectedProject === "eaps" && (
                                <Section title="EAPS">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <SelectField label="Type de problème" items={["Technique", "Autre"]} />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {selectedProject === "freshfood" && (
                                <Section title="FRESH FOOD">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <SelectField label="Type de problème" items={["Logistique", "Hygiène", "Autre"]} />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {selectedProject === "crec" && (
                                <Section title="CREC">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Localité" items={localites} />
                                    <SelectField label="Nom du délégué" items={delegates} />
                                    <SelectField label="Type de problème" items={["Technique", "Financier", "Autre"]} />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {selectedProject === "hors-projet" && (
                                <Section title="HORS PROJET">
                                    <SelectField label="Région" items={regions} />
                                    <SelectField label="Commune" items={communes} />
                                    <SelectField label="Quartier" items={quartiers} />
                                    <TextAreaField label="Description de la plainte" />
                                </Section>
                            )}

                            {/* Boutons */}
                            <div className="flex gap-4 pt-6 border-t border-slate-200">
                                <Button type="submit" className="text-white flex-1 bg-slate-700 hover:bg-slate-800 text-lg py-6 font-semibold">
                                    Soumettre
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Message final */}
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
                    <p className="text-blue-900 text-sm leading-relaxed">
                        La plainte sera enregistrée dans le système et traitée selon les procédures du projet sélectionné.
                    </p>
                </div>
            </div>
        </div>
    )
}

/* Composants réutilisables */
function Section({ title, children }) {
    return (
        <div className="mt-6 pt-6 border-t-2 border-slate-200 space-y-5">
            <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded "></span>
                Informations spécifiques – {title}
            </h3>
            <div className="space-y-5 pl-3">{children}</div>
        </div>
    )
}

function SelectField({ label, items }) {
    return (
        <div>
            <Label className="text-slate-700 font-medium">{label}</Label>
            <Select>
                <SelectTrigger className="border-slate-300 bg-white hover:bg-slate-50">
                    <SelectValue placeholder={`Sélectionner ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-lg">
                    {items.map((item) => (
                        <SelectItem key={item} value={item.toLowerCase()} className="hover:bg-slate-100 cursor-pointer">
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

function InputField({ label, placeholder }) {
    return (
        <div>
            <Label className="text-slate-700 font-medium">{label}</Label>
            <Input placeholder={placeholder} className="border-slate-300" />
        </div>
    )
}

function TextAreaField({ label }) {
    return (
        <div>
            <Label className="text-slate-700 font-medium">{label}</Label>
            <Textarea
                className="border-slate-300 min-h-[120px]"
                placeholder={`Décrivez ${label.toLowerCase()}...`}
            />
        </div>
    )
}