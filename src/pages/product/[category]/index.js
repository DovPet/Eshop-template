import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filter from "../../../components/Filter";
import FiltredProducts from "../../../components/FiltredProducts";
import Header from "../../../components/Header";
import { addProducts } from "../../../slices/basketSlice";

function Category({ products, category }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  const joinedCategory = category.split("-").join(" ")

  return (
    <>
      <Head>
        <title>{joinedCategory} | Ehop Template</title>
      </Head>
      <Header />

      <div className="bg-gray-200 p-10 mb-10">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{" "}
          /{" "}
          <span className="font-medium">
            <Link href="/product">Products</Link>
          </span>{" "}
          / <span className="text-yellow-500 capitalize">{joinedCategory}</span>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/12 w-full mb-5 px-5">
            <Filter preActiveCategory={category.split("-").join(" ")} />
          </div>
          <div className="md:w-9/12 w-full mb-5 px-5">
            <FiltredProducts />
          </div>
        </div>
      </main>
    </>
  );
}

export default Category;

export const getStaticPaths = async () => {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((response) => response.json());

  const paths = categories.map((category) => {
    return {
      params: {
        category: category.toString().trim().split(" ").join("-"),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const category = context.params.category;

  const products = await fetch(
    "https://fakestoreapi.com/products/category/" +
      category.split("-").join(" ")
  ).then((response) => response.json());

  return {
    props: { products, category },
  };
};
