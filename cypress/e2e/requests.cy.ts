describe('Request Tests', () => {

    context('GET Tests', () => {

        it('checking a GET request with an alias', () => {
            cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

            cy.get('@comments').should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).length.to.be.greaterThan(1)
                expect(response.body).length.to.be.greaterThan(499)
                expect(response.body).to.have.length(500)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })
        })

        it('should check contents of a page faster than visiting it', () => {
            cy.request('http://localhost:3000').its('body').should('not.include', '<h1>Admin</h1>')
        })

        it('should get an image URL from dog API', () => {
            cy.request('https://api.thedogapi.com/v1/images/search').then((response) => {
                expect(response.body).not.to.be.empty
                response.body.forEach(dogImageAddress => {
                    expect(dogImageAddress.url).to.exist
                    expect(dogImageAddress.url).not.to.be.empty
                    console.log(`dogImageAddress: ${dogImageAddress.url}`)
                })
                
            })
        })

    })

    context('POST Tests', () => {

        it('should get a card from deck API', () => {
            cy.request('POST', 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', { name: 'Rafael' }).then(
                (response) => {
                    // response.body is automatically serialized into JSON
                    expect(response.body).not.to.have.property('name', 'Rafael')
                    expect(response.body).to.have.property('deck_id') 
                    expect(response.body).to.have.property('remaining', 52)
                    expect(response.body).to.have.property('shuffled', true)
                    expect(response.body).to.have.property('success', true)
                    
                }
            )
        })

    })

})