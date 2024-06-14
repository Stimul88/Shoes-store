import { NavLink } from "react-router-dom";
import "./nav.css"
import logo from '../../img/header-logo.png';
import {Search} from "../Search/Search";
import {useDispatch} from "react-redux";
import {searchEl} from "../../store/itemsSlice";

export const Nav = () => {
  const dispatch = useDispatch();

  const cleanSearch = () => {
    dispatch(searchEl(""))
  }
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink
        onClick={cleanSearch}
        className="navbar-brand" to="/">
        <img src={logo} alt="Bosa Noga"></img>
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarMain">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <NavLink
              onClick={cleanSearch}
              className={active} to="/">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={active} to="catalog">
              Каталог
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              onClick={cleanSearch}
              className={active} to="about">
              О магазине
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              onClick={cleanSearch}
              className={active} to="contacts">
              Контакты
            </NavLink>
          </li>
        </ul>
        <div>
          <Search />
        </div>
      </div>
    </nav>
  );
};