import type { Welcome, category } from "../../types/productType";
import type { sortColumn } from "../../types/tableTypes";

import { useState, FC } from "react";
import Link from "next/link";
import _ from "lodash";
import { Text, Button, Flex, Input } from "@chakra-ui/react";

import ProductTable from "../../components/productTable";
import ListGroup from "../../templates/listGroup";
import Pagination from "../../templates/pagination";

import {
  GET_PRODUCT,
  DELETE_PRODUCT,
  SAVE_PRODUCT,
  CATEGORY_SELECT,
  PAGE_CHANGE,
  SEARCH,
  productsSelector,
  categoriesSelector,
  currentCategorySelector,
  pageSizeSelector,
  currentPageSelector,
  SORT,
  totalCountSelector,
  sortColumnSelector,
  searchSelector,
} from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Counter from "../../components/counter";

interface Props {}

const Products: FC<Props> = () => {
  const dispatch = useDispatch();

  const products = useSelector(productsSelector);
  const pageSize = useSelector(pageSizeSelector);
  const currentPage = useSelector(currentPageSelector);
  const totalCount = useSelector(totalCountSelector);
  const sortColumn = useSelector(sortColumnSelector);
  const search = useSelector(searchSelector);

  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <Flex h="100vh" w="100vp" background="gray.100" overflow="hidden">
      <Flex flexDirection="column" pl="1em">
        <Flex flexDirection="column" p="5">
          <Flex>
            <Link href="../Products/newProductForm">
              <a href="">
                <Button
                  size="sm"
                  bgGradient="linear(to-tr, #09C6F9, #045DE9)"
                  _hover={{ bgGradient: "linear(to-tl, #09C6F9, #045DE9)" }}
                  textColor="white"
                >
                  New Product
                </Button>
              </a>
            </Link>
            <Text p="3">{`Currently Showing ${totalCount} products`}</Text>
          </Flex>
          <Input
            placeholder="Search Title..."
            background="white"
            border="2px"
            borderColor="black"
            mb="4"
            value={search}
            onChange={(ev) => {
              const search = ev.target.value;
              dispatch(PAGE_CHANGE(1));
              dispatch(SEARCH(search));
              dispatch(CATEGORY_SELECT({ id: null, name: "All Category" }));
            }}
          />
          <ProductTable
            products={products}
            onDelete={(product: Welcome): void => {
              dispatch(DELETE_PRODUCT(product.id));
            }}
            sortColumn={sortColumn}
            onSort={(sortColumn: sortColumn) => {
              dispatch(SORT(sortColumn));
            }}
          />
        </Flex>
        <Flex>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageNumber: number): void => {
              dispatch(PAGE_CHANGE(pageNumber));
            }}
            currentPage={currentPage}
          ></Pagination>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Products;
