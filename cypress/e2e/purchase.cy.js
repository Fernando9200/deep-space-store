/* eslint-disable no-undef */
describe('Purchase Flow', () => {
  before(() => {
    // Visit the home page
    cy.visit('/');
  });

  it('should allow a test user to log in, add an item to the cart, and complete a purchase', () => {
    // Log in with the test user account
    cy.visit('/login');

    cy.get('input[type="email"]').type('testaccount@hotmail.com');
    cy.get('input[type="password"]').type('123456');

    // Click the correct login button using a specific selector
    cy.get('form')
      .find('button')
      .contains('Login')
      .click();


    // Verify login is successful by checking for welcome message or URL change
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Add an item to the cart
    cy.contains('Adicionar').click();
    cy.contains('Carrinho').click();

    // Make sure to assert the page change to the cart
    cy.url().should('include', '/cart');

    // Proceed to checkout
    cy.get('button').contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');

    // Fill in checkout details using more specific selectors
    cy.get('input[type="email"]').should('have.value', 'testaccount@hotmail.com');
    cy.get('input[type="tel"]').first().type('27997786891').should('have.value', '(27) 99778-6891');
    cy.get('button').contains('Next').click()

    // Fill in Delivery Details using data-test attributes
    cy.get('[data-test="cep-input"] input')
      .should('have.length', 1)
      .click()
      .type('29172625')
      .should('have.value', '29172625');

    cy.get('[data-test="address-input"] input')
      .should('have.length', 1)
      .click()
      .should('have.value', 'Rua Natalino Ribeiro');
    
    cy.get('button').contains('Next').click({ force: true });

    // Fill in Payment Details
    cy.get('.v-select')
      .click()
      .get('.v-list-item')
      .contains('Pix')
      .click();


    cy.get('[data-test="CPF"] input')
      .should('have.length', 1)
      .click()
      .type('12152722989')
      .should('have.value', '121.527.229-89');
    
    cy.get('button').contains('Next').click({ force: true });

    // Confirm the order
    cy.get('button').contains('Confirm Order').click();
    cy.url().should('include', '/thank-you');
    cy.contains('Muito obrigado pela sua compra!');
  });
});
