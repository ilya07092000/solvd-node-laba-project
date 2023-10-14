abstract class BasicDBConnection {
  private _connection;

  constructor() {
    this._connection = null;
  }

  public abstract makeConnection(creds: any);

  public get connection() {
    return this._connection;
  }

  protected set connection(newConnection) {
    this._connection = newConnection;
  }
}

export default BasicDBConnection;
