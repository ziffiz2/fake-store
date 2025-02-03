import Image from "next/image";
import type { IProduct } from "@/types";
import StarRating from "./StarRating";
import AddToCartButton from "@/components/client/AddToCartButton";

async function ProductItemCard(props: IProduct) {
  return (
    <div className="mb-6">
      <div className="border p-4 rounded-xl mb-4">
        <div className="relative h-[285px]">
          <Image
            src={props.image}
            alt={props.title}
            fill
            sizes="96px"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div className="text-sm text-store-gray mb-2 sm:h-16 md:h-16 lg:h-12">{props.title}</div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-black text-lg font-semibold">${props.price}</div>
        <div>
          <StarRating rating={props.rating.rate} count={props.rating.count} />
        </div>
      </div>
      <AddToCartButton product={props} />
    </div>
  );
}

export default ProductItemCard;
