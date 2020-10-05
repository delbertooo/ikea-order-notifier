describe('IKEA', () => {
    it('cart cannot be ordered', () => {
        cy.on('uncaught:exception', (err, runnable) => false) // we don't care about errors
        cy.visit('https://www.ikea.com/de/de/profile/login/')
        cy.contains('Jetzt registrieren')
        cy.wait(250) // trying to fix detached errors on headless

        cy.get('#username').type(Cypress.env('IKEA_LOGIN'))
        cy.get('#password').type(Cypress.env('IKEA_PASSWORD'))
        cy.get('[name=login]').click()

        cy.contains('Ausloggen', { timeout: 30000 })

        cy.contains('Alle zulassen').click()

        cy.visit('https://www.ikea.com/de/de/shoppingcart/')

        cy.contains('Warenwert zzgl. Liefer-/Servicekosten')

        cy.get('.checkout__button').click()

        cy.get('#zipcode').type(Cypress.env('IKEA_ZIPCODE'))

        cy.contains('Lieferoptionen anzeigen').click()

        cy.contains('Wähle deinen Liefertermin.')

        cy.contains('Folgende Artikel sind begrenzt verfügbar für eine Lieferung.')
    })
})
