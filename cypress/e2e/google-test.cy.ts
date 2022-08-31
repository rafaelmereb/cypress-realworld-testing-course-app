describe('Test spec', () => {

  beforeEach(() => {
    cy.visit('https://www.google.com.br')
  })

  it('should load Google website', () => {
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
    cy.get('input[name="q"][type="text"]').as('searchInput').type('Cypress typed this!')
    cy.get('form').submit();
  })

  it('should get the first search result', () => {
    cy.get('input[name="q"][type="text"]').as('searchInput').type('I should never have typed that!')
    cy.get('form').submit();
    cy.get('#search a')
      .invoke('attr', 'href')
      .then((href) => console.log(href));
  });


})