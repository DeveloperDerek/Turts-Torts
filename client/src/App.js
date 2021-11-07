import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import axios from "axios";
import { UserContext } from "./utils/UserContext";

import HomePage from "./views/HomePage";
import ProductPage from "./views/Sales/ProductPage";
import CartPage from "./views/Sales/CartPage";
import CarePage from "./views/Guide/CarePage";
import AnimalPage from "./views/Guide/AnimalPage";
import TermsAndConditionPage from "./views/Information/TermsConditionPage";
import ShippingReturnPage from "./views/Information/ShippingReturns";
import PrivacyNotice from "./views/Information/PrivacyNotice";
import ContactPage from "./views/Information/ContactPage";
import CreateProduct from "./views/Admin/CreateProductPage";
import EditProduct from "./views/Admin/EditProductPage";
import ViewProducts from "./views/Admin/ViewProducts";
import ViewCategories from "./views/Admin/ViewCategories";
import CreateCategory from "./views/Admin/CreateCategory";
import EditCategory from "./views/Admin/EditCategory";
import CreateAnimal from "./views/Admin/CreateAnimal";
import EditAnimal from "./views/Admin/EditAnimal";
import ViewAnimals from "./views/Admin/ViewAnimals";
import ViewOrders from "./views/Admin/ViewOrders";
import EditOrder from "./views/Admin/EditOrder";
import AdminPage from "./views/Admin/AdminPage";
import ViewMessages from "./views/Admin/ViewMessages";
import SuppliesPage from "./views/Sales/SuppliesPage";
import CategoryPage from "./views/Sales/CategoryPage";
import ProfilePage from "./views/ProfilePage";
import OrderPage from "./views/Sales/OrderPage";
import TortoiseSalePage from "./views/Sales/TortoiseSalePage";
import TurtleSalePage from "./views/Sales/TurtleSalePage";
import Success from "./views/Information/Success";

function App() {
  const [loggedUser, setLoggedUser] = useState({
    check:false,
    userInfo:{}
  });

  useEffect(() => {
    axios
    .get("/api/user/login_check", { withCredentials: true })
    .then((res) => {
      setLoggedUser(prevData => ({
        ...prevData,
        check:true,
        userInfo:res.data
      }));
    })
    .catch(console.log);
  }, [])

  return (
    <div className="bg_color">
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Router>
          <HomePage path="/" />
          <ProductPage path="/product/:id" />
          <CartPage path="/cart" />
          <CarePage path="/care-guide" />
          <AnimalPage path="/about/:id" /> 
          <TermsAndConditionPage path="/terms-and-condition" />
          <ShippingReturnPage path="/shipping-and-return" />
          <PrivacyNotice path="/privacy-notice" />
          <ContactPage path="/contact-us" />
          <AdminPage path="/admin" />
          <CreateProduct path="/admin/create-product" />
          <EditProduct path="/admin/edit-product/:id" />
          <ViewProducts path="/admin/view-products" />
          <ViewCategories path="/admin/view-categories" />
          <CreateCategory path="/admin/create-category" />
          <EditCategory path="/admin/edit-category/:id" />
          <CreateAnimal path="/admin/create-animal" />
          <EditAnimal path="/admin/edit-animal/:id" />
          <ViewAnimals path="/admin/view-animals" />
          <ViewOrders path="/admin/view-orders" />
          <EditOrder path="/admin/edit-order/:id" />
          <ViewMessages path="/admin/view-messages" />
          <SuppliesPage path="/supplies" />
          <CategoryPage path="/category/:name/:id" />
          <ProfilePage path="/profile" />
          <OrderPage path="/order/:id" />
          <TortoiseSalePage path="/tortoise/:id" />
          <TurtleSalePage path="/turtle/:id" />
          <Success path="/success" />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
