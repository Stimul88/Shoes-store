import "./product.css"
import {useDispatch, useSelector} from "react-redux";
import {
  cleanHighlight,
  fetchProduct,
  handleClickMinus,
  handleClickPlus,
  highlight,
  returnOne
} from "../../store/productSlice";
import {useNavigate} from "react-router-dom";
import {fetchItems, getOrder, select} from "../../store/itemsSlice";
import {useEffect} from "react";

export function Product() {
  const { orders } = useSelector((state) => state.items);
  const { product, loadingProduct, highlightSize, count } = useSelector((state) => state.product);
  const { loading, error } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickPlus = () => {
    dispatch(handleClickPlus())
  }

  const clickMinus = () => {
    dispatch(handleClickMinus())
  }

  const onHighlight = (e) => {
    if(e.target.dataset.available === "true") {
      dispatch(highlight(e.target.textContent))
    }
  }

  const navigateGo = () => {
    const newArray = Array.from(orders);

    const orderChoose = {
      id: product.id,
      title: product.title,
      sku: product.sku,
      manufacturer: product.manufacturer,
      product: product.color,
      material: product.material,
      season: product.season,
      reason: product.reason,
      size: highlightSize,
      count: count,
      price: product.price
    }
    const findId = newArray.find(item => item.id === product.id)

    if(findId) {
      const newArr = newArray.map(obj => {
        if (obj.id === product.id && obj.id !== obj.size) {
          return {...obj, count: count + obj.count};
        }
        return obj;
      });

      dispatch(getOrder(newArr))
      localStorage.setItem('localOrder', JSON.stringify(newArray))
      dispatch(returnOne())
      dispatch(cleanHighlight(""))
      navigate("/cart")
      return
    }

    dispatch(getOrder(newArray.concat(orderChoose)))
    localStorage.setItem('localOrder', JSON.stringify(newArray.concat(orderChoose)))
    dispatch(returnOne())
    dispatch(cleanHighlight(""))
    navigate("/cart")
  }

  return (
    <section className="catalog-item">
      {error && !loading && <h4>{error}</h4>}
      {loadingProduct &&
        <div className="preloader">
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
      {!loadingProduct &&
        <>
        <h2 className="text-center">{product.title}</h2>
        <div className="row">
        <div className="col-5">
        <img src={Array.from(product.images)[0]}
      className="img-fluid" alt={product.title}></img>
</div>
  <div className="col-7">
    <table className="table table-bordered">
      <tbody>
      <tr>
        <td>Артикул</td>
        <td>{product.sku}</td>
      </tr>
      <tr>
        <td>Производитель</td>
        <td>{product.manufacturer}</td>
      </tr>
      <tr>
        <td>Цвет</td>
        <td>{product.color}</td>
      </tr>
      <tr>
        <td>Материалы</td>
        <td>{product.material}</td>
      </tr>
      <tr>
        <td>Сезон</td>
        <td>{product.season}</td>
      </tr>
      <tr>
        <td>Повод</td>
        <td>{product.reason}</td>
      </tr>
      </tbody>
    </table>
    <div className="text-center">
      <p>Размеры в наличии:
        {Array.from(product.sizes).map(item =>
          <span
            key={item.size}
            className={highlightSize === item.size ?
              "catalog-item-size selected" :
              "catalog-item-size"}
            data-available={item.available}
            onClick={onHighlight}
          >{item.size}</span>
        )}
      </p>
      <p>Количество:
        <span className="btn-group btn-group-sm pl-2">
            <button
              className="btn btn-secondary"
              onClick={clickMinus}
            >-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button
              className="btn btn-secondary"
              onClick={clickPlus}
            >+</button>
        </span>
      </p>
    </div>
    <button
      onClick={navigateGo}
      disabled={highlightSize === ""}
      className="btn btn-danger btn-block btn-lg "
    >В корзину</button>
  </div>
</div>
      </>}
    </section>
  )
}