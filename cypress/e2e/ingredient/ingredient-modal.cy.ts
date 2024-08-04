describe('Проверяем работу модального окна', () => {
  beforeEach(() => {
    cy.get('[data-cy="ingredient-modal-trigger"]').first().click();

    if (cy.get('[data-cy="modal"]')) {
      cy.get('[data-cy="modal"]').as('modal');
    }
  });

  it('Модальное окно должно открываться по клику на ссылку в карточке ингредиента', () => {
    cy.get('@modal').should('exist');
  });

  it('Модальное окно должно закрываться по клику на крестик', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('Модальное окно должно закрываться по клику на overlay', () => {
    cy.get('[data-cy="modal-overlay"]').click(0, 0);
    cy.get('@modal').should('not.exist');
  });
});
