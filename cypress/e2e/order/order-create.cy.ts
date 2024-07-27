import ingredients from '../../fixtures/ingredients.json';
import orders from '../../fixtures/orders.json';

const burgerConstructorSelector = '[data-cy="burger-constructor-element"]';

it('Проверка создания заказа', () => {
  cy.get('[data-cy="ingredient"]').each((ingredient) => {
    ingredient.get(0).querySelector('button')?.click();
  });

  cy.get(burgerConstructorSelector).should(
    'have.length',
    ingredients.data.length - 1
  );

  cy.get('[data-cy="burger-constructor"]')
    .contains('[type="button"]', 'Оформить заказ')
    .click();

  const modal = cy.get('[data-cy="modal"]');

  modal.should('exist');
  modal.get('[data-cy="order-number"]').contains(String(orders.order.number));
  modal.get('[data-cy="modal-close"]').click();
  modal.should('not.exist');

  cy.get(burgerConstructorSelector).should('have.length', 0);
});
