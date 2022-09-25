import { FC } from "react";

import { Box, Flex, Heading, Spacer, Text, Stack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Flex justify="center" flexDirection="row" maxH="160vh" maxW="160vh">
      <Flex>
        <Link href="/">
          <a>
            <Heading>Product Store</Heading>
          </a>
        </Link>
      </Flex>

      <Flex justify="end">
        <Stack as={Flex} flexDirection="row" pr="10" justify="flex-end">
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
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
