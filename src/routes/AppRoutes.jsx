import { Routes, Route } from 'react-router-dom';

// Components
import Header from "../components/Header";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import AccountDetails from "../components/AccountDetails";
import SearchResults from "../components/SearchResults";

const AppRoutes = ({
  cartItems,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  toggleFavorite,
  favorites,
  setCartItems
}) => {
  return (
    <Routes>
      {/* Home Page */}
      <Route 
        path="/" 
        element={
          <>
            <Header 
              showNavBack={false} 
              title="" 
              showIcons={true} 
              isAppTitle={true} 
              cartItems={cartItems}
            />
            <Home />
          </>
        } 
      />

      {/* Products Page */}
      <Route 
        path="/products" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Products" 
              showIcons={true} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <ProductList 
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </>
        } 
      />

      {/* Product Details Page */}
      <Route 
        path="/product/:id" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Product Details" 
              showIcons={true} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <ProductDetails 
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </>
        } 
      />

      {/* Cart Page */}
      <Route 
        path="/cart" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Cart" 
              showIcons={false} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <Cart 
              cartItems={cartItems}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          </>
        } 
      />

      {/* Checkout Page */}
      <Route 
        path="/checkout" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Checkout" 
              showIcons={false} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <Checkout 
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </>
        } 
      />

      {/* Account Page */}
      <Route 
        path="/account" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Account" 
              showIcons={false} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <AccountDetails />
          </>
        } 
      />

      {/* Search Page */}
      <Route 
        path="/search" 
        element={
          <>
            <Header 
              showNavBack={true} 
              title="Search" 
              showIcons={true} 
              isAppTitle={false}
              cartItems={cartItems}
            />
            <SearchResults 
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
