describe('Cypress fundamentals', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('asynchronous behaviour: checking the submit button classes', () => {
        cy.getByData('submit-button').then(($button) => {
            const btnClass = $button.attr('class')
            console.log(`These are the button classes: ${btnClass}`)
            cy.wrap($button).click().should('have.class', btnClass)
        })
    })

    it('aliases: checking an input placeholder', () => {
        cy.get('#email-address').as('second-input-email-address')
        cy.get('@second-input-email-address').then(($input) => {
            const inputPlaceholder = $input.attr('placeholder')
            console.log(`This is the second email input placeholder: ${inputPlaceholder}`)
        })
    })

    it('screenshots: taking some screenshots', () => {
        cy.screenshot()
        cy.log('Just took a Screenshot!')
        cy.get('a[href="/testing-your-first-application"]').screenshot('first-couse-button-link').click()
        cy.location('pathname').should('eq', '/testing-your-first-application')
        cy.wait(2000)
        cy.log('Taking a Screenshot after the page load!')
        cy.screenshot('first-course-page-screenshot')
    })

})