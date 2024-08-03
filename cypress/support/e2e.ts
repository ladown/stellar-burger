beforeEach(() => {
  cy.setCookie(
    'accessToken',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Njc1MzVkOTdlZGUwMDAxZDA2ZmQ3ZSIsImlhdCI6MTcyMjY3NTkzMCwiZXhwIjoxNzIyNjc3MTMwfQ.4mkg-YCmfK64eCZ7CTdOkdpnfziRf5DEJb9_0DPIo9s'
  );

  cy.visit('/');

  cy.intercept('GET', '/api/ingredients', {
    fixture: 'ingredients.json'
  });

  cy.intercept('GET', '/api/auth/user', {
    fixture: 'user.json'
  });

  cy.intercept('POST', '/api/orders', {
    fixture: 'orders.json'
  });
});

afterEach(() => {
  cy.clearCookie('accessToken');
});
