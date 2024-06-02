import { NavLink } from "react-router-dom";
import "./nav.css"
import logo from '../../img/header-logo.png';
import {Search} from "../Search/Search";

export const Nav = () => {
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} alt="Bosa Noga"></img>
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarMain">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <NavLink className={active} to="/">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={active} to="/catalog">
              Каталог
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={active} to="/about">
              О магазине
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={active} to="/contacts">
              Контакты
            </NavLink>
          </li>
        </ul>
        <div>
          <div className="header-controls-pics">
            <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
            <div className="header-controls-pic header-controls-cart">
              <div className="header-controls-cart-full">2</div>
              <div className="header-controls-cart-menu"></div>
            </div>
          </div>
          <Search/>
        </div>
      </div>
    </nav>
  );
};