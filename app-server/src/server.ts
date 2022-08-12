import * as fs from "fs";

const express = require('express')
const app = express()
const port = 3030
const PUBLIC_KEY = fs.readFileSync('../jwt_key_public.pem');

import { verify } from "jsonwebtoken";

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
