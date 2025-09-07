import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoRemove, IoTrashOutline, IoArrowForward } from 'react-icons/io5';

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful doodles to your cart!</p>
          <Link
            to="/products"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Browse Products
            <IoArrowForward />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">by {item.artist}</p>
                      <p className="text-lg font-bold text-gray-900">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        <IoRemove />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        <IoAdd />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <IoTrashOutline className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    {discount}% discount applied!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-block text-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/products"
                className="w-full bg-white text-gray-900 border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-block text-center mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;