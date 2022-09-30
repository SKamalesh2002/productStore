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

interface Props {
  view: any;
}

const Layout: FC<Props> = ({ view }) => {
  const categories = useSelector(categoriesSelector);
  const currentCategory = useSelector(currentCategorySelector);

  const dispatch = useDispatch();

  return (
    <Flex
      flexDirection="column"
      h="100vh"
      w="100vw"
      background="gray.100"
      overflow="hidden"
    >
      <Flex bg="black" textColor="white" p="5" w="100vw">
        <NavBar />
      </Flex>

      <Flex ml={["-10rem", "10"]} alignContent="center" h="100vh" w="100vw">
        <Flex>
          <ListGroup
            categories={categories}
            onItemSelect={(category: category): void => {
              dispatch(CATEGORY_SELECT(category));
            }}
            selectedItem={currentCategory}
          />
        </Flex>
        <Flex h="100vh" w="100%">
          {view}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
