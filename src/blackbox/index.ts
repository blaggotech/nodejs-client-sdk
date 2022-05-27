import got from 'got';
import { InboxResponse } from "./types";

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
