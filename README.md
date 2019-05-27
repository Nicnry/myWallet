# myWallet
This app is build with ionic 4

## Installation 
1. git clone this repo
2. cd myWallet
3. npm install
4. ionic serve --lab

Enjoy !

## API

Example JSON format :
```json
{
  "accounts": [
    {
      "id": 1,
      "name": "PostFinance",
      "favorite": true,
      "value": 100,
      "transactions": [
        { 
          "id": 1,
          "value": -200
        },
        { 
          "id": 2,
          "value": 300
        }
      ]
    },
    {
      "id": 2,
      "name": "UBS",
      "favorite": false,
      "value": 1100,
      "transactions": [
        { 
          "id": 1,
          "value": -200
        },
        { 
          "id": 2,
          "value": 300
        },
        { 
          "id": 3,
          "value": -4000
        }
      ]
    }
  ]
}
```
