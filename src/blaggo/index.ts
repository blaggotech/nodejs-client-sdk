import got from 'got';

export interface AuthenticationResponse {
  data: Data
}

export interface Data {
  token: string
  tokens: Tokens
  user_id: string
  first_login: boolean
  tfa: boolean
  is_mobile_allowed: boolean
  is_portal_allowed: boolean
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export async function Authenticate(username: string, password: string): Promise<AuthenticationResponse> {
  const url = 'https://auth.blaggo.io/auth/';
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