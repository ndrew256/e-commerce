import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Header, PrivateRoute, PublicRoute } from "./components";
import {
  Home,
  Login,
  NotFound,
  ProductPage,
  ProductsByCategory,
  Profile,
  Registration,
  Search,
} from "./pages";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/products/:categoryId"
                element={<ProductsByCategory />}
              />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Route>
          </Routes>
        </Header>
      </Router>
    </Provider>
  );
};

export default App;
