import { Products } from "@/pages/Products";
import { getProducts } from "../api/products";

const RootPage = async () => {
  const res = await getProducts();
  return <Products products={res} />;
};

export default RootPage;
