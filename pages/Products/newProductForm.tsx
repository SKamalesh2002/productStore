import type { initialValues, field, button } from "../../types/formTypes";

import { FC, useState } from "react";
import FormTemplate from "../../templates/form";
import * as yup from "yup";

import { Flex, Box, Heading } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { categories } from "../../components/fakeProducts";
import { Welcome } from "../../types/productType";
import { useDispatch } from "react-redux";
import { SAVE_PRODUCT } from "../../store/slices/productSlice";
interface Props {
  data: initialValues;
}

const NewProductForm: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [initialValues] = useState<initialValues>(
    data
      ? data
      : {
          title: "",
          category: "",
          price: 0,
          rating: 0,
          description: "",
          image: "",
        }
  );

  const schema = yup.object({
    title: yup.string().required("Title Required"),
    category: yup.string().required("Category Required"),
    price: yup.number().required("Price Required"),
    rating: yup
      .number()
      .required("Rating Required")
      .max(5, "Invalid Rating")
      .min(0, "Invalid Rating"),
    image: yup.string().url("Not a vaild URL").required("URL Required"),
  });

  const categoryNames = categories.map((category) => category.name);
  const fields = useState<field[]>([
    { id: 0, label: "Title", name: "title", type: "text" },
    {
      id: 1,
      label: "Category",
      name: "category",
      type: "select",
      options: categoryNames,
    },
    { id: 2, label: "Price", name: "price", type: "number" },
    { id: 3, label: "Rating", name: "rating", type: "number" },
    { id: 4, label: "Description", name: "description", type: "text" },
    { id: 5, label: "Image", name: "image", type: "text" },
  ]);

  const buttons = useState<button[]>([
    { id: 0, name: "submit", label: "Submit" },
  ]);

  const dispatch = useDispatch();

  const onSubmit = (values: initialValues) => {
    let newProduct = {} as Welcome;

    if (values.id) newProduct.id = values.id;
    newProduct.title = values.title;
    newProduct.description = values.description;
    newProduct.price = values.price;
    newProduct.image = values.image;
    newProduct.rating = { count: values.rating * 3, rate: values.rating };
    newProduct.category = { id: -1, name: values.category };

    dispatch(SAVE_PRODUCT(newProduct));

    router.push("/");
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      scrollBehavior="smooth"
      overflow="scroll"
      mt="5rem"
      w="30rem"
      h="75vh"
      pl="1rem"
    >
      <Flex
        scrollBehavior="smooth"
        overflow="scroll"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bg="white"
        p={6}
        rounded="lg"
        w="max-content"
      >
        <Flex h="10rem"></Flex>
        <Heading mb="1rem">New Product</Heading>
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

export default NewProductForm;
