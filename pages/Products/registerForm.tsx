import { FC, useState } from "react";
import * as yup from "yup";

import { Flex, Heading, useToast } from "@chakra-ui/react";
import FormTemplate from "../../templates/form";
import { stringify } from "querystring";
import { useRouter } from "next/router";

interface Props {}
interface initialValues {
  email: string;
  password: string;
}
interface field {
  id: number;
  label: string;
  name: string;
  type: string;
}

interface button {
  id: number;
  name: string;
  label: string;
}
const Register: FC<Props> = () => {
  const [initialValues] = useState<initialValues>({
    email: "",
    password: "",
  });

  const schema = yup.object({
    username: yup.string().required("User Name Required"),
    password: yup
      .string()
      .required("Password Required")
      .min(4, "Password too short")
      .max(10, "Password too long"),
    name: yup.string().required("Name required"),
  });

  const fields = useState<field[]>([
    { id: 0, label: "User Name", name: "username", type: "text" },
    { id: 1, label: "Password", name: "password", type: "password" },
    { id: 2, label: "Name", name: "name", type: "text" },
  ]);

  const router = useRouter();
  const toast = useToast();

  const onSubmit = (values: any) => {
    alert(stringify(values));
    router.replace("/");

    toast({
      title: "Registration Success",
      variant: "subtle",
      duration: 4000,
      isClosable: true,
      status: "success",
    });
  };

  const buttons = useState<button[]>([
    { id: 0, name: "register", label: "Register" },
  ]);
  return (
    <Flex alignItems="center" justifyContent="center" w="100vw" h="75vh">
      <Flex
        alignItems="center"
        flexDirection="column"
        bg="white"
        p={6}
        rounded="md"
      >
        <Heading mb="8">Register</Heading>
        <FormTemplate
          initialValues={initialValues}
          schema={schema}
          fields={fields[0]}
          onSubmit={onSubmit}
          buttons={buttons[0]}
        />
      </Flex>
    </Flex>
  );
};

export default Register;
