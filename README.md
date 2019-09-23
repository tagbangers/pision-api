# Pision API

### Setup

```
$ npm install
```

### Run on local

```
$ node app.js
```

### Client

```
curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"text":"yeyy","user":{"id":"pision"}}'
```

### Set ec2 keypair key on your local

```
$ mv pision-tagbangers.pem ~/.ssh/
$ chmod 600 pision-tagbangers.pem
```

### Deploy environment

```
$ npm run-script deploy
```
