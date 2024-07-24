describe('Проверяем работу модального окна', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.get('[data-cy="ingredient-modal-trigger"]').first().click();
  });

  it('Модальное окно должно открываться по клику на ссылку в карточке ингредиента', () => {
    cy.get('[data-cy="ingredient-modal"]').should('exist');
  });

  it('Модальное окно должно закрываться по клику на крестик', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });

  it('Модальное окно должно закрываться по клику на overlay', () => {
    cy.get('[data-cy="modal-overlay"]').click(0, 0);
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });
});
