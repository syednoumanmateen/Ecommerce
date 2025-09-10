import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { UserProvider } from './context/UserContext.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <UserProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
          <ToastContainer />
        </UserProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
