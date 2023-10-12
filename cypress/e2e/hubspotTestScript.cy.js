let ownerList = '#ownerList'
let tableSelector = '#table-data'
let sortByContact = '#SortByNextContact'
/// <reference types = "Cypress" />
const cheerio = require('cheerio');

describe('Sending email to top 5 clients', () => {
    it('Should visit hubspot page', () => {
        cy.viewport(1280, 850);
        cy.fixture('input.json').then((data) => {

            cy.visit('https://richmediawireless.com/dev/hubspot-test/', {
            auth: {
                username: 'richmedia',
                password: 'yellowrobot20'
            },
        });

        let recipientName, subject, bcc, bodyHtml, actualImageSource;

        cy.get(ownerList).select(data.ownerName)
        cy.wait(15000)
        // cy.get(sortByContact).click()
        // cy.wait(2000)
        // cy.get('#searchparam').type('Terri')
        // cy.get('.contact_search').click()
        const columnIndex = 3;
        cy.get(tableSelector).as('dataTable');
        for (let i = 0; i < data.numberOfRecords; i++) {

            cy.get('@dataTable')
                .find(`tr td:nth-child(${columnIndex + 1})`)
                .eq(i)
                .invoke('text')
                .then(async (cellData) => {
                    // Perform actions needed
                    // for example logging each cell data below
                    cy.log('Cell Data: ', cellData)

                    cy.get('@dataTable')
                        .find(`tr td:nth-child(${columnIndex + 1})`)
                        .eq(i)
                        .click();

                    cy.get('.selectEmailTemplate')
                        .select(data.campaginName)
                    cy.wait(8000)

                    cy.get('.sendEmailTemplate')
                        .invoke('attr', 'href')
                        .then(async (hrefValue) => {
                            const url = new URL(hrefValue);
                            const params = new URLSearchParams(url.search);
                            recipientName = hrefValue.split('?')[0].substring(7)
                            subject = params.get('subject');
                            bcc = params.get('bcc');

                            cy.log('param0 ', recipientName);
                            cy.log('param1', subject);
                            cy.log(`param2 ${bcc}`);
                            cy.log('hrefValue: ', hrefValue)

                                .get('.emailBlast.show').invoke('html').then((htmlblock) => {
                                    bodyHtml = htmlblock
                                    // cy.log(bodyHtml)

                                })
                                .get('.emailBlast.show').find('img').then(($imgURL) => {
                                    actualImageSource = $imgURL.prop('src');
                                    cy.log('Actual source ', actualImageSource)


                                    const $ = cheerio.load(bodyHtml);
                                    //const imgSrc = $('img').attr('src');
                                    const modifiedImgSrc = actualImageSource
                                    $('img').attr('src', modifiedImgSrc);

                                    const updatedHTML = $.html()

                                    cy.log('updated HTML with complete SRC, ', updatedHTML)


                                    .writeFile('cypress/e2e/tempFile.txt', updatedHTML).then(() => {
                                        cy.log('CREATED !!!!!!!!')
                                    })

                                })

                            await cy.exec(`powershell.exe -ExecutionPolicy Bypass -File cypress/e2e/sendEmail.ps1 -recipientName "${recipientName}" -subject "${subject}" -bcc "${bcc}"  `, { failOnNonZeroExit: false })
                                .then((result) => {
                                    // cy.log(result.stdout);
                                    // cy.log(result.stderr)
                                })

                        })

                    cy.get('.va-open > .va-pop-content > .va-btn-close').click()

                });

        }

        });


    });


});
