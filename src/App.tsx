import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./utils/locale";
import { AppRouter } from "./navigation/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ONE MINUTE
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

i18n.use(initReactI18next).init({
  //@ts-ignore
  resources,
  lng: "hr",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <AppRouter />
            <ToastContainer
              position="bottom-right"
              hideProgressBar
              autoClose={5000}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover
              closeButton={false}
            />
          </ErrorBoundary>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
