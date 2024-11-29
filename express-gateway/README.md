# express-gateway

create express gateway
```
npm install -g express-gateway
eg gateway create
```

make sure to check the
```
server.js
config/gateway.config.yml
```

create https credentials
```
openssl req -nodes -new -x509 -keyout private-key.pem -out certificate.pem
```

create users for oauth2 (make sure the gateway running by run `npm start`), change [username] to your username
```
eg users create
eg credentials create -c [username] -t oauth2
eg credentials create -c [username] -t basic-auth -p "password=[your-password]"
eg apps create -u [username]
```

note that after create the user, we will get the id, that will put in client_id below, and also redirect_uri is same as when create `eg apps create ...`

now hit this url http://localhost:8080/oauth2/authorize?response_type=token&client_id=8db6b462-ef2f-4140-b6e3-9cc28ddbca34&redirect_uri=http://google.com

run the password-less project use ngrok
```
brew install ngrok/ngrok/ngrok
ngrok config add-authtoken YOUR_AUTH_TOKEN
ngrok http 3000
```
