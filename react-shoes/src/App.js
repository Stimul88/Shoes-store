
import './App.css';
import {Route, Routes} from "react-router-dom";
import {NotFound, Main, Catalog, About, Contacts} from "./pages";
import {Layout} from "./components";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
