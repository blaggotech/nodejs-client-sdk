import * as chai from 'chai';
import { Environments } from '../blaggo/types';
import { getAuthURL } from '../blaggo/index';
import {
  getAPIURL,
  getPayloadsURL,
  getMessagesURL,
} from '../blackbox/index';
import {
  Options,
  ProtocolPayloadParameters,
  MessageParameters,
} from '../blackbox/types';
import 'dotenv/config';

const expect = chai.expect;

describe('Get Authentication URL (getAuthURL)', () => {
  it('should return prod environment URL by default' , () => {
    const url = getAuthURL();
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://auth.blaggo.io/auth/");
  });

  it('should return test environment URL' , () => {
    const url = getAuthURL({env: Environments.testing});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://authtest.blaggo.io/auth/");
  });

  it('should return stage environment URL' , () => {
    const url = getAuthURL({env: Environments.staging});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://authstage.blaggo.io/auth/");
  });

  it('should return prod environment URL' , () => {
    const url = getAuthURL({env: Environments.production});
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://auth.blaggo.io/auth/");
  });
});

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
      {} as ProtocolPayloadParameters,
      {env: Environments.testing} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxtest.blaggo.io/payloads");
  });

  it('should return testing URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as ProtocolPayloadParameters,
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
    } as ProtocolPayloadParameters

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
    } as ProtocolPayloadParameters

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
      {} as ProtocolPayloadParameters,
      {env: Environments.staging} as Options,
    );
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackboxstage.blaggo.io/payloads");
  });

  it('should return staging URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as ProtocolPayloadParameters,
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
    } as ProtocolPayloadParameters

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
    } as ProtocolPayloadParameters

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
    const url = getPayloadsURL({} as ProtocolPayloadParameters);
    expect(url).to.not.be.empty;
    expect(url).to.be.equal("https://blackbox.blaggo.io/payloads");
  });

  it('should return production URL with profile id query string' , () => {
    const url = getPayloadsURL(
      {profile_id: "123456"} as ProtocolPayloadParameters,
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
    } as ProtocolPayloadParameters

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
    } as ProtocolPayloadParameters

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
});
