import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoHeartOutline, IoHeart, IoStar, IoStarHalf, IoAdd, IoRemove, IoShareOutline } from 'react-icons/io5';

// Import actual images
import img1 from '../assets/img.jpg';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';

// Sample product data - replace with API call
const sampleProduct = {
  id: 1,
  name: "Abstract Doodle Set",
  artist: "Sarah Chen",
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.5,
  reviews: 128,
  images: [
    img1,
    carousel1,
    carousel2
  ],
  description: "A beautiful collection of abstract doodles perfect for modern art lovers. This set includes 50 unique designs in high-resolution format.",
  category: "Abstract",
  tags: ["modern", "colorful", "set"],
  inStock: true,
  stockCount: 15,
  specifications: {
    "Format": "Digital Download",
    "File Type": "PNG, SVG",
    "Resolution": "300 DPI",
    "Size": "A4, A3, A2"
  }
};

const ProductDetails = ({ addToCart, toggleFavorite, favorites }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(sampleProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, fetch product by ID
    setIsFavorite(favorites.has(parseInt(id)));
  }, [id, favorites]);

  const handleFavoriteClick = () => {
    toggleFavorite(parseInt(id));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={i} className="text-yellow-400 text-lg" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half" className="text-yellow-400 text-lg" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoStar key={`empty-${i}`} className="text-gray-300 text-lg" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Product Images */}
        <div className="mb-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-3">
                by {product.artist}
              </p>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <button
              onClick={handleFavoriteClick}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {isFavorite ? (
                <IoHeart className="text-red-500 text-xl" />
              ) : (
                <IoHeartOutline className="text-gray-600 text-xl" />
              )}
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-gray-900 mr-3">
            ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-50"
              >
                <IoRemove className="text-xl" />
              </button>
              <span className="px-4 py-3 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-50"
              >
                <IoAdd className="text-xl" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Stock Status */}
          <div className="flex items-center mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium">
                ✓ In Stock ({product.stockCount} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">
                ✗ Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
