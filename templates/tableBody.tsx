import _ from "lodash";

import { Welcome } from "../types/productType";
import { Tbody, Tr, Td, Flex } from "@chakra-ui/react";
interface column {
  path?: string;
  key: string;
  label?: string;
  content?: (column: Welcome) => void;
}

interface Props {
  data: Welcome[];
  columns: column[];
}

function TableBody({ data, columns }: Props): any {
  const renderCell = (item: Welcome, column: column) => {
    if (column.content) return column.content(item);

    if (typeof column.path === "string") return _.get(item, column.path);
  };

  const createKey = (item: Welcome, column: column): string =>
    column.path ? item.id + column.path : item.id + column.key;

  return (
    <Tbody>
      {data.map((item: Welcome) => (
        <Tr key={item.id}>
          {columns.map((column: column) => (
            <Td key={createKey(item, column)}>{renderCell(item, column)}</Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
}

export default TableBody;
