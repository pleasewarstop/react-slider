import { PageProducts } from "./components/PageProducts";
import { getProducts } from "./api/products";
import "@fontsource/poppins";
import "@fontsource/inter";

const Page = async () => {
  const res = await getProducts();
  return <PageProducts products={res} />;
};

export default Page;
