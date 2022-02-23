import React, { useState } from "react";
import Image from "next/image";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

function Product({ id, title, price, description, category, image }) {
  const MIN_RATING = 0;
  const MAX_RATING = 5;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [freeShipping] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      freeShipping
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 cursor-pointer">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map(() => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="EUR" />
      </div>
      {freeShipping && (
        <div className="flex items-center space-x-2 -mt-5">
          <ShoppingCartIcon className="w-5" />
          <p className="text-sx text-gray-500">Free Delivery</p>
        </div>
      )}
      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
