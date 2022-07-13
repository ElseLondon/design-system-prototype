import express, { Request, Response } from 'express';
import fs from 'firebase-admin';
import serviceAccount from './design-system-prototype-5a79b-4fd64a51bb9e.json'

fs.initializeApp({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

const app = express();
const port = 8080;

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get('/', async (req: Request, res: Response) => {
  const styleRef = db.collection('users').doc('6MU0LKOQPpG2k9nAbfBk');
  const doc = await styleRef.get();
  if (!doc.exists) {
    res.send("No document data");
  } else {
    res.send(doc.data());
  }
});

app.listen(port, () => {
  console.log(`ELSE Design System Prototype signals to http://localhost:${port}`)
});