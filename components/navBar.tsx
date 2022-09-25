import { FC } from "react";

import { Box, Flex, Heading, Spacer, Text, Stack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Flex
      justifyContent="space-between"
      flexDirection="row"
      w="100%"
      overflow="hidden"
    >
      <Flex>
        <Link href="/">
          <a>
            <Heading>Product Store</Heading>
          </a>
        </Link>
      </Flex>

      <Flex pt="1rem" gap="2rem">
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
