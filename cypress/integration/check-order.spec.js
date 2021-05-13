function orderList() {

    cy.visit('https://www.ikea.com/de/de/favourites/')

    cy.get('[data-testid="select-list-item"]').contains('IKEAOrderNotifier').click()

    cy.get('.summary [data-cy-id="addAll-to-cart"]').click()

}

describe('IKEA', () => {
    it('cart cannot be ordered', () => {
        cy.on('uncaught:exception', (err, runnable) => false) // we don't care about errors
        cy.visit('https://www.ikea.com/de/de/profile/login/')
        cy.contains('Jetzt registrieren')
        cy.wait(1000) // trying to fix detached errors on headless

        cy.get('#username').type(Cypress.env('IKEA_LOGIN'))
        cy.get('#password').type(Cypress.env('IKEA_PASSWORD'))
        cy.get('[name=login]').click()

        cy.contains('Ausloggen', { timeout: 30000 })

        cy.contains('Alle zulassen').click()

        orderList()


        cy.visit('https://www.ikea.com/de/de/shoppingcart/')

        cy.get(".shoppingbag__title-container .cart-ingka-svg-icon").click()

        cy.contains('Warenkorb leeren').click()

        orderList()

        cy.visit('https://www.ikea.com/de/de/shoppingcart/')


        cy.contains('Zwischensumme')

        cy.get('[data-testid="checkoutButton__default"]').click()
        
        cy.wait(1000) // zip code may not be attached yet

        cy.get('[data-cy-id="zipcode_inputfield"]').type(Cypress.env('IKEA_ZIPCODE'), {force: true})

        cy.contains('Lieferoptionen anzeigen').click()

        cy.contains('Wähle deinen Liefertermin.')

        cy.contains('Folgende Artikel sind begrenzt verfügbar für eine Lieferung.')
    })
})
