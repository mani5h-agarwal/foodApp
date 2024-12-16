import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('token'); 
        navigate("/user/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            FoodApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              )}
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.fullName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="btn btn-link dropdown-item"
                        onClick={handleLogout}
                      >
                        LogOut
                      </button>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/cart">
                        My Cart
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/signup">
                      Create Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/signin">
                      SignIn
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

Nav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Nav;
