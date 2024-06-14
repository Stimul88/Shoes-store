import './App.css';
import {Route, Routes} from "react-router-dom";
import {NotFound, Main, About, Contacts, Catalog, Product, Basket} from "./pages";
import { Layout } from "./components";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/catalog/:id" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
