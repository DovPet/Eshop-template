import Header from "../../../../components/Header";
import Link from "next/link";
import Image from "next/image";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import Head from "next/head";
import { useToasts } from "react-toast-notifications";

import Product from "../../../../components/Product";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../../../slices/basketSlice";

function Details({ product, products, images }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { id, title, price, description, category, rating } = product;
  const [activeImage, setActiveImage] = useState(
    images[0].thumbnails.large.url
  );
  const MIN_RATING = 0;
  const MAX_RATING = 5;
  const [fakeRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [freeShipping] = useState(Math.random() < 0.5);
  const [stock] = useState(Math.random() * 10);
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image: images[0].thumbnails.large.url,
      rating: fakeRating,
      freeShipping,
    };
    dispatch(addToBasket(product));
    addToast(`Item ${title} added to basket`, { appearance: "success" });
  };

  return (
    <>
      <Head>
        <title>{title} | Eshop MVP</title>
      </Head>
      <Header />
      <div className="bg-gray-200 p-10 mb-10">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{" "}
          /{" "}
          <span className="font-medium">
            <Link href="/product">Product</Link>
          </span>{" "}
          / <span className="font-medium capitalize">
            <Link href={`/${category.toString().trim().split(" ").join("-")}`}>{category}</Link>
          </span>{" "}
          / <span className="text-yellow-500">{title}</span>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4">
              <Image
                className="w-full rounded-lg"
                width={700}
                height={500}
                objectFit="contain"
                src={activeImage}
                alt=""
              />
            </div>
            <div className="flex items-center">
              {images &&
                images.map((image) => (
                  <div
                    className="mr-3 mb-3 cursor-pointer"
                    key={image.id}
                    onClick={() => setActiveImage(image.thumbnails.large.url)}
                  >
                    <Image
                      className="rounded-md"
                      width={100}
                      height={100}
                      objectFit="contain"
                      src={image.thumbnails.large.url}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="px-5 mb-10 w-full md:w-5/12">
            <p className="font-serif text-xl text-black">{category}</p>
            <h1 className="my-2 text-5xl text-yellow-500 mb-7">{title}</h1>
            <p className="text-gray-600 text-base mb-5">{description}</p>
            <p className="flex items-center">
              <b className="mr-1">Rating:</b> {rating.rate}
              <StarIcon className="h-5 text-yellow-500" />
              <span> ({rating.count})</span>
            </p>
            <p>
              <b>Stock:</b> {stock > 0 ? "Available in stock" : "Stock out!"}
            </p>
            <p className="text-yellow-500 text-2xl mb-7">
              <Currency quantity={price} />
            </p>
            {freeShipping && (
              <div className="flex items-center space-x-2">
                <ShoppingCartIcon className="w-5" />
                <p className="text-xs text-gray-500">Free delivery</p>
              </div>
            )}
            <button onClick={addItemToBasket} className="w-full button mt-4">
              Add to Basket
            </button>
          </div>
        </div>
      </main>
      <div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-yellow-500 text-3xl mb-7 ml-6">
            Related Products
          </h1>
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products
                .slice(0, 4)
                .map(
                  ({
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    shipping,
                    colors,
                  }) => (
                    <Product
                      products={products}
                      key={id}
                      id={id}
                      title={title}
                      shipping={shipping}
                      price={price}
                      description={description}
                      category={category}
                      image={image}
                      colors={colors}
                    />
                  )
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

export const getStaticPaths = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );

  const paths = products.map((product) => {
    return {
      params: {
        id: product.id.toString(),
        category: product.category.toString().trim().split(" ").join("-"),
        title: product.title.toString().trim().split(" ").join("-"),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const product = await fetch("https://fakestoreapi.com/products/" + id).then(
    (response) => response.json()
  );
  const productCategory = product.category;
  const products = await fetch(
    "https://fakestoreapi.com/products/category/" + productCategory
  ).then((response) => response.json());

  const images = [
    {
      thumbnails: {
        small: {
          url: product.image,
          width: 56,
          height: 36,
        },
        large: {
          url: product.image,
          width: 801,
          height: 512,
        },
        full: {
          url: product.image,
          width: 3000,
          height: 3000,
        },
      },
    },
    {
      thumbnails: {
        small: {
          url: "https://dl.airtable.com/.attachmentThumbnails/0f2191badb153d6db9f812d341055277/0887bf8c",
          width: 56,
          height: 36,
        },
        large: {
          url: "https://dl.airtable.com/.attachmentThumbnails/1af97a4d3eb28563962d8e3520727ffc/1b9cc17f",
          width: 801,
          height: 512,
        },
        full: {
          url: "https://dl.airtable.com/.attachmentThumbnails/ad4a0f3a5b3354914552cadf210ed519/a1023d11",
          width: 3000,
          height: 3000,
        },
      },
    },
    {
      thumbnails: {
        small: {
          url: "https://dl.airtable.com/.attachmentThumbnails/70b4307c1448c34ae50cfe051f42a836/eb994249",
          width: 54,
          height: 36,
        },
        large: {
          url: "https://dl.airtable.com/.attachmentThumbnails/826555d5d6822244247cfb7f3b634313/d3b127e1",
          width: 768,
          height: 512,
        },
        full: {
          url: "https://dl.airtable.com/.attachmentThumbnails/6857df54069073c54dadb60c8b3067ee/49806a0f",
          width: 3000,
          height: 3000,
        },
      },
    },
    {
      thumbnails: {
        small: {
          url: "https://dl.airtable.com/.attachmentThumbnails/bcec08fc80190a581cfc2f2d907d4880/2b647050",
          width: 50,
          height: 36,
        },
        large: {
          url: "https://dl.airtable.com/.attachmentThumbnails/62c1708a1a04de7f4f4d240899775563/aecdcb8d",
          width: 717,
          height: 512,
        },
        full: {
          url: "https://dl.airtable.com/.attachmentThumbnails/fc89e85d2216dc2ba12472cf7ce759ec/c092b104",
          width: 3000,
          height: 3000,
        },
      },
    },
  ];

  return {
    props: { product, products, images },
  };
};
