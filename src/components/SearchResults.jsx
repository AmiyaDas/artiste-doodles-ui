import { useState, useEffect } from 'react';
import { IoSearchOutline, IoFilterOutline, IoClose } from 'react-icons/io5';

// Import actual images
import img1 from '../assets/img.jpg';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';

// Sample search results - replace with API data
const sampleSearchResults = [
  {
    id: 1,
    name: "Abstract Doodle Set",
    artist: "Sarah Chen",
    price: 29.99,
    rating: 4.5,
    image: img1,
    category: "Abstract",
    tags: ["modern", "colorful"]
  },
  {
    id: 2,
    name: "Nature Sketch Collection",
    artist: "Mike Johnson",
    price: 24.99,
    rating: 4.8,
    image: carousel1,
    category: "Nature",
    tags: ["nature", "pencil"]
  },
  {
    id: 3,
    name: "Geometric Patterns",
    artist: "Emma Davis",
    price: 19.99,
    rating: 4.2,
    image: carousel2,
    category: "Geometric",
    tags: ["geometric", "minimal"]
  }
];

const SearchResults = ({ addToCart, toggleFavorite, favorites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(sampleSearchResults);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    rating: 0
  });

  useEffect(() => {
    // Simulate API search
    const searchProducts = () => {
      setIsLoading(true);
      setTimeout(() => {
        let filtered = sampleSearchResults.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // Apply filters
        if (filters.category) {
          filtered = filtered.filter(product => product.category === filters.category);
        }
        
        filtered = filtered.filter(product => 
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        if (filters.rating > 0) {
          filtered = filtered.filter(product => product.rating >= filters.rating);
        }

        setResults(filtered);
        setIsLoading(false);
      }, 500);
    };

    searchProducts();
  }, [searchQuery, filters]);

  const categories = ["Abstract", "Nature", "Geometric", "Portrait", "Mandala", "Comic"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-white">
      {/* Search Bar */}
      <div className="sticky top-16 bg-white border-b border-gray-200 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for doodles, artists, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IoClose />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <IoFilterOutline className="text-xl" />
            </button>
          </div>

          {/* Search Suggestions */}
          {searchQuery && (
            <div className="mt-3 flex flex-wrap gap-2">
              {["abstract", "nature", "geometric", "portrait", "mandala", "comic"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ₹{filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'Browse All Products'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">by {product.artist}</p>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-sm">
                            {"★".repeat(Math.floor(product.rating))}
                            {product.rating % 1 !== 0 && "☆"}
                          </div>
                          <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <IoSearchOutline className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-gray-500">Popular searches:</span>
                    {["abstract art", "nature doodles", "geometric patterns"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
