describe('User Journey', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('a user can find a course on the home page and complete the courses lessons', () => {
    cy.get('a[href="/testing-your-first-application"]').click()
    cy.location('pathname').should('eq', '/testing-your-first-application')

    // Going to the next lesson
    cy.getByData('next-lesson-button').click()
    cy.location('pathname').should('eq', '/testing-your-first-application')

    // Moving forward
    cy.getByData('challenge-answer-0').click()
    cy.getByData('next-lesson-button').should('exist').click()
    cy.location('pathname').should('eq', '/testing-your-first-application/installing-cypress-and-writing-our-first-test')

    // Moving forward
    cy.getByData('challenge-answer-0').click()
    cy.getByData('next-lesson-button').should('exist').click()
    cy.location('pathname').should('eq', '/testing-your-first-application/setting-up-data-before-each-test')

    // Completing the Course
    cy.getByData('challenge-answer-0').click()
    cy.getByData('next-lesson-button').should('exist').contains('Complete Course').click()
    cy.location('pathname').should('eq', '/')
  })

})