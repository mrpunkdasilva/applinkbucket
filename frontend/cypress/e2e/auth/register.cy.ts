describe('Registration Flow', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should display registration form', () => {
    cy.get('input[name="name"]').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should validate form fields', () => {
    cy.get('button[type="submit"]').click()

    cy.get('[data-testid="name-error"]')
      .should('be.visible')
      .and('contain', 'Name is required')
    
    cy.get('[data-testid="email-error"]')
      .should('be.visible')
      .and('contain', 'Email is required')
    
    cy.get('[data-testid="password-error"]')
      .should('be.visible')
      .and('contain', 'Password is required')
  })

  it('should register successfully', () => {
    const testEmail = `test${Date.now()}@example.com`

    cy.get('input[name="name"]').type('Test User')
    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type('Pa$$w0rd!')
    cy.get('button[type="submit"]').click()

    // Verifica redirecionamento
    cy.url().should('include', '/dashboard')
    
    // Verifica mensagem de boas-vindas
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Welcome, Test User')
  })
})