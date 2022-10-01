import type { PayloadAction } from "@reduxjs/toolkit";
import type { Welcome, category } from "../../types/productType";
import type { sortColumn } from "../../types/tableTypes";

import { createSlice } from "@reduxjs/toolkit";
import { getCateories, getProducts } from "../../components/fakeProducts";

import _ from "lodash";
import { paginate } from "../../utils/paginate";
import { WritableDraft } from "immer/dist/internal";
import { RootState } from "../store";

interface initialState {
  products: Welcome[];
  viewData: Welcome[];
  categories: category[];
  currentCategory: category;
  currentPage: number;
  pageSize: number;
  sortColumn: sortColumn;
  search: string;
  totalCount: number;
  product?: Welcome;
}

const categories: category[] = [
  { id: null, name: "All category" },
  ...getCateories(),
];

const searchData = (
  state: WritableDraft<initialState>,
  search: string
): Welcome[] =>
  state.products.filter((p) =>
    p.title.toLowerCase().startsWith(search.toLowerCase())
  );

const getPageData = (
  state: WritableDraft<initialState>
): { totalCount: number; data: Welcome[] } => {
  const filtered = state.search
    ? searchData(state, state.search)
    : state.currentCategory && state.currentCategory.id
    ? state.products.filter((p) => p.category.id === state.currentCategory.id)
    : state.products;

  const sorted = _.orderBy(
    filtered,
    [state.sortColumn.path],
    [state.sortColumn.order]
  );

  const pageProducts = paginate(sorted, state.currentPage, state.pageSize);

  return { totalCount: filtered.length, data: pageProducts };
};

const products = getProducts();
const initialState: initialState = {
  products: products,
  viewData: paginate(products, 1, 8),
  categories: categories,
  currentCategory: { id: null, name: "All category" },
  currentPage: 1,
  pageSize: 8,
  sortColumn: { path: "title", order: "asc" },
  search: "",
  totalCount: getProducts().length,
  product: undefined,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    GET_PRODUCT: (state, action: PayloadAction<number>) => {
      state.product = state.products.find((p) => p.id === action.payload);
    },

    DELETE_PRODUCT: (state, action: PayloadAction<number>) => {
      let productInDb = state.products.find((p) => p.id === action.payload);

      if (productInDb && state.products.includes(productInDb))
        state.products.splice(state.products.indexOf(productInDb), 1);

      state.viewData = getPageData(state).data;
      state.totalCount = getPageData(state).totalCount;
    },

    SAVE_PRODUCT: (state, action: PayloadAction<Welcome>) => {
      let productInDb: Welcome | undefined =
        state.products.find((p) => p.id === action.payload.id) ||
        ({} as Welcome);

      productInDb.id = action.payload.id;
      productInDb.title = action.payload.title;
      productInDb.price = action.payload.price;
      productInDb.image = action.payload.image;
      productInDb.rating = action.payload.rating;
      productInDb.description = action.payload.description;

      let category: category | undefined = categories.find(
        (c) => c.name === action.payload.category.name
      );

      if (category) productInDb.category = category;
      else
        category = {
          id: state.products.length + 1,
          name: action.payload.category.name,
        };

      if (!productInDb.id) {
        productInDb.id = state.products.length + 1;
        state.products.push(productInDb);
      }

      state.viewData = getPageData(state).data;
      state.totalCount = getPageData(state).totalCount;
    },

    CATEGORY_SELECT: (state, action: PayloadAction<category>) => {
      state.currentCategory = action.payload;
      state.currentPage = 1;
      state.viewData = getPageData(state).data;
      state.totalCount = getPageData(state).totalCount;
    },

    PAGE_CHANGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;

      state.viewData = getPageData(state).data;

      state.totalCount = getPageData(state).totalCount;
    },

    SORT: (state, action: PayloadAction<sortColumn>) => {
      state.sortColumn = action.payload;
      state.viewData = getPageData(state).data;
      state.totalCount = getPageData(state).totalCount;
    },

    SEARCH: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.viewData = getPageData(state).data;
      state.totalCount = getPageData(state).totalCount;
      state.currentPage = 1;
      state.currentCategory = { id: null, name: "All category" };
    },
  },
});

export const {
  GET_PRODUCT,
  DELETE_PRODUCT,
  SAVE_PRODUCT,
  CATEGORY_SELECT,
  PAGE_CHANGE,
  SORT,
  SEARCH,
} = productSlice.actions;

export const productsSelector = (state: RootState) => state.product.viewData;
export const categoriesSelector = (state: RootState) =>
  state.product.categories;
export const currentCategorySelector = (state: RootState) =>
  state.product.currentCategory;
export const pageSizeSelector = (state: RootState) => state.product.pageSize;
export const currentPageSelector = (state: RootState) =>
  state.product.currentPage;
export const sortColumnSelector = (state: RootState) =>
  state.product.sortColumn;
export const totalCountSelector = (state: RootState) =>
  state.product.totalCount;
export const searchSelector = (state: RootState) => state.product.search;
export const productSelector = (state: RootState) => state.product.product;

export default productSlice.reducer;
