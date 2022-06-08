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

export interface PayloadParameters {
  id: string,
  profile_id: string,
  status: string,
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
