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

  it('my directory has JSON files', () => {
    // if windows do one thing, else do another
    const cmd = Cypress.platform === 'win32' ? 'dir *.json' : 'ls *.json'
    cy.exec(cmd).its('stdout').should('include', 'package.json')
  })

  it('logging a message according to my browser', () => {
    // true when running in Firefox
    if (Cypress.isBrowser('firefox')) {
      cy.log('I\'m on Firefox!')
    }

    // true when running in Chrome
    if (Cypress.isBrowser('chrome')) {
      cy.log('I\'m on Google Chrome!')
    }

    // true when running in Electron
    if (Cypress.isBrowser('electron')) {
      cy.log('I\'m on Electron!')
    }

    // true when running in browser other than chrome, firefox and electron
    if (Cypress.isBrowser(['!chrome', '!electron', '!firefox'])) {
      cy.log('I\'m not on chrome, electron or firefox. I\'m on a different browser!')
    }

  })
})