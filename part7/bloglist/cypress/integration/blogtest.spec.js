describe('Blog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    cy.request('POST', 'http://localhost:8000/api/users', {
      username: 'mluukkai',
      name: 'Matti',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown by default', function () {
    cy.contains('log in')
  })

  //   login tests
  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click({ force: true })
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti loggedin')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click({ force: true })
      cy.get('input:first').type('radhe')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('wrong')
    })
  })

  // creation and like tests
  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:8000/api/login', {
        username: 'mluukkai',
        password: 'salainen',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function () {
      cy.contains('Create a new Blog').click()
      cy.get('input:first').type('A new blog to be tested is here')
      cy.get('.author').type('Matti')
      cy.get('input:last').type('google.com')
      cy.contains('add').click()
      cy.contains('A new blog to be tested is here')
    })

    it('liked', function () {
      cy.contains('Create a new Blog').click()
      cy.get('input:first').type('A new blog to be tested is here')
      cy.get('.author').type('Matti')
      cy.get('input:last').type('google.com')
      cy.contains('add').click()
      cy.contains('like').click({ force: true })
      cy.contains('show').click({ force: true })
      cy.contains('likes:1')
    })

    describe('deletion test by same user', () => {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:8000/api/login', {
          username: 'mluukkai',
          password: 'salainen',
        }).then((response) => {
          localStorage.setItem(
            'loggedBlogappUser',
            JSON.stringify(response.body)
          )
          cy.visit('http://localhost:3000')
        })
        cy.contains('Create a new Blog').click()
        cy.get('input:first').type('A new blog to be tested is here')
        cy.get('.author').type('Matti')
        cy.get('input:last').type('google.com')
        cy.contains('add').click()
      })
      it('deletion', function () {
        cy.contains('show').click()
        cy.contains('remove').click()
      })
    })
  })
})
