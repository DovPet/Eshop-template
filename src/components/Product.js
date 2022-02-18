import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

function Product({ id, title, price, description, category, image }) {
  const MIN_RATING = 0;
  const MAX_RATING = 5;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [freeShipping] = useState(Math.random() < 0.5)

  return (
    <div>
      <p>{category}</p>
      <Image src={image} height={200} width={200} objectFit="contains" />
      <h4>{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map(() => (
            <StarIcon className="h-5" />
          ))}
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Product;
