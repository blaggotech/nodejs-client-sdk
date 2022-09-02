import got from 'got';
import {
  AuthenticationResponse,
  OAuth2URLs,
  OAuth2URLKey,
  Options,
  Credentials,
} from './types';

export function getAuthURL(options?: Options): string {
  if (typeof options === 'undefined' || options === undefined || options === null) {
    return OAuth2URLs.prod
  }

  if (options.env === "") {
    return OAuth2URLs.prod
  }

  const authKey = options.env as OAuth2URLKey;
  return OAuth2URLs[authKey];
}

export async function Authenticate(creds: Credentials, options?: Options): Promise<AuthenticationResponse> {
  const url = getAuthURL(options)

  const response = await got.post(url, {
    form: {
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      grant_type: "client_credentials",
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
