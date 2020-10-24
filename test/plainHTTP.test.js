var request = require("request");
var expect = require("chai").expect;
const urlBuilder = require("../utils/urlBuilder");

describe("Try plain node request", function(){

    it("Verify Successful call to the resource (plain response) ", ()=>{
        
        request.get({url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, "", urlBuilder.defaultSymbols)},
            function(error, response, body){
                expect(response.statusCode).to.equal(200);
                    console.log(response.body);
        })
    });
})