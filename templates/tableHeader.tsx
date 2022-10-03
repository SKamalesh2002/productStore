import type { sortColumn } from "../types/tableTypes";

import { Thead, Tr, Th } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

interface tableHeaderProps {
  columns: column[];
  sortColumn: sortColumn;
  onSort: (sortColumn: sortColumn) => void;
}

interface column {
  label?: string;
  path?: string;
  key: string;
}

function TableHeader({ columns, sortColumn, onSort }: tableHeaderProps) {
  const raiseSort = (path: string) => {
    const sortColumnClone = { ...sortColumn };

    if (sortColumnClone.path === path)
      sortColumnClone.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }

    onSort(sortColumnClone);
  };
  const renderSortIcon = (column: column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <ArrowUpIcon fontSize="md" pb="1" />;
    else return <ArrowDownIcon fontSize="md" pb="1" />;
  };
  return (
    <Thead background="black">
      <Tr>
        {columns.map((column: column) => (
          <Th
            align="center"
            alignContent="center"
            key={column.path || column.key}
            fontSize="sm"
            pt="5"
            pb="4"
            cursor="pointer"
            textColor="white"
            onClick={() => {
              if (column.path) raiseSort(column.path);
            }}
          >
            {column.label} {renderSortIcon(column)}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}

export default TableHeader;
