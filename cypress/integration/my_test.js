describe('My Tests', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    it('Add information and submit form', () => {
        cy.get('[data-cy=name]').type('William Jensen').should("have.value", "William Jensen");
        cy.get('[data-cy=size]').select("Large").should("have.value", "Large");
        cy.get('[data-cy=cheese]').check();
        cy.get('[data-cy=ham]').check();
        cy.get('[data-cy=pineapple]').check();
        cy.get('[data-cy=instructions]').type("Light pineapple. More ham").should("have.value", "Light pineapple. More ham");
        cy.get('[data-cy=submit]').click()
    })
}) 