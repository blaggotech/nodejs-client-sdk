import got from 'got';
import {
  AuthenticationResponse,
  AuthURLs,
  AuthURLKey,
  Options,
} from './types';

export function getAuthURL(options?: Options): string {
  if (typeof options === 'undefined' || options === undefined || options === null) {
    return AuthURLs.prod
  }

  if (options.env === "") {
    return AuthURLs.prod;
  }

  const authKey = options.env as AuthURLKey;
  return AuthURLs[authKey];
}

export async function Authenticate(username: string, password: string, options?: Options): Promise<AuthenticationResponse> {
  const url = getAuthURL(options)
  const response = await got.post(url, {
      json: {
        username,
        password
      }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      let authResponse: AuthenticationResponse = JSON.parse(responseString);
      return resolve(authResponse);
    } catch (error) {
      return reject(error);
    }
  })
}
