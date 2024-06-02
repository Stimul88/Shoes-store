import {Nav} from "../Nav/Nav";
import "./header.css"

export const Header = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <Nav />
        </div>
      </div>
    </header>
  )
};
