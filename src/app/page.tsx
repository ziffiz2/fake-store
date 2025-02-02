import CheckoutOverlay from "@/components/client/CheckoutOverlay";
import { Header } from "@/components/server/Header";
import ProductList from "@/components/server/ProductList";

export default function Home() {
  return (
    <>
      <div className="w-full bg-white">
        <Header />
        <ProductList />
      </div>
      <CheckoutOverlay />
    </>
  );
}
