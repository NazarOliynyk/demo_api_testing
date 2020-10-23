
const axios = require('axios');
const { assert } = require("chai");
const urlBuilder = require("../utils/urlBuilder");

describe('Try rest api testing with Axios', function(){

    it('Verify Successful call to the resource', () =>{

            axios.get(urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, "", urlBuilder.defaultSymbols))
            .then((response) => {
                assert.equal(200, response.status);
                assert.equal(true, response.data.success);
                assert.equal('EUR', response.data.base);
                assert.equal(1, response.data.rates.EUR);
                assert.notEqual(0, response.data.rates.USD);
                assert.notEqual(0, response.data.rates.PLN);
                assert.notEqual(0, response.data.rates.UAH);
            
        })
    });

    it('Verify call to the resource with non-default base currency', () =>{
        
            axios.get(urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, urlBuilder.nonDefaultCurrency, urlBuilder.defaultSymbols))
            .then((response) => {
                assert.equal(200, response.status);
                assert.equal(false, response.data.success);
                assert.isNotNull(response.data.error);
                assert.equal(105, response.data.error.code);
                assert.equal("base_currency_access_restricted", response.data.error.type);        
        })
    });

    it('Verify call to the resource with the wrong access key', () =>{
        
            axios.get(urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.malformedAccessKey, "", urlBuilder.defaultSymbols))
            .then((response) => {
                assert.equal(200, response.status);
                assert.equal(false, response.data.success);
                assert.isNotNull(response.data.error);
                assert.equal(101, response.data.error.code);
                assert.equal("invalid_access_key", response.data.error.type);        
        })
    });

    it('Verify call to the resource with invalid date', () =>{
        
            axios.get(urlBuilder.build(urlBuilder.baseurl, urlBuilder.invalidDate, urlBuilder.validAccessKey, "", urlBuilder.defaultSymbols))
            .then((response) => {
                assert.equal(200, response.status);
                assert.equal(false, response.data.success);
                assert.isNotNull(response.data.error);
                assert.equal(302, response.data.error.code);
                assert.equal("invalid_date", response.data.error.type);        
        })
    });

    it('Verify call to the resource with the incomplete set of symbols (missing UAH)', () =>{
        
            axios.get(urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, "", urlBuilder.incompleteSymbols))
            .then((response) => {
                assert.equal(200, response.status);
                assert.equal(true, response.data.success);
                assert.equal('EUR', response.data.base);
                assert.equal(1, response.data.rates.EUR);
                assert.notEqual(0, response.data.rates.USD);
                assert.notEqual(0, response.data.rates.PLN);
                assert.equal(undefined, response.data.rates.UAH);        
        })
    });

})
// npm run test -- --spec ./test/mainAxios.test.js
// mocha --reporter mochawesome