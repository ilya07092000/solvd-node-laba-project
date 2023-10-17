interface IToken {
  token: string;
  expirationTimeStamp: number;
  type: 'refresh' | 'access';
  active: 1 | 0;
}

export default IToken;
