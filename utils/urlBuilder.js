class UrlBuilder{

    get baseurl() { return "http://data.fixer.io/api/" };
    get validAccessKey() { return "229d1da7b736ef77d158ea0c224c4344" };
    get malformedAccessKey() { return "229d1da7b736ef77d158ea0c224c4344-XXX" };
    get latestDate() { return "latest" };
    get invalidDate() { return "2030-12-12" };
    get defaultSymbols() { return "USD,EUR,PLN,UAH" };
    get incompleteSymbols() { return "USD,EUR,PLN" };
    get nonDefaultCurrency() { return "USD" };
   
    build(url, date, accesskey, baseCurrency, symbols){
        return url + date+
                "?access_key=" + accesskey +
                "&base=" + baseCurrency +
                "&symbols=" + symbols; 
    }

}
module.exports = new UrlBuilder()