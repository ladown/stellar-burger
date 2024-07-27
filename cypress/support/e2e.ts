beforeEach(() => {
  cy.visit('/');

  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  });

  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user.json'
  });

  cy.intercept('POST', 'api/orders', {
    fixture: 'orders.json'
  });
});
