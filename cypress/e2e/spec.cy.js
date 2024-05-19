describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://learn.itanuromero.com.br/')
  })
})

describe('Testa a soma de dois números', () => {
  it('1 + 1 deve ser 3?', () => {
    expect(1 + 1).to.equal(3)
  })
})