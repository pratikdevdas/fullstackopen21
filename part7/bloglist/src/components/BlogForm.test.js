import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('blogform tests', () => {
  test('the form calls the event handler it received as props with right details when a new blog is created', () => {
    const blogAdder = jest.fn()

    render(<BlogForm blogAdder={blogAdder} />)

    const input = screen.getByPlaceholderText('firsttitle')
    // https://discord.com/channels/723559267868737556/723565838484897822/943197428448899072
    const sendButton = screen.getByText('add')

    userEvent.type(input, 'testing a form')
    userEvent.click(sendButton)

    expect(blogAdder.mock.calls).toHaveLength(1)
    expect(blogAdder.mock.calls[0][0].title).toBe('testing a form')
  })
})
