import "./cart.css"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {spaceForZeros} from "../../js/spaceForZeros";
import {getOrder} from "../../store/itemsSlice";

export function Cart() {
  const { loading, error, orders } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const allSumsCounts = Array.from(orders).map(item => item.price * item.count)
  const sumOfNumbers = allSumsCounts.reduce((acc, number) => acc + number, 0);

  const deleteItem = (e) => {
    e.preventDefault()
    const newArray = orders.filter(item => item.id !== Number(e.target.id))

    dispatch(getOrder(newArray))
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
          {Array.from(orders).map((item, index) =>
            <tr
              key={item.id}
            >
              <td scope="row">{index + 1}</td>
              <td>
                <Link to={`/catalog/${item.id}`}>{item.title}</Link>
              </td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{spaceForZeros(item.price)} руб.</td>
              <td>{spaceForZeros(item.price * item.count)} руб.</td>
              <td>
                <button
                  onClick={deleteItem}
                  id={item.id}
                  className="btn btn-outline-danger btn-sm">Удалить</button>
              </td>
            </tr>
          )}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{spaceForZeros(sumOfNumbers)} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}