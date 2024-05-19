const email = 'cypress@teste.com'

describe('landing page', () => {
  it('Deve estar disponível e habilitar o fluxo de envio de email', () => {
    cy.visit('https://learn.itanuromero.com.br/')
    cy.get('input').click().type(email)
    cy.get('button').click()

    cy.wait(1000)

    cy.get('#completionMessage').should('exist').and('be.visible')
  })
})

describe('planilha', () => {
  it('Deve possuir, em sua última linha, o email inserido.', () => {
    cy.visit('https://docs.google.com/spreadsheets/d/1TP3et32uOJumZwHqFkRJRWhQRGDNCUoSlmyaceyUDwg/edit?usp=sharing', { failOnStatusCode: false })
    cy.get('#t-name-box').click().type('{ctrl+f}')
    cy.get('input.docs-findinput-input').click().type(email)
    cy.get('span.docs-findinput-count').contains('1 de')

    function goToLastOption() {
      cy.get('div#docs-findbar-button-next').click().then(() => {
        cy.get('span.docs-findinput-count').invoke('text').then((text) => {
          const regex = /^(\d+) de \1$/

          if (regex.test(text)) {
            assert(true)
          } else {
            goToLastOption()
          }
        })
      })
    }

    goToLastOption()

    cy.get('div.docs-slidingdialog-button-close').click()

    cy.get('#t-name-box').invoke('val').then(coordinates => {
      cy.log('Novo e-mail disponível em: ' + coordinates)
      cy.get('#t-name-box').click().type(coordinates.replace('B', 'A') + '{enter}')
      cy.get('#t-formula-bar-input').invoke('text').then(date => cy.log('Inserido na data: ' + date))
    })

  })
})
