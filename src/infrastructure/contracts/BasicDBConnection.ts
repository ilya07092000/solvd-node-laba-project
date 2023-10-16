abstract class BasicDBConnection {
  private _connection;

  constructor(conn) {
    this._connection = conn;
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
