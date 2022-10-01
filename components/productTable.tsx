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
  Icon,
  Link as LinkTemplate,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";

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
              <Icon boxSize="1rem" as={BsFillEyeFill} color="messenger.500" />
            </a>
          </Link>
        );
      },
    },
    {
      key: "Delete",
      content: (column: Welcome) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef =
          React.useRef() as React.MutableRefObject<HTMLInputElement>;

        const toast = useToast();

        const handleDelete = (column: Welcome) => {
          onDelete(column);
          onClose();
          toast({
            title: "Product Deleted",
            description: "Product successfully Deleted",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        };
        return (
          <>
            <Icon
              boxSize="1rem"
              textColor="red"
              as={BsFillTrashFill}
              id={"" + column.id}
              onClick={onOpen}
            />
            <AlertDialog
              isOpen={isOpen}
              onClose={onClose}
              leastDestructiveRef={cancelRef}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Product
                </AlertDialogHeader>

                <AlertDialogCloseButton />
                <AlertDialogBody>Sure you want to delete?</AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={onClose}> Cancel</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(column)}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
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
