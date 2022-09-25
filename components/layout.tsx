import type { category } from "../types/productType";

import { FC } from "react";
import NavBar from "./navBar";
import { Flex } from "@chakra-ui/react";

import ListGroup from "../templates/listGroup";

import {
  categoriesSelector,
  currentCategorySelector,
  CATEGORY_SELECT,
} from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { NextComponentType, NextPageContext } from "next/types";

interface Props {
  view: any;
}

const Layout: FC<Props> = ({ view }) => {
  const categories = useSelector(categoriesSelector);
  const currentCategory = useSelector(currentCategorySelector);

  const dispatch = useDispatch();

  return (
    <Flex flexDirection="column" maxH="100vh" maxW="160vh" background="red.100">
      <Flex bg="black" textColor="white" p="5" maxW="160vh">
        <NavBar />
      </Flex>

      <Flex flexDirection="row" maxH="100vh">
        <Flex maxH="-moz-max-content">
          <ListGroup
            categories={categories}
            onItemSelect={(category: category): void => {
              dispatch(CATEGORY_SELECT(category));
            }}
            selectedItem={currentCategory}
          />
        </Flex>
        <Flex flexDirection="row">{view}</Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
