import { getProducts, Product } from "@/api/products";
import { HomeClient } from "@/app/page.client";

export default async function Home() {
  let products: Product[] = [];
  let productsError: string | undefined;
  try {
    products = await getProducts();
  } catch (e: any) {
    productsError = e?.status?.error_message || "Fetch error";
  }
  return <HomeClient products={products} productsError={productsError} />;
}
