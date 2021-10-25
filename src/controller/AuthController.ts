import { Request, Response, NextFunction, request } from 'express';
import { ValidationError } from 'sequelize';
const db = require('../db/models');
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
require('dotenv').config();

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const payload = req.body;

      const result = await db.User.create(payload);

      return res.json(result);
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(400).json({
          error: 1,
          messages: e.errors,
        });
      }
      next(e);
    }
  }

  login(req: Request, res: Response, next: NextFunction): void | Response {
    passport.authenticate('local', async function (err, user) {
      if (err) return next(err);
      if (!user)
        return res.json({ error: 1, result: 'email or password incorrect' });

      let signed = jwt.sign(user.dataValues, process.env.SECRET_KEY as string);

      const { password, createdAt, updatedAt, ...resultMessage } =
        user.dataValues;

      return res.json({
        message: 'logged in successfully',
        user: resultMessage,
        token: signed,
      });
    })(req, res, next);
  }

  async localStrategy(
    email: string,
    password: string,
    done: Function
  ): Promise<void> {
    try {
      const userData = await db.User.findOne({ where: { email: email } });
      if (!userData) return done();
      if (bcrypt.compareSync(password, userData.dataValues.password)) {
        return done(null, userData);
      }
    } catch (err) {
      done(err, null);
    }
    done();
  }
}

export default new AuthController();
