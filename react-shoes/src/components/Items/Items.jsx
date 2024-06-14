import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Card} from "../Card/Card";
import {fetchItems} from "../../store/itemsSlice";
import "./items.css"

export function Items({children}) {
  const { items, loading, error } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if(items.length === 0) {
      dispatch(fetchItems(""))
    }
  }, [])

  const getYet = (e) => {
    e.preventDefault()
    dispatch(fetchItems("?offset=6"))
  }


  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children}
      <div className="row">
        {loading &&
          <div className="preloader">
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        { items.map(item => <Card props={item} key={item.id}/>)}
      </div>
      <div className="text-center">
        <button
          onClick={getYet}
          className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  )
}

