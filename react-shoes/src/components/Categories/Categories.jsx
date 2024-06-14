import "./categories.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {chooseCategory, fetchCategories} from "../../store/caregoriesSlice";

export function Categories() {
  const { categoriesArray, setCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if(categoriesArray.length === 0) {
    }
    dispatch(fetchCategories())
  }, [])

  const handleClick = (event) => {
    dispatch(chooseCategory(event.target.id))
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          className={setCategories === "" ? "nav-link active" : "nav-link"}
          onClick={handleClick}
        >Все</a>
      </li>
      { categoriesArray.map(item =>
        <li className="nav-item" key={item.id}>
          <a
            id={item.id}
            className={setCategories == item.id ? "nav-link active" : "nav-link"}
            onClick={handleClick}
          >{item.title}</a>
        </li>
       )}
    </ul>
  )
}