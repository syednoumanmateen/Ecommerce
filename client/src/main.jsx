import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { LoadingProvider } from './context/LoadingContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <LoadingProvider>
        <UserProvider>
          <App />
          <ToastContainer />
        </UserProvider>
      </LoadingProvider>
    </Provider>
  </QueryClientProvider>
)
