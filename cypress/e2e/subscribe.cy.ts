describe('Newsletter Subscribe Form', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('allows an user to subscribe to the email list', () => {
    cy.getByData('email-input').type('rafaelcdmm@gmail.com')
    cy.getByData('submit-button').click()
    cy.getByData('success-message').should('exist').should('be.visible')
  })

  it('does NOT allow an invalid email address', () => {
    cy.getByData('email-input').type('rafael')
    cy.getByData('submit-button').click()
    cy.getByData('success-message').should('not.exist')
  })

  it('does NOT allow users to sign up if they are already subscribed', () => {
    cy.getByData('email-input').type('john@example.com')
    cy.getByData('submit-button').click()
    cy.getByData('success-message').should('not.exist')
    cy.getByData('server-error-message').should('exist').should('be.visible')
  })
  
})