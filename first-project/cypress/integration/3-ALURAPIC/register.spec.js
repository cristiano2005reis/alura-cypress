describe('Register alurapic users', () => {

    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com');
     });

     it('Verify validation messages', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    });

    it('Verify email validation messafes', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('jacqueline');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
     
    });

    it('Verify messages for password with less than 8 characters', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
     
    });

    const users = require('../../fixtures/users.json');
    users.forEach(user => {
        it.only(`Register new users ${user.userName}`, () => {
            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(user.email);    
            cy.get('input[formcontrolname="fullName"]').type(user.fullName);    
            cy.get('input[formcontrolname="userName"]').type(user.userName);    
            cy.get('input[formcontrolname="password"]').type(user.password);    
            cy.contains('button', 'Register').click();
        })
    });
})