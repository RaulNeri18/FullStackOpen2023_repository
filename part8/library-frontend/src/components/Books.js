import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [allGenres, setAllGenres] = useState([])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  useEffect(() => {
    //console.log('result.data', result.data)
    //console.log('props.show', props.show)
    if (result.data) {
      const books = result.data.allBooks
      const uniqueGenres = [...new Set(books.flatMap(book => book.genres))];
      setAllGenres(uniqueGenres)
    }
  }, [result.data])

  if (result.loading || !result.data) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <div>in genre <b>{selectedGenre}</b></div>}

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

      <div>
        {allGenres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
