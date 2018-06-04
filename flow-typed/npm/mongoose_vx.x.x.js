declare module 'mongoose' {

  declare type SchemaValue =
    | typeof String
    | typeof Number
    | Schema<*>
    | [SchemaValue]

  declare class Schema<T> {
    constructor({[string]: SchemaValue}): this;
  }

  declare class MongooseModel<T> {
    constructor(): this;

    static create(T, (e: ?Error) => mixed): MongooseModel<T>;
    static remove(): mixed;
    // static find: (MongooseQuery) => Array<MongooseModel<T>>;
    // static findOne: (MongooseQuery) => MongooseModel<T>;
    // static findById: (MongooseQuery) => MongooseModel<T>;
    save((e: ?Error) => mixed): mixed;
  }

  declare type Connection = {

  }

  declare type MongooseError = {}

  declare type ConnectOptions = {
    user: string,
    pass: string,
    autoIndex?: bool,
    bufferCommands?: bool,
    callback: (Error) => mixed,
  }

  declare type SetKey =
    | 'debug'
    | 'bufferCommands'
    | 'useFindAndModify'
    | 'cloneSchemas'

  declare class Mongoose {
    constructor(): this;
    Aggregate();
    CastError(type: string, value: mixed, path: string, error: mixed);
    Collection();
    Connection(): Connection;
    DocumentProvider();
    Error(): MongooseError;
    Model();
    Mongoose();
    Promise();
    Query();
    Schema();
    SchemaType();
    SchemaTypes: {};
    VirtualType();

    connect(uri: string, options?: ConnectOptions): Promise<this>;
    connection: Connection;
    createConnection(uri: string, options?: ConnectOptions): Connection;
    disconnect();
    model<T>(
      name: string | Function,
      schema: Schema<T>,
      collection?: string, skipInit?: bool,
    ): Model<T>;
    modelNames(): Array<string>;
    mongo: mixed; // Intentionally not typing this right now.
    mquery: mixed; // Intentionally not typing this right now.
    plugin(fn: Function, options?: PluginOptions): this;
    pluralize(fn?: Function): Function?;
    set:
      & ('debug', bool)
      & ('bufferCommands', mixed)
      & ('useFindAndModify', bool)
      & ('cloneSchemas', bool)
    version: string;
    prototypeSTATES: mixed; // Intentionally not typing this right now.
  }

  declare export default {
    Schema: typeof Schema,
    createConnection: (string) => MongooseConnection,
    model: <T>(name: string, schema: Schema<T>) => Class<MongooseModel<T>>,
  };
}
