import { createContext, useContext, useReducer } from 'react'

const blogAppReducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const BlogAppContext = createContext()

export const useBlogAppValue = () => {
  const blogAppAndDispatch = useContext(BlogAppContext)
  return blogAppAndDispatch[0]
}

export const useBlogAppDispatch = () => {
  const blogAppAndDispatch = useContext(BlogAppContext)
  return blogAppAndDispatch[1]
}

export const BlogAppContextProvider = (props) => {
  const [blogApp, blogAppDispatch] = useReducer(blogAppReducer, null)

  return (
    <BlogAppContext.Provider value={[blogApp, blogAppDispatch]}>
      {props.children}
    </BlogAppContext.Provider>
  )
}

export default BlogAppContext