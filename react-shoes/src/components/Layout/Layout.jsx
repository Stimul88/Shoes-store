import { Outlet } from "react-router-dom";
import {Header} from "../Header/Header";
import "./layout.css"
import {Banner} from "../Banner/Banner";
import {Footer} from "../Footer/Footer";
import {getOrder} from "../../store/itemsSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchTop} from "../../store/topSlice";

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem ("localOrder") === '') {
      return
    }
    const object = JSON.parse (localStorage.getItem ("localOrder"))
    dispatch(getOrder(object))
  }, [])


  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Outlet />
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};
