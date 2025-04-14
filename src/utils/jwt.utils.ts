import jwt from 'jsonwebtoken';

export function parseJwt(token: string): jwt.JwtPayload {
  return jwt.decode(token) as jwt.JwtPayload;
}
