import "./order.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getOrder, searchEl} from "../../store/itemsSlice";
import {fetchPost, getStatus} from "../../store/orderSlice";
import {forEach} from "react-bootstrap/ElementChildren";

export function Order() {
  const { orderError, orderLoading, orderStatus } = useSelector((state) => state.order);
  const {  orders } = useSelector((state) => state.items);
  const [info, setInfo] = useState({phone: '', address: ''})
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch();

  const {phone, address} = info;


  useEffect(() => {
    dispatch(getStatus(''))

  }, [])


  const inputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;

    setInfo((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const send = async (e) => {
    e.preventDefault()
    const newArray = []

    const newArrayFunction = () => {

      orders.forEach(item => {
        newArray.push( {
          id: item.id,
          price: item.price,
          count: item.count,
        })
      })
      return newArray
    }

    const newInfo = {
      "owner": {
        "phone": `${phone}`,
        "address": `${address}`,
      },
      "items": newArrayFunction()
    }

    dispatch(fetchPost(newInfo));
    setInfo((prevForm) => ({
      ...prevForm,
      phone: "", address: "",
    }));
    setCheck(false)
    if(orderError === '') {
      localStorage.setItem('localOrder', JSON.stringify([]))
      dispatch(getOrder([]))
      dispatch(getStatus('Ok'))
    }
  }

  const toggleFunc = () => {
    const getCheck = !check
    setCheck(getCheck);
  }

  return (
    <section className="order">
      {orderLoading &&
        <div className="preloader">
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
      {orderError && <h4>{orderError}</h4>}
      {orderStatus === 'Ok' &&  !orderLoading &&  <h4>{'Заказ принят!'}</h4>}
      {orderStatus === '' && !orderLoading  &&
        <>
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card">
            <form
              onSubmit={send}
              className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  name={"phone"}
                  value={phone}
                  onChange={inputChange}
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон">
                </input>
              </div>
              <div className="form-group">
                <label
                  htmlFor="address">Адрес доставки</label>
                <input
                  name={"address"}
                  value={address}
                  onChange={inputChange}
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки">
                </input>
              </div>
              <div className="form-group form-check">
                <input
                  onChange={toggleFunc}
                  checked={check}
                  type="checkbox" className="form-check-input" id="agreement"></input>
                <label
                  className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button
                disabled={check === false || phone.length === 0 || address.length === 0 || orders.length === 0}
                type="submit" className="btn btn-outline-secondary">Оформить
              </button>
            </form>
          </div>
        </>
        }
    </section>
  )
}