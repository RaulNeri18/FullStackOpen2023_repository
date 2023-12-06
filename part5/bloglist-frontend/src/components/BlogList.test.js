import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from './BlogList'

describe('<BlogList />', () => {
  let container
  let blog
  let updateBlogMock = jest.fn()
  let removeBlogMock = jest.fn()

  beforeEach(() => {
    blog = {
      title: 'Sample Title',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 5,
      user: { name: 'Raul Neri' }
    }

    const userLogged = { name: 'Raul Neri' }

    container = render(
      <BlogList
        blog={blog}
        userLogged={userLogged}
        updateBlog={updateBlogMock}
        removeBlog={removeBlogMock}
      />
    ).container
  })

  //5.13
  test('that the component BlogList renders the blogs title and author, but not its URL or number of likes by default', () => {
    //screen.debug(screen.getByText('view'))
    expect(screen.getByText('view')).toBeInTheDocument()

    //screen.debug(screen.getByText(blog.url).parentElement)
    //screen.debug(screen.getByText(`likes ${blog.likes}`).parentElement)
    expect(screen.getByText(blog.url).parentElement).toHaveStyle('display: none')
    expect(screen.getByText(`likes ${blog.likes}`).parentElement).toHaveStyle('display: none')
  })

  //5.14
  test('the blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container.querySelector('.togglableContent')).not.toHaveStyle('display: none')
  })

  //5.15
  test('calls the updateBlog function twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    expect(likeButton).toBeInTheDocument()

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogMock).toHaveBeenCalledTimes(2)
    expect(updateBlogMock.mock.calls).toHaveLength(2)
  })
})