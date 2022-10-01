import {
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Welcome } from "../types/productType";

interface Props {
  onDelete: (column: Welcome) => void;
  column: Welcome;
}

const DeleteAlert: FC<Props> = ({ onDelete, column }) => {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = (column: Welcome) => {
    onDelete(column);
    onClose();
    toast({
      size: ["xs", "lg"],
      title: "Product Deleted",
      description: "Product successfully Deleted",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
      variant: "subtle",
      colorScheme: "red",
    });
  };

  return (
    <>
      <Icon
        boxSize="1rem"
        textColor="red"
        as={BsFillTrashFill}
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent w={["xs", "lg"]}>
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
};

export default DeleteAlert;
