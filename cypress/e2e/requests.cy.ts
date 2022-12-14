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

    context.only('Typeform API Tests', () => {
        const sampleForm = require('../fixtures/sampleForm.json')
        const API_URL = Cypress.env('API_BASE_URL')
        const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`

        it('retrieves my user data', () => {
            cy.request({
                method: 'GET',
                url: `${API_URL}/me`,
                headers: { authorization }
            }).should(({ status, body }) => {
                const { alias, email, language } = body

                expect(status).to.eq(200)
                expect(alias).to.eq('Rafael Canêdo')
                expect(email).to.eq('rafaelcdmm@gmail.com')
                expect(language).to.eq('en')
            })
        })

        it('retrieves my form responses', () => {
            cy.request({
                method: 'GET',
                url: `${API_URL}/forms/${Cypress.env('FORM_ID')}/responses`,
                headers: { authorization }
            }).should(({ status, body }) => {
                const { items, page_count, total_itens } = body
                cy.log(body)

                expect(status).to.eq(200)
                expect(total_itens) === items.length

            })
        })

        it('retrieves my saved themes', () => {
            cy.request({
                method: 'GET',
                url: `${API_URL}/themes`,
                headers: { authorization }
            }).should(({ status, body }) => {
                const { items, page_count, total_items } = body
                cy.log(body)
                expect(status).to.eq(200)
                expect(page_count).to.be.greaterThan(0);
                expect(total_items).to.be.greaterThan(0);
                expect(total_items) === items.length

            })
        })

        context('Cleanup before start', () => {
            beforeEach(() => {
                cy.request({
                    method: 'GET',
                    url: `${API_URL}/forms`,
                    headers: { authorization },
                }).should(({ status, body }) => {
                    expect(status).to.eq(200)
                    body.items.forEach(item => {
                        if(item.title === sampleForm.title) {
                            cy.request({
                                method: 'DELETE',
                                url: `${API_URL}/forms/${item.id}`,
                                headers: { authorization },
                            }).then(({ status }) => {
                                expect(status).to.eq(204)
                            })
                        }
                    })
                })
            })

            it('creates an api', () => {
                cy.request({
                    method: 'POST',
                    url: `${API_URL}/forms`,
                    headers: { authorization },
                    body: sampleForm
                }).should(({ status, body }) => {
                    const { fields, title, type } = body
                    expect(status).to.eq(201)
                    expect(fields.length).to.eq(sampleForm.fields.length)
                    expect(title).deep.equal(sampleForm.title)
                    expect(type).deep.equal(sampleForm.type)
                })
            })
        })

    })

})