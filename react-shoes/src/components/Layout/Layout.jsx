import { Outlet } from "react-router-dom";
import {Header} from "../Header/Header";
import "./layout.css"
import {Banner} from "../Banner/Banner";
import banner from "../../img/banner.jpg";
import {Footer} from "../Footer/Footer";

export const Layout = () => {
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
