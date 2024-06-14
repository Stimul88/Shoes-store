import {Card, Categories} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchItems} from "../../store/itemsSlice";

export function CatalogWithCategories() {
  const { items, loading, error, searchItem } = useSelector((state) => state.items);
  const { setCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [setOldItems] = useState("")

  useEffect(() => {
    if(searchItem !== "") {
      dispatch(fetchItems(`items?q=${searchItem}`))
    }
    if(items.length === 0) {
      dispatch(fetchItems(""))
    }
  }, [])

  console.log(setCategories)

  useEffect(() => {
    if(searchItem !== "") {
      dispatch(fetchItems(`items?q=${searchItem}&categoryId=${setCategories}`))
      return
    }
    dispatch(fetchItems(`items?categoryId=${setCategories}`))
  }, [setCategories])

  const getYet = () => {
    if(setCategories === "") {
      dispatch(fetchItems(`items?${searchItem}&offset=6`))
      setOldItems(items)
      return
    }
    if(searchItem !== "") {
      dispatch(fetchItems(`items?q=${searchItem}&categoryId=${setCategories}&offset=6`))
      return
    }
    dispatch(fetchItems(`items?categoryId=${setCategories}&offset=6`))
    setOldItems(items)
  }

  return (
    <>
      {/*{error && <h4>{error}</h4>}*/}
      {loading  &&
        <div className="preloader">
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
      {!loading &&
        <>
          <Categories/>
          <div className="row">
            {loading &&
              <div className="preloader">
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>}
            {error && <h4>{error}</h4>}
            {items.map(item => <Card props={item} key={item.id}/>)}
          </div>
          <div className="text-center">
            {items.length < 6 &&
              <button
              onClick={getYet}
              className="invisible">Загрузить ещё</button>}
            {items.length === 6 &&
              <button
                onClick={getYet}
                className="btn btn-outline-primary">Загрузить ещё</button>}
          </div>
        </>
      }
    </>
  )
}