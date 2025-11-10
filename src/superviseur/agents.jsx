import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Agents() {
  const [search, setSearch] = useState("")
  const [agents, setAgents] = useState([
    { id: 1, name: "Nadira Houssein", email: "nadirahoussein098@gmail.com" },
    { id: 2, name: "Loula Yasser", email: "loulayasser97@gmail.com" },
    { id: 3, name: "Ayan Said", email: "ayanesaid95@gmail.com" },
  ])

  const [newAgent, setNewAgent] = useState({ name: "", email: "" })

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email) return
    setAgents([...agents, { id: Date.now(), ...newAgent }])
    setNewAgent({ name: "", email: "" })
  }

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6  min-h-screen rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button
            variant="secondary"
            onClick={() => setSearch("")}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Effacer
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Nom</Label>
                <Input
                  placeholder="Entrez le nom"
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Entrez l'email"
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddAgent} className="w-full">
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table des agents */}
      <div className="bg-white rounded-md shadow-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-12">
                <input type="checkbox" />
              </TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell className="text-right">…</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}