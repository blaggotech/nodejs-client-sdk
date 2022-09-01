export interface AuthenticationResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface Options {
  env: string
}

export const Environments = {
  testing: "test",
  staging: "stage",
  production: "prod",
}

export const OAuth2URLs = {
  test: "https://authtest.blaggo.io/oauth2/token/",
  stage: "https://authstage.blaggo.io/oauth2/token/",
  prod: "https://auth.blaggo.io/oauth2/token/",
}

export type OAuth2URLKey = keyof typeof OAuth2URLs;

export interface Credentials {
  client_id: string
  client_secret: string
  grant_type: string
}
