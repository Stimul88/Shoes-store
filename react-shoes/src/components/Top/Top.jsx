import {Card} from "../Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTop} from "../../store/topSlice";
import "./top.css"

export function Top() {
  const { topSales, loading, error } = useSelector((state) => state.top);
  const dispatch = useDispatch();

  useEffect(() => {
    if(topSales.length === 0) {
      dispatch(fetchTop())
    }
  }, [])

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {/*{error && <h4>{error}</h4>}*/}
        {loading &&
          <div className="preloader">
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        { topSales.map(item => <Card props={item} key={item.id}/>)}
      </div>
    </section>
  )
}