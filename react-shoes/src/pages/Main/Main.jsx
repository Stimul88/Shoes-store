import "./main.css"
import {CatalogWithCategories, Top} from "../../components";

export function Main() {
  return (
    <>
      <Top/>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
      <CatalogWithCategories/>
        </section>
    </>
  )
}