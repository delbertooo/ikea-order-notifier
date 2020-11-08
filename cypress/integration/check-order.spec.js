function orderList() {

    cy.visit('https://www.ikea.com/de/de/favourites/')

    cy.get('[data-cy-id="open-list-menu"]').click()

    cy.get('[data-cy-id="list-of-lists"]').contains('IKEAOrderNotifier').click()

    cy.wait(1000)

    cy.contains('Online kaufen').click()

    cy.get('.summary [data-cy-id="move-all-to-cart"]').click()

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


        cy.contains('Warenwert zzgl. Liefer-/Servicekosten')

        cy.get('.checkout__button').click()

        cy.get('#zipcode').type(Cypress.env('IKEA_ZIPCODE'))

        cy.contains('Lieferoptionen anzeigen').click()

        cy.contains('Wähle deinen Liefertermin.')

        cy.contains('Folgende Artikel sind begrenzt verfügbar für eine Lieferung.')
    })
})
