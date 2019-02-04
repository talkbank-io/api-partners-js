const sha256 = require('js-sha256').sha256;
const request = require('request');


module.exports = class Client {
  //Append partnerId = '000a0000-a00a-00a0-a000-000000000000', token = 'a0000000a00aa000aa0000a0000a0a0000aaaaa0aa0aa000a0aaaa00a0000a00'
  constructor (partnerId, token) {
    this.partnerId = partnerId;
    this.token = token;
    this.baseUrl = `https://bot.talkbank.io/api/partners/${partnerId}/`;
    this.options = {
      headers: {
        Authorization: `signature="${this.getSignature()}"`
      }
    };
  }

  //create signature
  getSignature (params = null) {
    return sha256(`${this.partnerId}${this.token}${params ? JSON.stringify(params) : ''}`);
  }

  //Get the list of company's cards
  getCards () {
    this.options.method = 'GET';
    this.options.url = `${this.baseUrl}cards`;
    return Client.createRequest(this.options);
  }

  //Get details of the single card. Ean = 2000005399862
  getCardDetails (ean) {
    this.options.method = 'GET';
    this.options.url = `${this.baseUrl}cards/${ean}/details`;
    return Client.createRequest(this.options);
  }

  //Get transactions of the single card from and to date (ISO 8601). Ean = 2000005399862, fromDate/toDate = '2018-01-01'
  getCardTransactions (ean, fromDate, toDate) {
    this.options.method = 'GET';
    const params = {
      fromDate: fromDate,
      toDate: toDate
    };
    this.options.url = `${this.baseUrl}cards/${ean}/transactions?fromDate=${fromDate}&toDate=${toDate}`;
    return Client.createRequest(this.options);
  }

  //Create client or edit client's data before identification. Person = JSON
  addClient (person, edit = false) {
    this.options.method = 'POST';
    this.options.url = `${this.baseUrl}clients/${edit ? person.client_id + '/edit' : '/'}`;
    this.options.headers.Authorization = `signature="${this.getSignature(person)}"`;
    this.options['json'] = person;
    return Client.createRequest(this.options);
  }

  //Get clients status
  getClientStatus(clientId) {
    this.options.method = 'GET';
    this.options.url = `${this.baseUrl}clients/${clientId}`;
    return Client.createRequest(this.options);
  }

  //Add or edit contract
  addContract(clientId, contract) {
    this.options.method = 'POST';
    this.options.url = `${this.baseUrl}clients/${clientId}/contracts`;
    this.options.headers.Authorization = `signature="${this.getSignature(contract)}"`;
    this.options['json'] = contract;
    return Client.createRequest(this.options);

  }

  //Get client's contracts
  getContracts(clientId) {
    this.options.url = `${this.baseUrl}clients/${clientId}/contracts`;
    this.options.method = 'GET';
    return Client.createRequest(this.options);
  }

  static createRequest (options) {
    return request (options, (err, res, body) => {
      if (err) { return err; }
      return body;
    });
  }

};

