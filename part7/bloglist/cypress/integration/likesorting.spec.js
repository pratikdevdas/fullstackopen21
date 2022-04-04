// writing this in a command based argurment

describe('first', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    cy.request('POST', 'http://localhost:8000/api/users', {
      username: 'mluukkai',
      name: 'Matti',
      password: 'salainen',
    })
    cy.login({ username: 'mluukkai', password: 'salainen' })
    cy.createBlog({
      title: 'a new blog is here',
      author: 'Roald Dahl',
      url: 'google.com',
      likes: 6,
    })
    cy.createBlog({
      title: 'a new blog is here twice',
      author: 'Roald Dahl',
      url: 'google.com',
      likes: 3,
    })
    cy.createBlog({
      title: 'a new blog is here thrice',
      author: 'Roald Dahl',
      url: 'google.com',
      likes: 8,
    })
    cy.createBlog({
      title: 'a new blog is four times',
      author: 'Roald Dahl',
      url: 'google.com',
      likes: 4,
    })
  })

  it('', function () {
    cy.contains('a new blog is here thrice').wrap({ likes: 8 })
  })
})
