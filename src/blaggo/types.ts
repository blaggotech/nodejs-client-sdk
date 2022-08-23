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

export interface Options {
  env: string
}

export const Environments = {
  testing: "test",
  staging: "stage",
  production: "prod",
}

export const AuthURLs = {
  test: "https://authtest.blaggo.io/auth/",
  stage: "https://authstage.blaggo.io/auth/",
  prod: "https://auth.blaggo.io/auth/",
}

export type AuthURLKey = keyof typeof AuthURLs;
