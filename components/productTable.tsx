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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const toast = useToast();

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
        // const { isOpen, onOpen, onClose } = useDisclosure();
        return (
          <>
            <Icon
              boxSize="1rem"
              as={BsFillEyeFill}
              color="messenger.500"
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{column.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex flexDirection="column">
                    <Image
                      rounded={"md"}
                      alt={"product image"}
                      src={column.image}
                      fit={"cover"}
                      align={"center"}
                      w={"100%"}
                      h={{ base: "100%", sm: "400px", lg: "500px" }}
                    />
                    <Flex pt="1rem" flexDirection="column">
                      <Text>₹{column.price}</Text>
                      <Spacer />
                      <Text>{column.description}</Text>
                    </Flex>
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Link href={`Products/${column.id}`}>
                    <a>
                      <Button colorScheme="messenger" variant="solid">
                        View
                      </Button>
                    </a>
                  </Link>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
      },
    },
    {
      key: "Delete",
      content: (column: Welcome) => {
        // const { isOpen, onOpen, onClose } = useDisclosure();

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
