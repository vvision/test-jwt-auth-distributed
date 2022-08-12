# test-jwt-auth-distributed

This repository tests the process of verifying a jwt token on another host that the identity server without sharing secret between hosts.
This is done with a RSA key pair.
The private key is only known by the ``main-auth-server``.
The ``app-server`` use the public key to verify the token.

## Key generation

Before all, we need to generate keys:
````
openssl genrsa 2048 -out jwtRSA256-private.pem
````

Then, we extract the public key:
````
openssl rsa -in jwt_key_private.pem -pubout -outform PEM -out jwt_key_public.pem
````

## Execution

Run the ``main-auth-server``:
````
cd main-auth-server
npm run watch
````

Run the ``app-server``:
````
cd app-server
npm run watch
````

In the ``requests`` directory of both server, you will find requests files usable with WebStorm to get a token and then verifying it.

## Resources

* [npm - jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [JWT: Ultimate How-To Guide With Best Practices In JavaScript](https://betterprogramming.pub/jwt-ultimate-how-to-guide-with-best-practices-in-javascript-f7ba4c48dfbd)
* [AWS- Docs: Verifying a JSON web token](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html)
