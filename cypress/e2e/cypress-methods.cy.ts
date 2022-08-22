describe('empty spec', () => {

  it('checking the .its() method', () => {
    // .its() - Get a property's value on the previously yielded subject.
    cy.wrap(["Wai Yan", "Yu"]).its(1).should("eq", "Yu")
    cy.wrap({ age: 52 }).its("age").should("eq", 52) // true
  })

  it('checking the .request() and .invoke() method', () => {
    // .invoke() - Invoke a function on the previously yielded subject.
    cy.request('https://deckofcardsapi.com/api/deck/new/draw/?count=10').its('body.cards')
      .invoke('every', card => card.image !== "")
  })

  it('checking the .within() method', () => {
    // .within() - Scopes all subsequent Cypress commands to within an element.
    cy.visit('http://localhost:3000')
    cy.getByData('hero-heading').within(() => {
      cy.get('span').contains('Testing Next.js Applications with Cypress')
    })
  })
})