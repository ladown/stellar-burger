import ingredients from '../../fixtures/ingredients.json';

describe('Проверяет получение ингредиентов и их добавление', () => {
  it('Полученные ингредиенты были добавлены в DOM-дерево', () => {
    cy.get('[data-cy="ingredient"]').should(
      'have.length',
      ingredients.data.length
    );
  });
});
