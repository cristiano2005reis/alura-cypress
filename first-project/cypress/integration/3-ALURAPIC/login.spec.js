describe('Login alurapic users', () => {

    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com');

      cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
        statusCode: 400
      }).as('stubPost')
     });

     it('Login with a valid user', () => {
        cy.login('flavio', '123');
        cy.wait('@stubPost')
        cy.contains('a', '(Logout)').should('be.visible');
     });
 
     it('Login with a invalid user', () => {
         cy.login('flavio', '1111');
         cy.on('window:alert', (str) => {
          expext(str).to.equal('Invalid user name or password');
         })
     });
})