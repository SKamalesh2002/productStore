import type { Welcome } from "../types/productType";
import type { sortColumn } from "../types/tableTypes";

import TableLayout from "../templates/tableLayout";

import { Button, Link as LinkTemplate } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  products: Welcome[];
  onDelete: (product: Welcome) => void;
  sortColumn: sortColumn;
  onSort: (sortColumn: sortColumn) => void;
}

interface column {
  label?: string;
  path?: string;
  key: string;
  content?: (column: Welcome) => void;
}

export default function ProductTable({
  products,
  onDelete,
  sortColumn,
  onSort,
}: Props) {
  const columns: column[] = [
    {
      label: "Title",
      path: "title",
      key: "",
      content: (column: Welcome) => {
        return (
          <LinkTemplate as={Link} href={`Products/ProductForm/${column.id}`}>
            {column.title}
          </LinkTemplate>
        );
      },
    },
    {
      label: "Category",
      path: "category.name",
      key: "",
    },
    {
      label: "Rating",
      path: "rating.rate",
      key: "",
    },
    {
      label: "Price",
      path: "price",
      key: "",
    },
    {
      key: "View",
      content: (column: Welcome) => {
        return (
          <Link href={`Products/${column.id}`}>
            <a>
              <Button
                id={"" + column.id}
                bgGradient="linear(to-tr, #FFDD00, #FBB034)"
                _hover={{ bgGradient: "linear(to-tl, #FFDD00, #FBB034)" }}
                size="sm"
              >
                View
              </Button>
            </a>
          </Link>
        );
      },
    },
    {
      key: "Delete",
      content: (column: Welcome) => {
        return (
          <Button
            id={"" + column.id}
            bgGradient="linear(to-tr, #FE5858, #D51A13)"
            _hover={{
              bgGradient: "linear(to-tl, #FE5858, #D51A13)",
            }}
            textColor="White"
            size="sm"
            onClick={() => onDelete(column)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <TableLayout
      data={products}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}
