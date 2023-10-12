/// <reference types = "Cypress" />
import { locators } from './pom';
const obj = new locators();
var data1;
var cd;
const columnIndex = 3;

describe('Sending email to top 5 clients', () => {

    beforeEach(() => {
        cy.fixture('input.json').then((data) => {
            data1 = data;
        });

        cy.fixture('cred.json').then((ath) => {
            cd = ath;
        })
    });

    it('Should visit hubspot page', () => {
        obj.navigate('/', cd.user, cd.pass);
        obj.getOwner(data1.ownerName)
        obj.getColumn(columnIndex, data1.numberOfRecords, data1.campaginName, cd.scriptPath)
    });

});