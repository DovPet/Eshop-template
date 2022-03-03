import React from "react";
import Image from "next/image";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  freeShipping,
}) {
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

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map(() => (
              <StarIcon key={title + id} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="EUR" />
        {freeShipping && (
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="w-5" />
            <p className="text-sx text-gray-500">Free Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="mt-auto button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="mt-auto button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
