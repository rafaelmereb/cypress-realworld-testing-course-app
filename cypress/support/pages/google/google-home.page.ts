class GoogleHomePage {

    selectorMainInput = 'input[name="q"][type="text"]'
    selectorForm = 'form'

    elements = {
        mainInput: () => cy.get(this.selectorMainInput),
        formSubmit: () => cy.get(this.selectorForm).submit()
    }

    go(): void {
        cy.visit('http://www.google.com.br')
    }

    fillForm(searchInput: string): void {
        cy.get(this.selectorMainInput).as('searchInput')
            .clear()
            .type(searchInput)
    }

    search(searchInput: string): void {
        cy.get(this.selectorMainInput).as('searchInput')
            .type(searchInput)

        cy.get(this.selectorForm).as('form')
            .submit();
    }

}

export default new GoogleHomePage()