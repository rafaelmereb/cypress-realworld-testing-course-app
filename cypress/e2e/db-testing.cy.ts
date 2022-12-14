describe('database tests', () => {

    const db = Cypress.env("DB")

    before(() => {
        cy.task("db:query", {
            dbConfig: db,
            sql: "SELECT NOW()"
        }).then((result) => {
            cy.log(result.rows)
        })
    })

    beforeEach(() => {
        cy.task("db:reset", db).then((result) => {
            cy.log(result.rows)
        })

        // db.seed
    })

    it('should check a table', () => {
        const query = "SELECT * FROM actor"
        // cy.task("db:connect", Cypress.env('DB')).then(cy.log)
        cy.task("db:query", {
            dbConfig: db,
            sql: query
        }).then((result) => {
            cy.log(result.rows)
        })
    })

})