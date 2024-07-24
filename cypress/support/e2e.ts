import { setCookie } from '../../src/utils/cookie';

beforeEach(() => {
  cy.visit('http://localhost:4000');

  setCookie('accessToken', Cypress.env('ACCESS_TOKEN'));

  cy.intercept('GET', `${Cypress.env('BURGER_API_URL')}/auth/user`, {
    fixture: 'user.json'
  });

  cy.intercept('GET', `${Cypress.env('BURGER_API_URL')}/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.intercept('POST', `${Cypress.env('BURGER_API_URL')}/orders`, {
    fixture: 'orders.json'
  });
});
