import type { field, button } from "../types/formTypes";

import { Formik, Form, Field, ErrorMessage, FormikTouched } from "formik";
import { FC } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  initialValues: any;
  schema: any;
  onSubmit: any;
  fields: field[];
  buttons?: button[];
}

const FormTemplate: FC<Props> = ({
  initialValues,
  schema,
  onSubmit,
  fields,
  buttons,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      {(Fields: {
        values: string | number;
        touched: FormikTouched<any>;
        dirty: boolean;
        isValid: boolean;
        handleSubmit: any;
      }) => (
        <Form onSubmit={Fields.handleSubmit}>
          {fields.map((field) => (
            <Flex
              flexDirection="column"
              key={field.id}
              gap="1rem"
              align="flex-end"
              h="100%"
              pb="1rem"
            >
              <FormControl key={field.id}>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                {field.type !== "select" ? (
                  <Field
                    as={Input}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    variant="filled"
                  />
                ) : (
                  <Field
                    id={field.name}
                    name={field.name}
                    as={Select}
                    placeholder={"Select " + field.label}
                    variant="filled"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option key="others" value="others">
                      Others...
                    </option>
                  </Field>
                )}
                {Fields.values === "Others..." ? (
                  <Field
                    as={Input}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    variant="filled"
                  />
                ) : null}
                <Text color="red">
                  <ErrorMessage name={field.name} />
                </Text>
              </FormControl>
            </Flex>
          ))}
          {buttons
            ? buttons.map((button) => (
                <Button
                  key={button.label}
                  type="submit"
                  w="full"
                  colorScheme="messenger"
                  disabled={!(Fields.isValid && Fields.dirty && Fields.touched)}
                >
                  {button.label}
                </Button>
              ))
            : null}
        </Form>
      )}
    </Formik>
  );
};

export default FormTemplate;
