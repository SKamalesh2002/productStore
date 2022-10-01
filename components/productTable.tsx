import type { Welcome } from "../types/productType";
import type { sortColumn } from "../types/tableTypes";

import TableLayout from "../templates/tableLayout";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  color,
  ColorModeScript,
  Divider,
  Flex,
  Icon,
  Image,
  Link as LinkTemplate,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import ViewModel from "./viewModel";
import DeleteAlert from "./deleteAlert";

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
        return <ViewModel column={column} />;
      },
    },
    {
      key: "Delete",
      content: (column: Welcome) => {
        return <DeleteAlert onDelete={onDelete} column={column} />;
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
