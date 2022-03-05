import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Filter from "../../components/Filter";
import FiltredProducts from "../../components/FiltredProducts";
import Header from "../../components/Header";
import { addProducts } from "../../slices/basketSlice";

function Products({ products }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transision: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  return (
    <>
      <Head>
        <title>All Products | Ehop Template</title>
      </Head>
      <Header />

      <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
        <div className="bg-gray-200 p-10 mb-10">
          <div className="max-w-screen-xl mx-auto">
            <span className="font-medium">
              <Link href="/">Home</Link>
            </span>{" "}
            / <span className="text-yellow-500">Products</span>
          </div>
        </div>

        <main className="max-w-screen-xl mx-auto mt-5">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/12 w-full mb-5 px-5">
              <Filter />
            </div>
            
            <motion.div
              variants={fadeInUp}
              className="md:w-9/12 w-full mb-5 px-5"
            >
              <FiltredProducts />
            </motion.div>
          </div>
        </main>
      </motion.div>
    </>
  );
}

export default Products;

export const getStaticProps = async (context) => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );

  return {
    props: { products },
  };
};
