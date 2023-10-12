// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const xlsx = require('xlsx')

Cypress.Commands.add('readExcelFile', (fileName, sheetName) => {
  cy.readFile(fileName, 'binary').then((content) => {
    const workbook = xlsx.read(content, { type: 'binary' })
    const worksheet = workbook.Sheets[sheetName]
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 })

    // Loop through each row and extract the data
    const data = []
    rows.forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        // Skip the first row since it contains headers
        return
      }

      const rowData = {}
      row.forEach((cellData, cellIndex) => {
        const header = rows[0][cellIndex]
        rowData[header] = cellData
      })

      data.push(rowData)
    })

    return data
  })
})


