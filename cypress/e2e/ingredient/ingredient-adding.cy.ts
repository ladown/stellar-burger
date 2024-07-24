import ingredients from '../../fixtures/ingredients.json';

describe('Проверяет получение ингредиентов и их добавление', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', `${Cypress.env('BURGER_API_URL')}/ingredients`, {
      fixture: 'ingredients.json'
    });
  });

  it('Полученные ингредиенты были добавлены в DOM-дерево', () => {
    cy.get('[data-cy="ingredient"]').should(
      'have.length',
      ingredients.data.length
    );
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    cy.get('[data-cy="ingredient"]').each((ingredient) => {
      ingredient.get(0).querySelector('button')?.click();
    });

    cy.get('[data-cy="burger-constructor-element"]').each(
      (burgerConstructor) => {
        expect(
          ingredients.data.find(
            (ingredientItem) =>
              ingredientItem.name ===
              burgerConstructor.find('.constructor-element__text').text()
          )
        ).to.exist;
      }
    );
  });
});
