import * as chai from 'chai';
import { Environments } from '../blaggo/types';
import { getAuthURL } from '../blaggo/index';
import {
  getAPIURL,
  getPayloadsURL,
  getMessagesURL,
  getSubscribersURL,
} from '../blackbox/index';
import {
  Options,
  PayloadParameters,
  MessageParameters,
  SubscriberParameters,
} from '../blackbox/types';
import 'dotenv/config';

const expect = chai.expect;

describe('Get Blackbox API URL (getAPIURL)', () => {
  it('should return prod environment URL by default' , () => {
    const url = getAPIURL();
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackbox.blaggo.io");
  });

  it('should return test environment URL' , () => {
    const url = getAPIURL({env: Environments.testing} as Options);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxtest.blaggo.io");
  });

  it('should return stage environment URL' , () => {
    const url = getAPIURL({env: Environments.staging} as Options);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxstage.blaggo.io");
  });

  it('should return prod environment URL' , () => {
    const url = getAPIURL({env: Environments.production} as Options);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackbox.blaggo.io");
  });
});

describe('Get Payloads URL (getPayloadsURL)', () => {
  it('should return testing URL with empty query string' , () => {
    const url = getPayloadsURL(
      {} as PayloadParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxtest.blaggo.io/payloads");
  });

  it('should return testing URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as PayloadParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      "https://blackboxtest.blaggo.io/payloads?profile_id=123456",
    );
  });

  it('should return testing URL with id and profile id query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
    } as PayloadParameters

    const url = getPayloadsURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}`,
    );
  });

  it('should return testing URL with query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
      status: 1,
      page: 1,
      per_page: 20,
    } as PayloadParameters

    const url = getPayloadsURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}&status=${params.status}&page=${params.page}&per_page=${params.per_page}`,
    );
  });

  it('should return staging URL with empty query string' , () => {
    const url = getPayloadsURL(
      {} as PayloadParameters,
      {env: Environments.staging} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxstage.blaggo.io/payloads");
  });

  it('should return staging URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as PayloadParameters,
      {env: Environments.staging} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      "https://blackboxstage.blaggo.io/payloads?profile_id=123456",
    );
  });

  it('should return staging URL with id and profile id query string' , () => {
    const apiUrl = "https://blackboxstage.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
    } as PayloadParameters

    const url = getPayloadsURL(
      params,
      {env: Environments.staging} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}`,
    );
  });

  it('should return staging URL with query string' , () => {
    const apiUrl = "https://blackboxstage.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
      status: 1,
      page: 1,
      per_page: 20,
    } as PayloadParameters

    const url = getPayloadsURL(
      params,
      {env: Environments.staging} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}&status=${params.status}&page=${params.page}&per_page=${params.per_page}`,
    );
  });

  it('should return production URL with empty query string' , () => {
    const url = getPayloadsURL({} as PayloadParameters);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackbox.blaggo.io/payloads");
  });

  it('should return production URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as PayloadParameters,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      "https://blackbox.blaggo.io/payloads?profile_id=123456",
    );
  });

  it('should return production URL with id and profile id query string' , () => {
    const apiUrl = "https://blackbox.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
    } as PayloadParameters

    const url = getPayloadsURL(params);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}`,
    );
  });

  it('should return production URL with query string' , () => {
    const apiUrl = "https://blackbox.blaggo.io/payloads";
    const params = {
      id: "12345",
      profile_id: "123456",
      status: 1,
      page: 1,
      per_page: 20,
    } as PayloadParameters

    const url = getPayloadsURL(params);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}&status=${params.status}&page=${params.page}&per_page=${params.per_page}`,
    );
  });
});

describe('Get Messages URL (getMessagesURL)', () => {
  it('should return testing URL with empty query string' , () => {
    const url = getMessagesURL(
      {} as MessageParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxtest.blaggo.io/inbox");
  });

  it('should return testing URL with id query string' , () => {
    const url = getMessagesURL(
      {id: "123456"} as MessageParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      "https://blackboxtest.blaggo.io/inbox?id=123456",
    );
  });

  it('should return testing URL with id and profile id query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/inbox";
    const params = {
      id: "12345",
      sender_id: "123456",
    } as MessageParameters

    const url = getMessagesURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&sender_id=${params.sender_id}`,
    );
  });

  it('should return testing URL with query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/inbox";
    const params = {
      id: "12345",
      sender_id: "123456",
      status: "1",
      page: 1,
      per_page: 20,
    } as MessageParameters

    const url = getMessagesURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&sender_id=${params.sender_id}&status=${params.status}&page=${params.page}&per_page=${params.per_page}`,
    );
  });

  it('should return testing URL with query string with sender & receiver names' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/inbox";
    const params = {
      sender_name: "Rob Steve",
      receiver_name: "Renée Noël",
    } as MessageParameters

    const url = getMessagesURL(
      params,
      {env: Environments.testing} as Options,
    );

    expect(url).to.not.be.empty;

    const senderName = encodeURIComponent(params.sender_name);
    const receiverName = encodeURIComponent(params.receiver_name);
    expect(url).to.be.equal(
      `${apiUrl}?sender_name=${senderName}&receiver_name=${receiverName}`,
    );
  });
});

describe('Get Subscribers URL (getSubscribersURL)', () => {
  it('should return testing URL with empty query string' , () => {
    const url = getSubscribersURL(
      {} as SubscriberParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxtest.blaggo.io/accounts");
  });

  it('should return testing URL with id query string' , () => {
    const url = getSubscribersURL(
      {id: "123456"} as SubscriberParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      "https://blackboxtest.blaggo.io/accounts?id=123456",
    );
  });

  it('should return testing URL with id and profile id query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/accounts";
    const params = {
      id: "12345",
      profile_id: "123456",
    } as SubscriberParameters

    const url = getSubscribersURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}`,
    );
  });

  it('should return testing URL with query string' , () => {
    const apiUrl = "https://blackboxtest.blaggo.io/accounts";
    const params = {
      id: "12345",
      profile_id: "123456",
      customer_code: "ABCDE",
      aggregator_id: "12345",
      status: "1",
      page: 1,
      per_page: 20,
      includes: "count,metadata",
    } as SubscriberParameters

    const url = getSubscribersURL(
      params,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;

    const includes = encodeURIComponent(params.includes)
    expect(url).to.be.equal(
      `${apiUrl}?id=${params.id}&profile_id=${params.profile_id}&customer_code=${params.customer_code}&aggregator_id=${params.aggregator_id}&status=${params.status}&page=${params.page}&per_page=${params.per_page}&includes=${includes}`,
    );
  });
});

describe('Get OAuth2 URL (getAuthURL)', () => {
  it('should return prod environment URL by default' , () => {
    const url = getAuthURL();
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://auth.blaggo.io/oauth2/token/");
  });

  it('should return test environment URL' , () => {
    const url = getAuthURL({env: Environments.testing});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://authtest.blaggo.io/oauth2/token/");
  });

  it('should return stage environment URL' , () => {
    const url = getAuthURL({env: Environments.staging});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://authstage.blaggo.io/oauth2/token/");
  });

  it('should return prod environment URL' , () => {
    const url = getAuthURL({env: Environments.production});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://auth.blaggo.io/oauth2/token/");
  });
});
