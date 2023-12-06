import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  //5.16
  test('calls the updateBlog function twice when like button is clicked twice', async () => {
    const createBlogMock = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlogMock} />)

    await user.type(container.querySelector('#title-input'), 'New Title')
    await user.type(container.querySelector('#author-input'), 'Raul Neri')
    await user.type(container.querySelector('#url-input'), 'http://raulneri.com')

    await user.click(screen.getByText('create'))

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'New Title',
      author: 'Raul Neri',
      url: 'http://raulneri.com',
    })
  })
})

