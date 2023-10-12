// it('read xlsx', ()=>{
//     cy.readExcelFile('file.xlsx', 'Sheet1').then((rows) =>{
//         // cy.log('Pass')
//         var count = 0
//         var total = 40
//         rows.forEach((row)=>{
//             const given = row['given']
//             const expected = row['expected']
//             cy.log('given:',given,'expected: ',expected)
//             if(given != expected){
//                 cy.log('I  N  C  O  R  R  E  C  T')
//                 count += 1
//             }
//             else{
//                 cy.log('C  O  R  R  E  C  T')
//             }
//         })
//         cy.log('total incorrect anwser: ',count)
//         cy.log('total correct answer: ',(total-count))
//     })


// })

var salary = 0
var taxActual = 0
var testData = [];

it('read xlsx sheet 3', ()=>{

    cy.readExcelFile('file.xlsx', 'Sheet3').then((rows) =>{
        rows.forEach((row)=>{
            const input =row['Input']
            const taxExpected = row ['Result']
            testData.push(input)
        })
    })
    cy.log("test")
    for (var i = 0; i<testData.length; i++){
        cy.log("Array data and array length ",testData[i], testData.length)
    }

})

it('read xlsx sheet 2', ()=>{
    cy.readExcelFile('file.xlsx', 'Sheet2').then((rows) =>{
        rows.forEach((row)=>{
            const prov = row['Province']
            const min = row['Min']
            const max = row['Max']
            const percent = row['Percentage']
            for (var i = 0; i<testData.length; i++){
                salary = testData[i]
                if(salary >= min && salary <= max){
                        taxActual = salary * percent
                        cy.log("Actual Tax calculated bsaed on Province and Salary ",min, max, salary, taxActual,prov)

                }
                // else{
                //     cy.log("Didn't fall under min max ",min, max, salary, prov)
                // }
            }

        })
    })

})
