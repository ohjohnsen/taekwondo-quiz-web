import React, { useState } from "react";
import { Page, BeltMultiSelect } from "../components";
import { Box } from "@chakra-ui/react";
import { terminologies } from "../assets/terminologies";


import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"

const TerminologyPage = () => {
  const data = React.useMemo(
    () => terminologies,
    [],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Grad",
        accessor: "belt",
      },
      {
        Header: "Koreansk",
        accessor: "korean",
      },
      {
        Header: "Norsk",
        accessor: "norwegian",
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)

  const [selectedRows, setSelectedRows] = useState(rows);

  return (
    <Page>
      <Box
        marginTop="2rem"
        marginBottom="2rem"
        background="cyan.50"
        padding="1rem"
        width="50rem"
        height="100%"
        borderRadius="0.5rem"
        overflowY="auto"
      >
        <BeltMultiSelect
          onChange={selected => {
            var rowsTemp = [];
            if (selected.length > 0) {
              selected.forEach(belt => {
                rowsTemp = [...rowsTemp, ...rows.filter(row => row.values.belt === belt.value)];
              })
            } else {
              rowsTemp = rows;
            }
            setSelectedRows(rowsTemp);
          }} />
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {selectedRows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Page>

  )
}

export default TerminologyPage;
