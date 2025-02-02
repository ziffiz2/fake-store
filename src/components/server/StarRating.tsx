import type { ReactNode } from "react";
import { Star } from "lucide-react";

interface IStarRating {
  rating: number;
  count: number;
  className?: string;
}

const statsArray = [1, 2, 3, 4, 5];

function getStarState(rating: number, position: number): string {
  const integerPart = Math.floor(rating);
  const decimalpart = rating - integerPart;

  if (position <= integerPart) {
    return "fill-yellow-400";
  }

  if (position === integerPart + 1 && decimalpart >= 0.5) {
    return "fill-yellow-400/50";
  }

  return "";
}

export default function StarRating(props: IStarRating): ReactNode {
  return (
    <div className={`flex align-items-center ${props.className}`}>
      {statsArray.map((position) => (
        <Star
          key={position}
          size={16}
          className={`text-yellow-400 ${getStarState(props.rating, position)}`}
        />
      ))}
      <span className="text-sm text-store-gray">({props.count})</span>
    </div>
  );
}
