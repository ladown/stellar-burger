import ingredients from '../../fixtures/ingredients.json';
import orders from '../../fixtures/orders.json';

it('Проверка создания заказа', () => {
  cy.get('[data-cy="ingredient"]').each((ingredient) => {
    ingredient.get(0).querySelector('button')?.click();
  });

  cy.get('[data-cy="burger-constructor-element"]').each((burgerConstructor) => {
    expect(
      ingredients.data.find(
        (ingredientItem) =>
          ingredientItem.name ===
          burgerConstructor.find('.constructor-element__text').text()
      )
    ).to.exist;
  });

  cy.get('[data-cy="burger-constructor"]')
    .contains('[type="button"]', 'Оформить заказ')
    .click();

  cy.get('[data-cy="modal"]').should('exist');
  cy.get('[data-cy="modal"] [data-cy="order-number"]').contains(
    String(orders.order.number)
  );
  cy.get('[data-cy="modal"] [data-cy="modal-close"]').click();
  cy.get('[data-cy="modal"]').should('not.exist');

  cy.get('[data-cy="burger-constructor-element"]').should('have.length', 0);
});
