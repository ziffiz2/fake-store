import { Header } from "@/components/server/Header";
import CheckoutOverlay from "@/components/client/Checkout/CheckoutOverlay";
import CartOverlay from "@/components/client/Cart/CartOverlay";

import ProductList from "@/components/server/ProductList";

export default function Home() {
  return (
    <>
      <div className="w-full bg-white">
        <Header />
        <ProductList />
      </div>
      <CheckoutOverlay />
      <CartOverlay />
    </>
  );
}
