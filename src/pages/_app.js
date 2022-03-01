import { Provider } from "react-redux";
import { store } from "../app/store";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "react-toast-notifications";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={2000} >
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </ToastProvider>
  );
};

export default MyApp;
