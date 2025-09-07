import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { IoCartOutline, IoSearch, IoPersonOutline } from "react-icons/io5";
import logo from '../assets/logo.png'; // Add this import

const Header = ({
  showNavBack = false,
  title = "",
  showIcons = true,
  isAppTitle = true,
  cartItems = []
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  // Calculate total cart items
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header sticky top-0">
      <div className="left">
        {showNavBack && (
          <button 
            onClick={handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <FaChevronLeft className="text-xl" />
          </button>
        )}
      </div>

      <div className={"center title pb-2" + (isAppTitle ? " app-title" : "")}>
        {isAppTitle ? (
          <Link to="/" className="flex hover:opacity-80 transition-opacity">
            <img src={logo} alt="Artiste Doodles" className="h-8 w-auto" />
          </Link>
        ) : (
          title
        )}
      </div>

      <div className="right">
        {showIcons && (
          <div className="icons flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <IoSearch className="text-xl" />
            </button>

            <button
              onClick={handleCartClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Shopping cart"
            >
              <IoCartOutline className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleAccountClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Account"
            >
              <IoPersonOutline className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
