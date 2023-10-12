const { exec } = require('child_process');
const express = require('express');

const app = express();

app.get('/run-tests', (req, res) => {
    exec('npx cypress run', (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`)
            return;
        }
        if (stderr) {
            console.error(`${stderr}`)
            return;
        }
        console.log(`Cypress Test Output: ${stdout}`);
        res.send('Tests executed successfully')
    })
})