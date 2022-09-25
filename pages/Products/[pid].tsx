import type { Welcome } from "../../types/productType";

import { useRouter } from "next/router";

import { Product } from "../../components/product";

import { GET_PRODUCT, productSelector } from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductView = () => {
  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();
  const product: Welcome | undefined = useSelector(productSelector);

  if (typeof pid === "string") dispatch(GET_PRODUCT(parseInt(pid)));

  return product ? <Product product={product} /> : <h1>Not found</h1>;
};

export default ProductView;
