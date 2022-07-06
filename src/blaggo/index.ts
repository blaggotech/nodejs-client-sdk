import got from 'got';
import { AuthenticationResponse } from './types';

export async function Authenticate(url: string, username: string, password: string): Promise<AuthenticationResponse> {
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
