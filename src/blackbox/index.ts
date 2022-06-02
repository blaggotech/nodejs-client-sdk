import got from 'got';
import { InboxResponse, NewPayloadRequest } from "./types";

export async function GetInboxMessages(url: string, blaggoToken: string): Promise<InboxResponse> {
  const response = await got.get(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      let authResponse: InboxResponse = JSON.parse(responseString);
      return resolve(authResponse);
    } catch (error) {
      return reject(error);
    }
  })
}

// DeleteInboxMessages will delete a message inbox from a given:
// id: string
// sender_id: string
// receiver_id: string
// status: string {1-Sent, 2-Received, 3-Read, 4-Replied}
// type: string {
//   1-SubscriptionType,
//   2-TransactionType,
//   3-CreditType,
//   4-BillingType,
//   5-QRType,
//   6-ReferralType,
//   7-BroadcastType
// }.
// url = ${HOST}/inbox?id=${id}
export async function DeleteInboxMessages(url: string, blaggoToken: string): Promise<InboxResponse> {
  const response = await got.delete(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    }
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      let authResponse: InboxResponse = JSON.parse(responseString);
      return resolve(authResponse);
    } catch (error) {
      return reject(error);
    }
  })
}

export async function UpdateInboxMessage(url: string, payload: number, blaggoToken: string): Promise<InboxResponse> {
  const response = await got.patch(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    },
    json: {
      "status": payload
    },
  }).json();

  return new Promise((resolve, reject) => {
    try {
      const responseString = JSON.stringify(response);
      let authResponse: InboxResponse = JSON.parse(responseString);
      return resolve(authResponse);
    } catch (error) {
      return reject(error);
    }
  })
}

export async function AddPayload(url: string, payload: NewPayloadRequest, blaggoToken: string): Promise<string> {
  const response = await got.post(url, {
    headers: {
      Authorization: `Bearer ${blaggoToken}`
    },
    json: {
      "aggregator_id": payload.aggregator_id,
      "alias": payload.alias,
      "customer_code": payload.customer_code,
      "profile_id": payload.profile_id
    },
  }).json();

  return new Promise((resolve, reject) => {
    try {
      return resolve(JSON.stringify(response));
    } catch (error) {
      return reject(error);
    }
  });
}
