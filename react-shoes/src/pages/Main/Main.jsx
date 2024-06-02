import "./main.css"
import {useDispatch, useSelector} from "react-redux";
// import {fetchCards, search} from "../../app/ImdbSlice";
import {useNavigate} from "react-router-dom";
import banner from '../../img/banner.jpg';
export function Main() {
  const { searchName} = useSelector((state) => state.imdb);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandler = (e) => {
    e.preventDefault()

    // dispatch(fetchCards(`s=${searchName}`))
    navigate('/movie');
  }

  const inputChange = (e) => {
    e.preventDefault()
    const { value } = e.target;

    // dispatch(search(value))
  }

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </>
  )
}