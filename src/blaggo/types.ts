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