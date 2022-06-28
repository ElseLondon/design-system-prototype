import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Earth.');
});

app.listen(port, () => {
  console.log(`ELSE Design System Prototype signals to http://localhost:${port}`)
});