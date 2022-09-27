import { useRouter } from "next/router";
import NewProductForm from "../newProductForm";
import {
  GET_PRODUCT,
  productSelector,
} from "../../../store/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";

interface initialValues {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

const ProductForm = () => {
  const router = useRouter();

  const { pid } = router.query;
  const product = useSelector(productSelector);
  const dispatch = useDispatch();

  if (typeof pid === "string") dispatch(GET_PRODUCT(parseInt(pid)));

  const initialValues = {} as initialValues;

  if (product) {
    initialValues.id = product.id;
    initialValues.title = product?.title;
    initialValues.category = product.category.name;
    initialValues.description = product.description;
    initialValues.price = product.price;
    initialValues.rating = product.rating.rate;
    initialValues.image = product.image;
  }

  return initialValues ? (
    <NewProductForm data={initialValues} />
  ) : (
    <h1>Not found</h1>
  );
};

export default ProductForm;
