import { FC, useState } from "react";
import * as yup from "yup";
import FormTemplate from "../../templates/form";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { stringify } from "querystring";

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

const Login: FC<Props> = () => {
  const [initialValues] = useState<initialValues>({
    email: "",
    password: "",
  });

  const schema = yup.object({
    email: yup.string().email("Invalid Email").required("Email Required"),
    password: yup
      .string()
      .required("Password Required")
      .min(4, "Password too short")
      .max(10, "Password too long"),
  });

  const fields = useState<field[]>([
    { id: 0, label: "Email ID", name: "email", type: "text" },
    { id: 1, label: "Password", name: "password", type: "password" },
  ]);

  const onSubmit = (values: any) => {
    alert(stringify(values));
  };

  const buttons = useState<button[]>([
    { id: 0, name: "submit", label: "Submit" },
  ]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
      pr="1rem"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bg="white"
        p={6}
        rounded="lg"
        w="max-content"
      >
        <Heading mb="1rem">Log in</Heading>
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

export default Login;
