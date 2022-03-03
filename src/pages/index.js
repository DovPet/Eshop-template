import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home({ products, categories }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(products);
    if (products) setIsLoading(false);
    else setIsLoading(true);
  }, [products]);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Eshop template</title>
      </Head>
      <Header />
      {isLoading ? (
        <h1>IS LOADING</h1>
      ) : (
        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
