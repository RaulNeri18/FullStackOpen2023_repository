describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    //User BackEnd1
    const user1 = {
      username : 'rnerip',
      name : 'Raul Neri',
      password : '123456789'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)

    //User BackEnd2
    const user2 = {
      username : 'cnerip',
      name : 'Carrie Neri',
      password : '1234567890'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    //End
    cy.visit('')
  })

  //5.17
  it('Login form is shown', function() {
    cy.get('form').should('exist')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')

    cy.get('#login-button').should('exist')
  })

  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('rnerip')
      cy.get('#password').type('123456789')

      cy.get('#login-button').click()

      cy.contains('Raul Neri logged in')
      cy.contains('logout').should('exist')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('rnerip')
      cy.get('#password').type('987654321')

      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Raul Neri logged in')
      cy.get('html').should('not.contain', 'logout')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'rnerip', password: '123456789' })
    })

    //5.19
    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title-input').type('New Title')
      cy.get('#author-input').type('Raul Neri')
      cy.get('#url-input').type('www.raulneri.com')

      cy.get('#createBlog').click()

      cy.get('html').should('contain', 'New Title')
      cy.get('html').should('contain', 'Raul Neri')
      cy.contains('view').should('exist')
    })

    describe('When exists Blogs', function() {
      beforeEach(function() {
        //User rnerip(Raul Neri) is creating all the blogs
        cy.createBlog({ title: 'The title with the third most likes', author: 'Raul Neri', url: 'www.raulneri.com' })
        cy.createBlog({ title: 'The title with the second most likes', author: 'Carrie Neri', url: 'www.carrieneri.com' })
        cy.createBlog({ title: 'The title with the most likes', author: 'John Neri', url: 'www.johnneri.com' })
      })

      //5.20
      it('confirms users can like a blog', function() {
        cy.get('.blog').eq(0).as('firstDiv')
        cy.get('.blog').eq(1).as('secondDiv')

        cy.get('@secondDiv').contains('view').click()
        cy.get('@secondDiv').contains('button', 'like').click()
        cy.wait(3000)
        cy.get('@firstDiv').contains('likes 1')
      })

      //5.21
      it('the user who created a blog can delete it', function() {
        cy.get('.blog').eq(0).as('firstDiv')
        cy.get('.blog').eq(2).as('thirdDiv')

        cy.get('@thirdDiv').contains('view').click()
        cy.get('@thirdDiv').contains('remove')
        cy.get('@thirdDiv').contains('button', 'remove').click()

        //cy.contains('view').eq(0).click()
        //cy.contains('like').eq(0).click()
        //cy.contains('remove').eq(0).click()
      })

      //5.22
      it('only the creator can see the delete button of a blog, not anyone else', function() {
        cy.contains('logout').click()
        cy.login({ username: 'cnerip', password: '1234567890' })

        cy.get('.blog').eq(0).as('firstDiv')
        cy.get('@firstDiv').contains('view').click()
        cy.get('@firstDiv').contains('button', 'remove').parent().should('not.be.visible')
        cy.get('@firstDiv').contains('button', 'remove').parent().should('have.css', 'display', 'none')
      })

      //5.23
      it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function(){
        cy.get('.blog').eq(0).as('firstDiv')
        cy.get('.blog').eq(1).as('secondDiv')
        cy.get('.blog').eq(2).as('thirdDiv')

        cy.get('@thirdDiv').contains('view').click()
        cy.get('@thirdDiv').contains('button', 'like').click() //John
        cy.wait(3000)
        cy.get('@firstDiv').contains('button', 'like').click() //John
        cy.wait(3000)
        cy.get('@firstDiv').contains('button', 'like').click() //John
        cy.wait(3000)
        cy.get('@secondDiv').contains('view').click()
        cy.get('@secondDiv').contains('button', 'like').click() //Raul
        cy.wait(3000)
        cy.get('@thirdDiv').contains('view').click()
        cy.get('@thirdDiv').contains('button', 'like').click() //Carrie
        cy.wait(3000)
        cy.get('@thirdDiv').contains('button', 'like').click() //Carrie
        cy.wait(3000)

        cy.get('@firstDiv').should('contain', 'The title with the most likes')
        cy.get('@secondDiv').should('contain', 'The title with the second most likes')
        cy.get('@thirdDiv').should('contain', 'The title with the third most likes')

        //cy.get('.blog').eq(0).should('contain', 'The title with the second most likes')
        //cy.get('.blog').eq(1).should('contain', 'The title with the third most likes')
        //cy.get('.blog').eq(2).should('contain', 'The title with the most likes')
      })
    })
  })
})