const path = require('path');

describe('Options', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid=options]').click();
  });

  it('Settings', () => {
    cy.contains('Settings').click();
    cy.get('.header').contains('Settings').should('exist');
    cy.get('[data-testid=settings-dupes] > label').click();
    cy.get('[data-testid=settings-nickname] > label').click();
    cy.get('[data-testid=settings-missing] > label').click();
    cy.get('[data-testid=settings-showall] > label').click();
    cy.contains('Close').click();
    cy.get('[data-testid=game-select]').click();
    cy.contains('Sword and Shield').click();
    cy.get('[data-testid=nickname-0] > input')
      .type('Bulba Nickname')
      .should('have.value', 'Bulba Nickname');
    cy.get('#search-filter').click();
    cy.get('[data-testid=pokemon-0] > .search').type('Bulb');
    cy.contains('Bulbasaur').click();
    cy.get('#search-filter').click();
    cy.get('[data-testid=pokemon-1] > .search').type('Bulb');
    cy.contains('Bulbasaur').click();
    cy.contains('DUPE').should('exist');
    cy.scrollTo('top');
    cy.contains('Starter').should('exist');
    cy.get('[data-testid=status-0]').click();
    cy.get('[data-testid=status-0] > .visible > :nth-child(2)').click();
    cy.contains('Starter').should('not.exist');
    cy.get('[data-testid=nickname-1] > .ui').click();
    cy.get('[data-testid=nickname-1] > input').should('have.length.above', 0);
  });

  it('About', () => {
    cy.contains('About').should('have.text', 'About (NEW)').click();
    cy.get('.header').contains('About').should('exist');
    cy.contains('Close').click();
    cy.get('[data-testid=options]').click();
    cy.contains('About').should('not.have.text', 'About (NEW)');
  });

  it('Export', () => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.contains('Export').click();
    const filename = path.join(downloadsFolder, 'PokemonList.json');
    cy.readFile(filename).its('badges').should('exist');
    cy.readFile(filename).its('games').should('exist');
    cy.readFile(filename).its('gamesList').should('exist');
  });

  it('Report', () => {
    cy.contains('Report').click();
    cy.get('[data-testid=report-type]').select('Suggestion').should('have.value', 'suggestion');
    cy.get('[data-testid=report-device]').select('Mobile').should('have.value', 'mobile');
    cy.get('[data-testid=report-os]').select('Android').should('have.value', 'android');
    cy.get('[data-testid=report-browser]').select('Firefox').should('have.value', 'firefox');
    cy.get('[data-testid=report-selectedgame]')
      .type('Emerald  Kaizo')
      .should('have.value', 'Emerald Kaizo');
    cy.get('[data-testid=report-description]')
      .type('Please  implement  new  feature')
      .should('have.value', 'Please implement new feature');
  });
});
