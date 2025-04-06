/// <reference types="cypress" />

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should show error with invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('Pa$$w0rd!')
    cy.get('button[type="submit"]').click()

    // Verifica redirecionamento
    cy.url().should('include', '/dashboard')
    
    // Verifica se o usuário está logado
    cy.get('[data-testid="user-menu"]').should('exist')
  })

  it('should navigate to register page', () => {
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
  })
})