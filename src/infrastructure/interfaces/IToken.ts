interface IToken {
  token: string;
  expirationTimeStamp: number;
  type: 'refresh' | 'access';
}

export default IToken;
