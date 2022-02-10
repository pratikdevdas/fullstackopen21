import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'

describe('tests', () => {
  const blog = {
    title:'We are best',
    author:'Rev',
    url:'something.com',
    likes:3
  }

  test('checks if url and likes are not rendered by default', () => {

    const component = render(
      <Blog blog={blog}/>
    )

    component.debug()
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    // https://github.com/testing-library/jest-dom#tobevisible
    expect(component.getByText('something.com')).not.toBeVisible()
    expect(component.getByText('likes:3')).not.toBeVisible()
    // expect(component.container).not.toBeVisible('something.com')
  })


  test('when like button is clicked twice event handler component received as button is clicked twice', () => {

    const component = render(
      <Blog blog={blog}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.getByText('likes:3')).toBeVisible()
  })

  // test('when a like button is clicked twice', () => {  })
})

