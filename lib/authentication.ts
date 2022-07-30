import prisma from '../lib/db';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  if (securityName === 'api_key') {
    return Promise.reject({});
  } else {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['authorization'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token.replace('Bearer ', ''), 'secret', function(
        err: any,
        decoded: any,
      ) {
        if (err) {
          reject(err);
        } else {
          // check data has id field.
          if (
            typeof decoded.data === 'undefined' ||
            typeof decoded.data.id === 'undefined' ||
            typeof decoded.data.email === 'undefined'
          ) {
            reject(new Error('JWT does not contain user data.'));
          }
          // Check if JWT contains all required scopes
          if (scopes) {
            for (const scope of scopes) {
              if (!decoded.scopes.includes(scope)) {
                reject(new Error('JWT does not contain required scope.'));
              }
            }
          }
          prisma.user
            .findFirst({
              where: {
                id: decoded.data.id,
                email: decoded.data.email,
              },
            })
            .then(user => {
              if (user) {
                resolve({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  sex: user.sex,
                  birth: user.birth,
                });
              }
            })
            .catch(e => {
              reject(new Error('User not available'));
            });
        }
      });
    });
  }
}

export function sign(data) {
  return jwt.sign({ data }, 'secret', { expiresIn: '24h' });
}
