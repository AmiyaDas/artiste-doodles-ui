import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoFilterOutline, 
  IoGridOutline, 
  IoListOutline,
  IoHeartOutline,
  IoHeart,
  IoStar,
  IoStarHalf,
  IoChevronDown
} from 'react-icons/io5';

// Import actual images
import img1 from '../assets/img.jpg';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';
import carousel3 from '../assets/carousel3.jpg';
import category1 from '../assets/category1.png';

// Sample product data - replace with API data
const sampleProducts = [
  {
    id: 1,
    name: "Abstract Doodle Set",
    artist: "Sarah Chen",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 128,
    image: img1,
    category: "Abstract",
    tags: ["modern", "colorful", "set"],
    isFavorite: false,
    isNew: true,
    discount: 25
  },
  {
    id: 2,
    name: "Nature Sketch Collection",
    artist: "Mike Johnson",
    price: 24.99,
    rating: 4.8,
    reviews: 95,
    image: carousel1,
    category: "Nature",
    tags: ["nature", "pencil", "collection"],
    isFavorite: true,
    isNew: false
  },
  {
    id: 3,
    name: "Geometric Patterns",
    artist: "Emma Davis",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.2,
    reviews: 67,
    image: carousel2,
    category: "Geometric",
    tags: ["geometric", "minimal", "patterns"],
    isFavorite: false,
    isNew: false,
    discount: 17
  },
  {
    id: 4,
    name: "Portrait Doodle Pack",
    artist: "Alex Rivera",
    price: 34.99,
    rating: 4.7,
    reviews: 203,
    image: category1,
    category: "Portrait",
    tags: ["portrait", "character", "pack"],
    isFavorite: false,
    isNew: true
  },
  {
    id: 5,
    name: "Mandala Designs",
    artist: "Lisa Wong",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.6,
    reviews: 89,
    image: carousel3,
    category: "Mandala",
    tags: ["mandala", "spiritual", "intricate"],
    isFavorite: true,
    isNew: false,
    discount: 18
  },
  {
    id: 6,
    name: "Comic Style Doodles",
    artist: "Tom Wilson",
    price: 27.99,
    rating: 4.4,
    reviews: 156,
    image: img1,
    category: "Comic",
    tags: ["comic", "fun", "cartoon"],
    isFavorite: false,
    isNew: false
  }
];

const categories = ["All", "Abstract", "Nature", "Geometric", "Portrait", "Mandala", "Comic"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" }
];

const ProductList = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [favorites, setFavorites] = useState(new Set());

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (selectedSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSort, priceRange]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="block group">
      <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}>
        {/* Product Image */}
        <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'w-full h-48'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Favorite Button - Prevent navigation when clicking */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
            aria-label="Toggle favorite"
          >
            {favorites.has(product.id) ? (
              <IoHeart className="text-red-500 text-lg" />
            ) : (
              <IoHeartOutline className="text-gray-600 text-lg" />
            )}
          </button>

          {/* New Badge */}
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full font-medium">
              NEW
            </span>
          )}

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-xs mt-1">
                by {product.artist}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Quick Add to Cart Button - Only visible on hover */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 transition-all duration-200"
            >
              Quick Add
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white">

      {/* Toolbar */}
      <div className="sticky top-16 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          {/* Results Count */}
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products
          </span>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-gray-200 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IoGridOutline className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-gray-200 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IoListOutline className="text-lg" />
            </button>
          </div>
        </div>

        {/* Sort and Filter Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            <IoFilterOutline className="text-lg" />
            Filter
          </button>
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Sort
            <IoChevronDown className="text-lg" />
          </button>
        </div>
      </div>

      {/* Sort Dropdown */}
      {showSort && (
        <div className="absolute top-32 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedSort(option.value);
                setShowSort(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                selectedSort === option.value ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setShowFilters(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 text-sm rounded-full border ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Apply Filters */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      <div className="p-4">
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 gap-4'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
