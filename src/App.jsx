import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import "./App.scss";

// Components
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/Toast";

function App() {
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [toast, setToast] = useState(null);

  // Toast management
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  const hideToast = () => {
    setToast(null);
  };

  // Cart management functions
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" added to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Favorites management
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        showToast('Removed from favorites', 'info');
      } else {
        newFavorites.add(productId);
        showToast('Added to favorites!', 'success');
      }
      return newFavorites;
    });
  };

  return (
    <Router>
      <div className="App">
        <AppRoutes
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          setCartItems={setCartItems}
        />
        
        {/* Toast Notification */}
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
