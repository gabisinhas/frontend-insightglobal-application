describe('Task List Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Should load the task list', () => {
    cy.contains('Task List');
  });

  it('Should add a new task', () => {
    cy.get('[data-testid="add-task-input"]').type('New Task');
    cy.get('[data-testid="add-task-button"]').click();
    cy.contains('New Task');
  });

  it('Should remove a task', () => {
    cy.get('[data-testid="task-item"]').first().find('[data-testid="remove-task-button"]').click();
    cy.get('[data-testid="task-item"]').should('have.length.lessThan', 1);
  });
});