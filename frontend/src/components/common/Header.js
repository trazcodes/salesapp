import { NavLink } from 'react-router-dom';
import { isAuth } from './auth';

// DISPLAYING THE HEADER
function Header() {
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand" href="/user/addsale">INFOSALES</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li >
                {/* DISPLAYING BASED ON AUTHORIZATION */}
                {/* ================================== */}
                {isAuth() && <NavLink className="nav-link text-dark" to="/user/addsale" >ADD SALES</NavLink>}
              </li>
              <li >
                {isAuth() && <NavLink className="nav-link text-dark" to="user/topsale" >TOP 5 SALES</NavLink>}
              </li>
              <li >
                {isAuth() && <NavLink className="nav-link text-dark" to="user/revenue" >TOTAL REVENUE</NavLink>
                }              </li>
              <li>
                {!isAuth() && <NavLink className="nav-link text-dark" to="/login" >LOGIN</NavLink>}
              </li>
              <li>
                {!isAuth() && <NavLink className="nav-link text-dark" to="/register" >REGISTER</NavLink>}
              </li>
              <li>
                {isAuth() && <NavLink className="nav-link text-dark" to="user/logout" >LOGOUT</NavLink>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
