import express, { Request, Response} from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';
import MathService from './service/mathService';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());


const mathService = new MathService();

const validateMathInput = [
  check('a').isNumeric().notEmpty(),
  check('b').isNumeric().notEmpty(),
];

app.get('/add', validateMathInput, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { a, b } = req.query;
  const result = mathService.add(Number(a), Number(b));
  res.send(result.toString());
});

app.get('/subtract', validateMathInput, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { a, b } = req.query;
  const result = mathService.subtract(Number(a), Number(b));
  res.send(result.toString());
});

app.get('/multiply', validateMathInput, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { a, b } = req.query;
  const result = mathService.multiply(Number(a), Number(b));
  res.send(result.toString());
});

app.get('/divide', validateMathInput, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { a, b } = req.query;
  try {
    const result = mathService.divide(Number(a), Number(b));
    res.send(result.toString());
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

app.listen(port, () => {
  console.log(`Az Express számológép szerver fut a ${port} porton és várja a számaid`);
});
