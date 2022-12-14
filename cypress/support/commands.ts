/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add("loginByApi", (username, password) => {
    return cy.request("POST", `http://localhost:3000/login`, {
        username,
        password,
    })
})

Cypress.Commands.add("imOnAStableChromiumBasedBrowser", () => {
    return Cypress.isBrowser({ family: 'chromium', channel: 'stable' })
})