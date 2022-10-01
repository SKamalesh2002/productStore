import {
  Icon,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Spacer,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import type { Welcome } from "../types/productType";

interface Props {
  column: Welcome;
}

const ViewModel: FC<Props> = ({ column }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <ModalContent w={["xs", "lg"]}>
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
};

export default ViewModel;
