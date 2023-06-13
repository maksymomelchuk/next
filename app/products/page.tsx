"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

export interface IProduct {
  id: number
  title: string
  brand: string
  category: string
}

async function getData() {
  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }
  console.log("token:", token)
  const res = await fetch("http://localhost:8080/api/v1/sdp", {
    headers,
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Products = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await getData()
      console.log("data:", data)
      // setData(data.products)
    })()
  }, [])

  const columnHelper = createColumnHelper<IProduct>()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "id" }),
      columnHelper.accessor("title", { header: "Title" }),
      columnHelper.accessor("category", { header: "Category" }),
      columnHelper.accessor("brand", { header: "Brand" }),
    ],
    []
  )

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    // <div>HELLO</div>
  )
}
export default Products
