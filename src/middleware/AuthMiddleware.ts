import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validate = [
  body('username').isEmail(),
  body('password').isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default validate;
