import "./catalog.css";
import {CatalogWithCategories} from "../../components";
import {fetchItems, searchEl} from "../../store/itemsSlice";
import {useDispatch, useSelector} from "react-redux";

export function Catalog() {
  const { loading, error, searchItem } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const inputChange = (e) => {
    e.preventDefault()
    const { value } = e.target;
    dispatch(searchEl(value));
    setTimeout(() => {
      dispatch(fetchItems(`items?q=${value}`));
    }, 1000)
  }


  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <form data-id="search-form" className={`catalog-search-form form-inline`}>
          <input
            onChange={inputChange}
            name={"search"}
            value={searchItem}
            className="form-control" placeholder="Поиск"></input>
        </form>
        <CatalogWithCategories />
      </section>
    </>
  )
}