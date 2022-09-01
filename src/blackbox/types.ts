import 'dotenv/config';
import {
  AuthenticationResponse,
  Credentials,
  Options as AuthOptions
} from '../blaggo/types';

export interface Options {
  env: string
  credentials: Credentials
  authenticatorFn: Authenticator
}

export const APIURLs = {
  test: "https://blackboxtest.blaggo.io",
  stage: "https://blackboxstage.blaggo.io",
  prod: "https://blackbox.blaggo.io",
}

export type APIURLKey = keyof typeof APIURLs;

export interface AddPayloadParameters {
  profile_id: string
  aggregator_id: string
  customer_code: string
  last_amount: number
  status: number
  alias: string
  sender_id: string
  receiver_id: string
  subject: string
  body: string
  type: string
}


export interface PayloadParameters {
  id: string;
  status: number,
  profile_id: string,
  page: number,
  per_page: number
}

export interface MessageParameters {
  id: string,
  sender_id: string,
  sender_name: string,
  receiver_id: string,
  receiver_name: string,
  status: string,
  type: string,
  types: string,
  transaction_type: string,
  transaction_last_state_type: string,
  includes: string,
  page: number,
  per_page: number,
}

export interface InboxResponse {
  messages: Message[]
  count: number
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  sender: Sender
  receiver: Receiver
  subject: string
  body: string
  type: number
  types: number[]
  status: number
  created_at: string
  updated_at: string
  metadata: Metadata
  payload_id: string
  credit: Credit
}

export interface Sender {
  id: string
  name: string
}

export interface Receiver {
  id: string
  name: string
}

export interface Metadata {
  scheduled: boolean
}

export interface Credit {
  id: string
  status: string
  debtor_id: string
  comaker_id: string
  merchant_id: string
}

export interface SubscriberParameters {
  id: string
  profile_id: string
  aggregator_id: string
  customer_code: string
  status: string
  page: number
  per_page: number
  includes: string
}

export interface SubscriberResponse {
  accounts: Account[]
}

export interface Account {
  id: string
  profile_id: string
  customer_code: string
  aggregator_id: string
  status: Status
  created_at: string
  updated_at: string
  payload_id: string
  metadata: Metadata
  alias: string
}

export interface Status {
  previous: string
  current: string
}

export interface Metadata {
  aggregator_name: string
  profile_name: string
}

export type Authenticator = (credentials: Credentials, options?: AuthOptions) => Promise<AuthenticationResponse>;
