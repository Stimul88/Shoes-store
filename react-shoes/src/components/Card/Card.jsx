import "./Card.css"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {spaceForZeros} from "../../js/spaceForZeros";
import {fetchProduct, returnOne} from "../../store/productSlice";


export function Card({props}) {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const getFetchProduct = () => {
    if(product.id !== props.id) {
      dispatch(fetchProduct(props.id))
      dispatch(returnOne())
    }
  }

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={props.images[0]}
             className="card-img-top img-fluid" alt={props.title}>
        </img>
        <div className="card-body">
          <p className="card-text">{props.title}</p>
          <p className="card-text">{spaceForZeros(props.price)} руб.</p>
          <Link
            onClick={getFetchProduct}
            className="btn btn-outline-primary"
            to={`/catalog/${props.id}`}>
            Заказать
          </Link>
        </div>
      </div>
    </div>
  )
}