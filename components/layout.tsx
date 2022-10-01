import type { category } from "../types/productType";

import { FC, useState } from "react";
import NavBar from "./navBar";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";

import ListGroup from "../templates/listGroup";

import {
  categoriesSelector,
  currentCategorySelector,
  CATEGORY_SELECT,
} from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsList } from "react-icons/bs";

interface Props {
  view: any;
}

const Layout: FC<Props> = ({ view }) => {
  const categories = useSelector(categoriesSelector);
  const currentCategory = useSelector(currentCategorySelector);

  const dispatch = useDispatch();

  const [dropDown, setDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    if (dropDown) setDropDown(false);
    else setDropDown(true);
  };
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

      <Flex flexDirection="column" overflow="scroll" scrollBehavior="smooth">
        <Flex mt="2rem" ml={["1rem", "-10rem"]}>
          <Menu autoSelect={false}>
            <MenuButton _expanded={{ bg: "gray.300", rounded: "lg" }}>
              <Tooltip label="Categories">
                <span>
                  <BsList size="2rem" onClick={toggleDropDown} />
                </span>
              </Tooltip>
            </MenuButton>
            <MenuList w="max-content">
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  {...(currentCategory.name === category.name
                    ? { bg: "black", textColor: "white" }
                    : { bg: "white", textColor: "black" })}
                  onClick={() => {
                    dispatch(CATEGORY_SELECT(category));
                  }}
                  isFocusable={true}
                >
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Flex alignContent="center" h="100vh" w="100vw">
          <Flex ml={["-10rem", "10"]}>
            <ListGroup
              categories={categories}
              onItemSelect={(category: category): void => {
                dispatch(CATEGORY_SELECT(category));
              }}
              selectedItem={currentCategory}
            />
          </Flex>
          <Flex ml="1rem" h="100vh" w="100%">
            {view}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
