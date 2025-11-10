"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

import { Input } from "../ui/input"
import { useLocation } from "react-router-dom"

export function DataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = React.useState([])

  const location = useLocation()
  const path = location.pathname

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      {/* Zone de filtres */}
      <div className="flex items-center gap-4">
        {/* Filtre Nom */}
        <Input
          placeholder="Filtrer par nom..."
          value={table.getColumn("nom")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("nom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Filtre commande uniquement sur certaines pages */}
        {path && (path === "/recherche" || path === "/cartin" || path ==="/annulationcommande") && (
          <Input
            placeholder="Filtrer par commande..."
            value={table.getColumn("commande")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("commande")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
      </div>

      {/* 🧾 Tableau */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
