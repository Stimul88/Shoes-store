import "./search.css"
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchItems, searchEl} from "../../store/itemsSlice";

export function Search() {
  const { searchItem, orders } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [ invisible, setInvisible ] = useState("invisible");
  const [ searchUse, setSearchUse ] = useState("");

  const navigate = useNavigate();

  const getInvisible = (e) => {
    e.preventDefault()
    if(invisible === "" && searchUse === "") {
      setInvisible("invisible")
      setSearchUse("")
      return
    }
    if(invisible === "" && searchUse !== "" ) {
      dispatch(fetchItems(`items?q=${searchItem}`))
      setInvisible("invisible")
      setSearchUse("")
      navigate("/catalog")
      return
    }
    setInvisible("")
  }

  const navigateGo = () => {
    navigate("/cart")
  }

  const inputChange = (e) => {
    e.preventDefault()
    const { value } = e.target;
    setSearchUse(value)
    dispatch(searchEl(value));
  }

  return (
    <>
      <div className="header-controls-pics">
        <div
          onClick={getInvisible}
          data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        <div
          onClick={navigateGo}
          className="header-controls-pic header-controls-cart">
          {orders.length === 0 && <div className="header-controls-cart-full invisible"></div>}
          {orders.length > 0 && <div className="header-controls-cart-full">{orders.length}</div>}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form data-id="search-form" className={`header-controls-search-form form-inline ${invisible}`}>
        <input
          onChange={inputChange}
          name={"search"}
          value={searchUse}
          className="form-control" placeholder="Поиск"></input>
      </form>
    </>
  )
}