import "./search.css"

export function Search() {
  return (
    <form data-id="search-form" className="header-controls-search-form form-inline invisible">
      <input className="form-control" placeholder="Поиск"></input>
    </form>
  )
}