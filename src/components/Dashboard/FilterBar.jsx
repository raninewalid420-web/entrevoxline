import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FilterBar = ({ filters, onChange }) => (
  <div className="flex gap-4 mb-4 flex-wrap">
    <Select onValueChange={(value) => onChange("project", value)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Projet" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {filters.projects.map((proj) => (
          <SelectItem key={proj} value={proj}  className="cursor-pointer hover:bg-blue-950 hover:text-white">{proj}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select onValueChange={(value) => onChange("region", value)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Région" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {filters.regions.map((reg) => (
          <SelectItem key={reg} value={reg}  className="cursor-pointer hover:bg-blue-950 hover:text-white">{reg}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Input type="month" className="w-40" onChange={(e) => onChange("month", e.target.value)} />
  </div>
);
