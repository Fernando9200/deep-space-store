/* eslint-disable no-undef */
describe('Purchase Flow', () => {
  before(() => {
    // Visit the home page
    cy.visit('/');
  });

  it('should allow a test user to log in, add an item to the cart, and complete a purchase', () => {
    // Log in with the test user account
    cy.visit('/login');

    // Use the type attribute to target the inputs
    cy.get('input[type="email"]').type('testaccount@hotmail.com');
    cy.get('input[type="password"]').type('123456');

    // Click the correct login button using a specific selector
    cy.get('form') // Start by narrowing to the form container
      .find('button')
      .contains('Login')
      .click();


    // Verify login is successful by checking for welcome message or URL change
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('body').should('contain', 'Welcome, Test');

    // Add an item to the cart
    cy.contains('Add to Cart').click();
    cy.contains('Cart').click();

    // Make sure to assert the page change to the cart
    cy.url().should('include', '/cart');
    cy.contains('Welcome, Test').should('be.visible');

    // Proceed to checkout
    cy.get('button').contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');

    // Fill in checkout details using more specific selectors
    cy.get('input[type="email"]').should('have.value', 'testaccount@hotmail.com');
    cy.get('input[type="tel"]').first().type('12345678901').should('have.value', '(12) 34567-8901');
    cy.get('button').contains('Next').click()

    // Fill in Delivery Details using data-test attributes
    cy.get('[data-test="cep-input"] input') // Target the input within the cep-input data attribute
      .should('have.length', 1) // Ensure only one element is selected
      .click() // Click into the field to focus it
      .type('29172622') // Type the CEP
      .should('have.value', '29172622');

    cy.get('[data-test="address-input"] input') // Target the input within the address-input data attribute
      .should('have.length', 1) // Ensure only one element is selected
      .click() // Click into the field to focus it
      .type('Rua K') // Sample address
      .should('have.value', 'Rua K');
    
    // Click Next button using force
    cy.get('button').contains('Next').click({ force: true });

    // Fill in Payment Details
    // Interact with the Vuetify v-select for selecting a payment method
    cy.get('.v-select') // Adjust the selector to match the v-select component
      .click() // Open the dropdown menu
      .get('.v-list-item') // Locate the list items
      .contains('Pix') // Find the item with the text 'Pix'
      .click(); // Select the option


    // Fill in CPF as it's common to both Pix and Credit Card
    cy.get('[data-test="CPF"] input') // Target the input within the cep-input data attribute
      .should('have.length', 1) // Ensure only one element is selected
      .click() // Click into the field to focus it
      .type('12152722989') // Type the CEP
      .should('have.value', '121.527.229-89');

    // Confirm the order
    cy.get('button').contains('Confirm Order').click({ force: true });
    cy.url().should('include', '/thank-you');
    cy.contains('Thank You for Your Order!');
  });
});
