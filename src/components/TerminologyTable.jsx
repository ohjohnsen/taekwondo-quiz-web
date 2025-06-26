import React from "react";

import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table"
import { chakra } from "@chakra-ui/react"
import { Table } from '@chakra-ui/react'
import { IoTriangleSharp } from "react-icons/io5"

const TerminologyTable = props => {
  const { terminologies } = props;

  const data = React.useMemo(
    () => terminologies,
    [terminologies],
  );

  const columns = React.useMemo(
    () => [
      {
        header: "Koreansk",
        accessorKey: "korean",
      },
      {
        header: "Norsk",
        accessorKey: "norwegian",
      },
    ],
    [],
  );

  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeader
                key={header.id}
                cursor={header.column.getCanSort() ? "pointer" : "default"}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                <chakra.span pl="4">
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "desc" ? (
                      <IoTriangleSharp
                        aria-label="sorted descending"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                    ) : (
                      <IoTriangleSharp aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map(row => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default TerminologyTable;
