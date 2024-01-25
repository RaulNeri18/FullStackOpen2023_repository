import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"


const Recommend = (props) => {
  //console.log('genre', props.favoriteGenre)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.favoriteGenre }
  })

  if (result.loading)
    return <div>loading...</div>

  if (!props.show)
    return null

  const books = result.data.allBooks
  //console.log('books', books)
  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre <b>{props.favoriteGenre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend