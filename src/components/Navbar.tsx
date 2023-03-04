import { Link } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="navbar h-10 bg-blue-500 shadow sticky top-0 z-50">
      <div className="navbar-start px-5">
        <BiRestaurant size={30} color="white" />
        <Link to="/" className="btn btn-ghost normal-case text-lg text-white">
          Alan Resto
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end mr-10"></div>
    </div>
  );
};

export default Navbar;
