import React, { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./components/home-page/HomePage";
import MainNavbar from "./components/MainNavbar";
import MainFooter from "./components/MainFooter";
import Dashboard from "./components/dashboard/Dashboard";
import Categories from "./components/Categories";
import AddCategoryForm from "./components/dashboard/AddCategoryForm";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import EditCategories from "./components/dashboard/EditCategories";

import AddProductForm from "./components/dashboard/AddProductForm";
import SignUpForm from "./components/login&signup/SignUpForm";
import LoginForm from "./components/login&signup/LoginForm";

import Cart from "./components/cart/Cart";

import AccountSettings from "./components/account-settings/AccountSettings";

import WishList from "./components/account-settings/WishList";

import EditAccountForm from "./components/account-settings/EditAccountForm";


import Page404 from "./components/404";

import { loadUser } from "./redux/actions/auth-actions/loadUser";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // load our user everytime we render
    dispatch(loadUser());
  }, [dispatch]);

  const { user, loading, auth } = useSelector(state => state.userrr);

  // this method to control 404 not found page
  const generateRoute = (path, compt) => {
    if (user && auth.isCustomer && !loading) {
      return <Route path={path} component={compt} exact />;
    }  else if ((!user && !auth.customer, !loading)) {
      return <Route path={path} component={Page404} exact />;
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <div className='App'>
        <MainNavbar />
        <div className='page-body'>
          <Switch>
            {/* Public Routes */}
            <Route path='/' component={HomePage} exact />
            <Route path='/signup' component={SignUpForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/product/:id' component={SingleProduct} />
            <Route path='/categories' component={Categories} />
            <Route path='/products' component={AllProducts} />
            <Route path='/category/:id' component={CategoryProducts} />

            {/* Account settings Routes */}
            {generateRoute("/settings", AccountSettings)}
            {generateRoute("/settings/edit_account", EditAccountForm)}
           
          
          
            {generateRoute("/wish_list", WishList)}

            {/* Admin Dashboard  Routes */}
            {generateRoute("/dashboard", Dashboard)}
            {generateRoute("/addCategory", AddCategoryForm)}
            {generateRoute("/editCategories", EditCategories)}
            
      

            {/* Seller Dashboard  Routes */}
            {generateRoute("/addProduct", AddProductForm)}
     
           

            {/* Shipper Dashboard  Routes */}
          

            {/* Cart Routes */}
            {generateRoute("/cart", Cart)}
        

            {/* if no match just render 404 not found page */}
            <Route component={Page404} />
          </Switch>
        </div>
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;
