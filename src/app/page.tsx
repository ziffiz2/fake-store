import { Header } from "@/components/server/Header";
import CartOverlay from "@/components/client/Cart/CartOverlay";
import CheckoutOverlay from "@/components/client/Checkout/CheckoutOverlay";
import OrderConfirmOverlay from "@/components/client/Checkout/OrderConfirmOverlay";

import ProductList from "@/components/server/ProductList";
import { Footer } from "@/components/server/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <div className="w-full bg-white">
        <Header />
        <ProductList />
        <Footer />
      </div>
      <CheckoutOverlay />
      <CartOverlay />
      <OrderConfirmOverlay />
    </>
  );
}
