const { exec } = require('child_process')
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/save', (req, res) => {
    const data = req.body;

    const fixturePath = path.join(__dirname, 'cypress', 'fixtures', 'input.json');
    fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2));
    // res.redirect('runTest.html');

});

app.get('/run-tests', (req, res) => {

    const specPath = 'cypress/e2e/hubspotTestScript.cy.js';
    const specCommad = `npx cypress run --spec ${specPath}`

    exec(specCommad, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`)
            return res.status(500).send('Failed to run Cypress Spec');
        }
        if (stderr) {
            console.error(`${stderr}`)
            return;
        }
        console.log(`Cypress Test Output: ${stdout}`);

    })
    // res.redirect('processing.html')
})

app.get('/run-again', (req, res) => {

    const specPath = 'cypress/e2e/spec2.cy.js';
    const specCommad = `npx cypress run --spec ${specPath}`

    exec(specCommad, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`)
            return res.status(500).send('Failed to run Cypress Spec');
        }
        if (stderr) {
            console.error(`${stderr}`)
            return;
        }
        console.log(`Cypress Test Output: ${stdout}`);

    })
    // res.redirect('processing.html')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});