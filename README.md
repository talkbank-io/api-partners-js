# api-partners-js

To install run `npm install`, then require the Client class

```
const Client = require('./Client');

const partnerId = '000a0000-a00a-00a0-a000-000000000000'
const token = 'a0000000a00aa000aa0000a0000a0a0000aaaaa0aa0aa000a0aaaa00a0000a00'

const client = new Client(partnerId, token);
```

Request are made via callback style

```
  client.getCards()
    .on('data', (data) => {
      return JSON.parse(data);
    });
```

Post parameters are sent in json format

```
  const person =
    {
      "client_id": 1,
      "person": {
        "first_name": "Иван",
        "middle_name": "Иванович",
        "last_name": "Иванов",
        "snils": "123-456-789 01",
        "secret": "толкбанк",
        "gender": "M",
        "phone": "79878776623",
        "inn": 511111111111,
        "birth_date": "1970-01-01",
        "document": {
          "serial": 1100,
          "number": 111928,
          "issuer": "ОВД г. РЯЗАНЬ ОУФМС РОССИИ ПО ВОРОШИЛОВСКОМУ РАЙОНУ",
          "issuer_code": "771-091",
          "issuing_date": "2002-11-16"
        },
        "contracts": [
          {
            "id": 1,
            "barcode": "2000001111111",
            "commission": 234.56,
            "commission_date": "2018-09-01",
            "block_forbidden": true
          },
          {
            "id": 2,
            "barcode": "2000001111112",
            "commission": 534,
            "commission_date": "2018-09-01",
            "block_forbidden": true
          }
        ]
      }
    };
```
