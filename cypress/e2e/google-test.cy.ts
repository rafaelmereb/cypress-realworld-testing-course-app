import factories from '../support/factories'
import GoogleHomePage from '../support/pages/google/google-home.page'

describe('Test spec', () => {

  beforeEach(() => {
    GoogleHomePage.go()
  })
  
  it.only('should load google home page', () => {
    cy.get('input[value="Pesquisa Google"]').eq(1).click()
  })

  it.skip('should load Google image', () => {
    cy.get('img[alt="Google"]').should(([first]) => {
      expect(first.complete).to.be.true; // image loads
      expect(first.naturalWidth).to.be.greaterThan(0)
      expect(first.naturalHeight).to.be.greaterThan(0)
    })
    cy.get('input[name="q"][type="text"]').as('searchInput').should('be.enabled').and('be.empty')
  })

  it('should suggest searches', () => {
    cy.get('input[name="q"][type="text"]').as('searchInput').type('Rafael')
    cy.get('[role="option"]').then(($options) => {
      return Cypress._.map($options, 'innerText')
    }).should('not.be.empty')

  })

  it('should perform a search', () => {
    GoogleHomePage.search('Cypress typed this text!')
  })

  it('should get the first search result', () => {
    cy.get('input[name="q"][type="text"]').as('searchInput').type('I should never have typed that!')
    cy.get('form').submit();
    cy.get('#search a')
      .invoke('attr', 'href')
      .then((href) => console.log(href));
    cy.get('.LC20lb').then(($element) => {
      return Cypress.$.makeArray($element).map((element) => element.innerText)
    }).should('not.be.empty')
  })

  it('should use a custom test data factory', () => {
    console.log('New person:')
    console.log(JSON.stringify(factories.person()))

    console.log('New company:')
    console.log(JSON.stringify(factories.company()))
  })


})