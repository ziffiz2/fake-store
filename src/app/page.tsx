import { Header } from "@/components/server/Header";
import ProductList from "@/components/server/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Header />
      <ProductList />
    </div>
  );
}
