import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription, toReference } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  /*cache.modify({
    fields: {
      allBooks(existingBooks = []) {
        //console.log('existingBooks', existingBooks)
        const bookReference = {
          __ref: `Book:${addedBook.id}`
        }
        return existingBooks.concat(bookReference)
      },
    },
  })*/

  cache.updateQuery(query, ref => {
    //console.log('allBooks', ref.allBooks)
    return {
      allBooks: ref.allBooks.concat(addedBook) //uniqByName(ref.allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded

      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)
      if (addedBook.genres.includes(favoriteGenre))
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: favoriteGenre } }, addedBook)
    },
    onError: (error) => console.log('useSubscription', error)
  })

  useEffect(() =>{
    const localStore = localStorage.getItem('library-user')
    if (localStore && !token){
      const localStoreJSON = JSON.parse(localStore)
      setToken(localStoreJSON.token)
      setFavoriteGenre(localStoreJSON.favoriteGenre)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setToken(null)
    setPage('authors')
    client.resetStore()
  }
 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? 
        (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        ) : 
        ( 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} favoriteGenre={favoriteGenre}/>

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} setFavoriteGenre={setFavoriteGenre}/>
      
    </div>
  )
}

export default App
