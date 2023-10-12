const cheerio = require('cheerio');
export class locators {
    ownerList = '#ownerList'
    tableSelector = '#table-data'
    sortByContact = '#SortByNextContact'
    selectEmail = '.selectEmailTemplate'
    sendEmail = '.sendEmailTemplate'
    generateLink = '.emailBlast.show'
    closePopUp = '.va-open > .va-pop-content > .va-btn-close'
    recipientName;
    subject;
    bcc;
    bodyHtml;
    actualImageSource;

    navigate(url, user, pass) {
        cy.visit(url, {
            auth: {
                username: user,
                password: pass
            },
        });
    }

    getOwner(ownerName) {
        cy.get(this.ownerList).select(ownerName)
        cy.wait(10000)
    }

    getColumn(colIndex, records, campName, script) {

        cy.get(this.tableSelector).as('dataTable');
        for (let i = 0; i < records; i++) {

            cy.get('@dataTable')
                .find(`tr td:nth-child(${colIndex + 1})`)
                .eq(i)
                .invoke('text')
                .then(async (cellData) => {
                    // Perform actions needed
                    // for example logging each cell data below
                    cy.log('Cell Data: ', cellData)

                    cy.get('@dataTable')
                        .find(`tr td:nth-child(${colIndex + 1})`)
                        .eq(i)
                        .click();

                    cy.get(this.selectEmail)
                        .select(campName)
                    cy.wait(8000)

                    cy.get(this.sendEmail)
                        .invoke('attr', 'href')
                        .then(async (hrefValue) => {
                            const url = new URL(hrefValue);
                            const params = new URLSearchParams(url.search);
                            this.recipientName = hrefValue.split('?')[0].substring(7)
                            this.subject = params.get('subject');
                            this.bcc = params.get('bcc');
                            cy.get(this.generateLink).invoke('html').then((htmlblock) => {
                                this.bodyHtml = htmlblock
                                // cy.log(bodyHtml)
                            })
                                .get(this.generateLink).find('img').then(($imgURL) => {
                                    this.actualImageSource = $imgURL.prop('src');
                                    cy.log('Actual source ', this.actualImageSource)
                                    const $ = cheerio.load(this.bodyHtml);
                                    //const imgSrc = $('img').attr('src');
                                    const modifiedImgSrc = this.actualImageSource
                                    $('img').attr('src', modifiedImgSrc);
                                    const updatedHTML = $.html()
                                    // cy.log('updated HTML with complete SRC, ', updatedHTML)
                                    cy.writeFile('cypress/e2e/tempFile.txt', updatedHTML).then(() => {
                                        cy.log('CREATED !!!!!!!!')
                                    })

                                })

                            await cy.exec(`powershell.exe -ExecutionPolicy Bypass -File "${script}" -recipientName "${this.recipientName}" -subject "${this.subject}" -bcc "${this.bcc}"  `, { failOnNonZeroExit: false })
                                .then((result) => {
                                    // cy.log(result.stdout);
                                    // cy.log(result.stderr)
                                })

                        })

                    cy.get(this.closePopUp).click()

                });

        }

    }

}