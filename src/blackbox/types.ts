import 'dotenv/config';

export interface BlaggoCredentials {
  username: string;
  password: string;
}

export interface ProtocolPayloadParameters {
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

export function getPayloadsURL(params: ProtocolPayloadParameters): string {
  const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/payloads`;
  let url = `${baseUrl}?`;

  if (params.id) {
    url = `${url}id=${params.id}`;
  }

  if (params.status) {
    url = `${url}&status=${params.status}`;
  }

  if (params.profile_id) {
    url = `${url}&profile_id=${params.profile_id}`;
  }

  if (params.page) {
    url = `${url}&page=${params.page}`;
  }

  if (params.per_page) {
    url = `${url}&per_page=${params.per_page}`;
  }

  return url
}

export function getMessagesURL(params: MessageParameters): string {
  const baseUrl = `${process.env['BLACKBOX_BASE_URL']}/inbox`;
  let url = `${baseUrl}?`;

  if (params.id) {
    url = `${url}id=${params.id}`;
  }

  if (params.sender_id) {
    url = `${url}&sender_id=${params.sender_id}`;
  }

  if (params.sender_name) {
    url = `${url}&sender_name=${params.sender_name}`;
  }

  if (params.receiver_id) {
    url = `${url}&receiver_id=${params.receiver_id}`;
  }

  if (params.receiver_name) {
    url = `${url}&receiver_name=${params.receiver_name}`;
  }

  if (params.status) {
    url = `${url}&status=${params.status}`;
  }

  if (params.type) {
    url = `${url}&type=${params.type}`;
  }

  if (params.types) {
    url = `${url}&types=${params.types}`;
  }

  if (params.transaction_type) {
    url = `${url}&transaction_type=${params.transaction_type}`;
  }

  if (params.transaction_last_state_type) {
    url = `${url}&transaction_last_state_type=${params.transaction_last_state_type}`;
  }

  if (params.includes) {
    url = `${url}&includes=${params.includes}`;
  }

  if (params.page) {
    url = `${url}&page=${params.page}`;
  }

  if (params.per_page) {
    url = `${url}&per_page=${params.per_page}`;
  }

  return url
}
