// it('read xlsx sheet 2', ()=>{

//     cy.readExcelFile('file.xlsx', 'Sheet4').then((rows) =>{
//         rows.forEach((row)=>{
//             const name = row['Name']
//             const title = row['Title']
//             const company = row['Company']


//             cy.log('Name: ',name,' Title: ', title,' Company: ',company)


//                 expect(name).not.to.equal('Gundeep');

//         })


//     })
// })


describe('LinkedIn Profile Check with Existing Data', () => {
    // Read data from the Excel file containing existing profile details
    beforeEach(() => {
        cy.readExcelFile('file.xlsx', 'Sheet4').as('existingData');
    });

    // Compare the current profile details with the existing details from Excel
  it('Should verify if profile details were modified', () => {
    cy.get('@existingData').then((existingData) => {
      // Comparing static data with existing data stored in excel file
    let i;
    const data = existingData;
    for(i=0 ; i<existingData.length ; i++){
        if((data[i].Name) != ('Gundeep')){
            cy.log('Name for ',data[i].Name, 'has Changed')
        }
        else{
            cy.log('Name for ',data[i].Name, 'has not Changed')
        }
        if(data[i].Title != ('QA') ){
            cy.log('Title of ',data[i].Name,' has changed from ',data[i].Title, ' to NEW TITLE LOCATOR GOES HERE ')
        }
        else{
            cy.log('Title of ',data[i].Name,' has not Changed')
        }
        if((data[i].Company) != ('Rich Media')){
            cy.log('Company of ',data[i].Name,' has changed from ',data[i].Company, 'to COMPANY LOCATOR GOES HERE')
        }
        else{
            cy.log('Company of ',data[i].Name, 'has not Changed')
        }
    }
    });
  });


  it('Should visit the LinkedIn profile page', () => {
    // cy.visit('ca.linkedin.com/company/rich-media');
  });

});