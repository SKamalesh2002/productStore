import { FC } from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Flex justifyContent="space-between" w="100vw" overflow="hidden">
      <Flex>
        <Link href="/">
          <a>
            <Heading>Product Store</Heading>
          </a>
        </Link>
      </Flex>

      <Flex pt="1rem" gap="1rem">
        <Link href="../Products/loginForm">
          <a>
            <Text>Login</Text>
          </a>
        </Link>

        <Link href="../Products/registerForm">
          <a>
            <Text>Register</Text>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
