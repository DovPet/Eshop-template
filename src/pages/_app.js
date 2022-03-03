import { Provider } from "react-redux";
import { store } from "../app/store";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "react-toast-notifications";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  useEffect(async () => {
    let categories;

    const categoriesStr = localStorage.getItem("categories");
    categories = categoriesStr ? JSON.parse(categoriesStr) : undefined;

    if(!categories)
    {
      categories = await fetch(
        "https://fakestoreapi.com/products/categories"
      ).then((res) => res.json());
      localStorage.setItem("categories", JSON.stringify(categories));
    }

  }, []);

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <NextNProgress color="#FACC14" />
          <Component {...pageProps} />;
        </Provider>
      </SessionProvider>
    </ToastProvider>
  );
};

export default MyApp;
