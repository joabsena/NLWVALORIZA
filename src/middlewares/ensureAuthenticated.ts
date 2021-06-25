import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [_, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '9758732f83d6770c5e980ee270943626'
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
