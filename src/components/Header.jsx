import { FaChevronLeft } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";

const Header = ({
  showNavBack = false,
  title = "",
  showIcons = true,
  isAppTitle = true,
}) => {
  //   const navigate = useNavigate();
  //   const { t } = useTranslation();
  return (
    <header className="header sticky top-0">
      <div className="left">
        {showNavBack && (
          <FaChevronLeft
          // onClick={() => navigate(-1)}
          />
        )}
      </div>

      <div className={"center title pb-2" + (isAppTitle ? " app-title" : "")}>
        {"Artiste Doodles"}
      </div>
      <div className="right">
        {showIcons && (
          <div className="icons">
            {/* <Link to="/analytics"> */}
            <IoSearch />
            {/* </Link> */}
            {/* <Link to="/settings"> */}
            <IoCartOutline />
            {/* </Link> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
