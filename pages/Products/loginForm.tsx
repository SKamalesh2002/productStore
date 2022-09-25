import { FC, useState } from "react";
import * as yup from "yup";
import FormTemplate from "../../templates/form";
import { Flex, Box } from "@chakra-ui/react";

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
    console.log(values);
  };

  const buttons = useState<button[]>([
    { id: 0, name: "submit", label: "Submit" },
  ]);

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="vh" h="vh">
        <FormTemplate
          initialValues={initialValues}
          schema={schema}
          fields={fields[0]}
          onSubmit={onSubmit}
          buttons={buttons[0]}
        />
      </Box>
    </Flex>
  );
};

export default Login;
