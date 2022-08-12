import * as fs from "fs";

const express = require('express')
const app = express()
const port = 3000
const TOKEN_SECRET = 'RANDOM_S3CR3T';
const PRIVATE_KEY = fs.readFileSync('../jwt_key_private.pem');
const PUBLIC_KEY = fs.readFileSync('../jwt_key_public.pem');

import { sign, verify } from "jsonwebtoken";

export const encodeToken = (data: string) => {
  const iat = Date.now();
  const payload = {
    exp: iat + 60 * 60 * 24 * 14,
    iat, //issued at
    sub: data
  };
  return sign(payload, PRIVATE_KEY, { algorithm: 'RS256'});
};

const decodeToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/token', (req, res) => {
  const token = encodeToken('some data');
  res.status(200).json({
    status: "success",
    token,
  });
})

app.get('/decode', async (req, res) => {
  if (!(req.headers && req.headers.authorization)) {
    console.error("Please log in");
  }
  // decode the token
  const header = req.headers.authorization.split(" ");
  const token = header[1];
  let payload = null;
  try {
    payload = await decodeToken(token);
  } catch (e) {
    console.error("An error occurred while decoding jwt token.");
  }

  res.status(200).json({
    status: "success",
    payload,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
