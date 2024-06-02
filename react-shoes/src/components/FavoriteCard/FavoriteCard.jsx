export function FavoriteCard({props}) {
  return (
    <>
      <h1>{props.Title}</h1>
      <img src={props.Poster} alt=""/>
      <h2>{props.Year}</h2>
      <h2>{props.Genre}</h2>
      <h2>{props.Runtime}</h2>
      <h2>{props.Director}</h2>
      <h2>{props.Actors}</h2>
      <h2>{props.imdbRating}</h2>
      <hr/>
    </>
  )
}