
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model account
 * 
 */
export type account = $Result.DefaultSelection<Prisma.$accountPayload>
/**
 * Model session
 * 
 */
export type session = $Result.DefaultSelection<Prisma.$sessionPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model verification
 * 
 */
export type verification = $Result.DefaultSelection<Prisma.$verificationPayload>
/**
 * Model invitation
 * 
 */
export type invitation = $Result.DefaultSelection<Prisma.$invitationPayload>
/**
 * Model member
 * 
 */
export type member = $Result.DefaultSelection<Prisma.$memberPayload>
/**
 * Model oauthAccessToken
 * 
 */
export type oauthAccessToken = $Result.DefaultSelection<Prisma.$oauthAccessTokenPayload>
/**
 * Model oauthApplication
 * 
 */
export type oauthApplication = $Result.DefaultSelection<Prisma.$oauthApplicationPayload>
/**
 * Model oauthConsent
 * 
 */
export type oauthConsent = $Result.DefaultSelection<Prisma.$oauthConsentPayload>
/**
 * Model organization
 * 
 */
export type organization = $Result.DefaultSelection<Prisma.$organizationPayload>
/**
 * Model passkey
 * 
 */
export type passkey = $Result.DefaultSelection<Prisma.$passkeyPayload>
/**
 * Model twoFactor
 * 
 */
export type twoFactor = $Result.DefaultSelection<Prisma.$twoFactorPayload>
/**
 * Model deviceCode
 * 
 */
export type deviceCode = $Result.DefaultSelection<Prisma.$deviceCodePayload>
/**
 * Model jwks
 * 
 */
export type jwks = $Result.DefaultSelection<Prisma.$jwksPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.accountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.sessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.verificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.invitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.memberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauthAccessToken`: Exposes CRUD operations for the **oauthAccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OauthAccessTokens
    * const oauthAccessTokens = await prisma.oauthAccessToken.findMany()
    * ```
    */
  get oauthAccessToken(): Prisma.oauthAccessTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauthApplication`: Exposes CRUD operations for the **oauthApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OauthApplications
    * const oauthApplications = await prisma.oauthApplication.findMany()
    * ```
    */
  get oauthApplication(): Prisma.oauthApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauthConsent`: Exposes CRUD operations for the **oauthConsent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OauthConsents
    * const oauthConsents = await prisma.oauthConsent.findMany()
    * ```
    */
  get oauthConsent(): Prisma.oauthConsentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.organizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passkey`: Exposes CRUD operations for the **passkey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passkeys
    * const passkeys = await prisma.passkey.findMany()
    * ```
    */
  get passkey(): Prisma.passkeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.twoFactor`: Exposes CRUD operations for the **twoFactor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwoFactors
    * const twoFactors = await prisma.twoFactor.findMany()
    * ```
    */
  get twoFactor(): Prisma.twoFactorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deviceCode`: Exposes CRUD operations for the **deviceCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceCodes
    * const deviceCodes = await prisma.deviceCode.findMany()
    * ```
    */
  get deviceCode(): Prisma.deviceCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jwks`: Exposes CRUD operations for the **jwks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jwks
    * const jwks = await prisma.jwks.findMany()
    * ```
    */
  get jwks(): Prisma.jwksDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    account: 'account',
    session: 'session',
    user: 'user',
    verification: 'verification',
    invitation: 'invitation',
    member: 'member',
    oauthAccessToken: 'oauthAccessToken',
    oauthApplication: 'oauthApplication',
    oauthConsent: 'oauthConsent',
    organization: 'organization',
    passkey: 'passkey',
    twoFactor: 'twoFactor',
    deviceCode: 'deviceCode',
    jwks: 'jwks'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "session" | "user" | "verification" | "invitation" | "member" | "oauthAccessToken" | "oauthApplication" | "oauthConsent" | "organization" | "passkey" | "twoFactor" | "deviceCode" | "jwks"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      account: {
        payload: Prisma.$accountPayload<ExtArgs>
        fields: Prisma.accountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.accountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.accountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findFirst: {
            args: Prisma.accountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.accountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findMany: {
            args: Prisma.accountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          create: {
            args: Prisma.accountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          createMany: {
            args: Prisma.accountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.accountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          delete: {
            args: Prisma.accountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          update: {
            args: Prisma.accountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          deleteMany: {
            args: Prisma.accountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.accountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.accountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          upsert: {
            args: Prisma.accountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.accountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.accountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      session: {
        payload: Prisma.$sessionPayload<ExtArgs>
        fields: Prisma.sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findFirst: {
            args: Prisma.sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findMany: {
            args: Prisma.sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          create: {
            args: Prisma.sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          createMany: {
            args: Prisma.sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          delete: {
            args: Prisma.sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          update: {
            args: Prisma.sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          deleteMany: {
            args: Prisma.sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          upsert: {
            args: Prisma.sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      verification: {
        payload: Prisma.$verificationPayload<ExtArgs>
        fields: Prisma.verificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.verificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.verificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findFirst: {
            args: Prisma.verificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.verificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findMany: {
            args: Prisma.verificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          create: {
            args: Prisma.verificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          createMany: {
            args: Prisma.verificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.verificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          delete: {
            args: Prisma.verificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          update: {
            args: Prisma.verificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          deleteMany: {
            args: Prisma.verificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.verificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.verificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          upsert: {
            args: Prisma.verificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.verificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.verificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      invitation: {
        payload: Prisma.$invitationPayload<ExtArgs>
        fields: Prisma.invitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.invitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.invitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          findFirst: {
            args: Prisma.invitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.invitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          findMany: {
            args: Prisma.invitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>[]
          }
          create: {
            args: Prisma.invitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          createMany: {
            args: Prisma.invitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.invitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>[]
          }
          delete: {
            args: Prisma.invitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          update: {
            args: Prisma.invitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          deleteMany: {
            args: Prisma.invitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.invitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.invitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>[]
          }
          upsert: {
            args: Prisma.invitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$invitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.invitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.invitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      member: {
        payload: Prisma.$memberPayload<ExtArgs>
        fields: Prisma.memberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.memberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.memberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          findFirst: {
            args: Prisma.memberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.memberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          findMany: {
            args: Prisma.memberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>[]
          }
          create: {
            args: Prisma.memberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          createMany: {
            args: Prisma.memberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.memberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>[]
          }
          delete: {
            args: Prisma.memberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          update: {
            args: Prisma.memberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          deleteMany: {
            args: Prisma.memberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.memberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.memberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>[]
          }
          upsert: {
            args: Prisma.memberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$memberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.memberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.memberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      oauthAccessToken: {
        payload: Prisma.$oauthAccessTokenPayload<ExtArgs>
        fields: Prisma.oauthAccessTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.oauthAccessTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.oauthAccessTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          findFirst: {
            args: Prisma.oauthAccessTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.oauthAccessTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          findMany: {
            args: Prisma.oauthAccessTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>[]
          }
          create: {
            args: Prisma.oauthAccessTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          createMany: {
            args: Prisma.oauthAccessTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.oauthAccessTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>[]
          }
          delete: {
            args: Prisma.oauthAccessTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          update: {
            args: Prisma.oauthAccessTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          deleteMany: {
            args: Prisma.oauthAccessTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.oauthAccessTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.oauthAccessTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>[]
          }
          upsert: {
            args: Prisma.oauthAccessTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthAccessTokenPayload>
          }
          aggregate: {
            args: Prisma.OauthAccessTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauthAccessToken>
          }
          groupBy: {
            args: Prisma.oauthAccessTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OauthAccessTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.oauthAccessTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OauthAccessTokenCountAggregateOutputType> | number
          }
        }
      }
      oauthApplication: {
        payload: Prisma.$oauthApplicationPayload<ExtArgs>
        fields: Prisma.oauthApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.oauthApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.oauthApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          findFirst: {
            args: Prisma.oauthApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.oauthApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          findMany: {
            args: Prisma.oauthApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>[]
          }
          create: {
            args: Prisma.oauthApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          createMany: {
            args: Prisma.oauthApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.oauthApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>[]
          }
          delete: {
            args: Prisma.oauthApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          update: {
            args: Prisma.oauthApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          deleteMany: {
            args: Prisma.oauthApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.oauthApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.oauthApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>[]
          }
          upsert: {
            args: Prisma.oauthApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthApplicationPayload>
          }
          aggregate: {
            args: Prisma.OauthApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauthApplication>
          }
          groupBy: {
            args: Prisma.oauthApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OauthApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.oauthApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<OauthApplicationCountAggregateOutputType> | number
          }
        }
      }
      oauthConsent: {
        payload: Prisma.$oauthConsentPayload<ExtArgs>
        fields: Prisma.oauthConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.oauthConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.oauthConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          findFirst: {
            args: Prisma.oauthConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.oauthConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          findMany: {
            args: Prisma.oauthConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>[]
          }
          create: {
            args: Prisma.oauthConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          createMany: {
            args: Prisma.oauthConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.oauthConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>[]
          }
          delete: {
            args: Prisma.oauthConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          update: {
            args: Prisma.oauthConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          deleteMany: {
            args: Prisma.oauthConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.oauthConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.oauthConsentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>[]
          }
          upsert: {
            args: Prisma.oauthConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauthConsentPayload>
          }
          aggregate: {
            args: Prisma.OauthConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauthConsent>
          }
          groupBy: {
            args: Prisma.oauthConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<OauthConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.oauthConsentCountArgs<ExtArgs>
            result: $Utils.Optional<OauthConsentCountAggregateOutputType> | number
          }
        }
      }
      organization: {
        payload: Prisma.$organizationPayload<ExtArgs>
        fields: Prisma.organizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.organizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.organizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          findFirst: {
            args: Prisma.organizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.organizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          findMany: {
            args: Prisma.organizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>[]
          }
          create: {
            args: Prisma.organizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          createMany: {
            args: Prisma.organizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.organizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>[]
          }
          delete: {
            args: Prisma.organizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          update: {
            args: Prisma.organizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          deleteMany: {
            args: Prisma.organizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.organizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.organizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>[]
          }
          upsert: {
            args: Prisma.organizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.organizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.organizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      passkey: {
        payload: Prisma.$passkeyPayload<ExtArgs>
        fields: Prisma.passkeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.passkeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.passkeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          findFirst: {
            args: Prisma.passkeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.passkeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          findMany: {
            args: Prisma.passkeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>[]
          }
          create: {
            args: Prisma.passkeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          createMany: {
            args: Prisma.passkeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.passkeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>[]
          }
          delete: {
            args: Prisma.passkeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          update: {
            args: Prisma.passkeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          deleteMany: {
            args: Prisma.passkeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.passkeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.passkeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>[]
          }
          upsert: {
            args: Prisma.passkeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$passkeyPayload>
          }
          aggregate: {
            args: Prisma.PasskeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasskey>
          }
          groupBy: {
            args: Prisma.passkeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasskeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.passkeyCountArgs<ExtArgs>
            result: $Utils.Optional<PasskeyCountAggregateOutputType> | number
          }
        }
      }
      twoFactor: {
        payload: Prisma.$twoFactorPayload<ExtArgs>
        fields: Prisma.twoFactorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.twoFactorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.twoFactorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          findFirst: {
            args: Prisma.twoFactorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.twoFactorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          findMany: {
            args: Prisma.twoFactorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>[]
          }
          create: {
            args: Prisma.twoFactorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          createMany: {
            args: Prisma.twoFactorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.twoFactorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>[]
          }
          delete: {
            args: Prisma.twoFactorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          update: {
            args: Prisma.twoFactorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          deleteMany: {
            args: Prisma.twoFactorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.twoFactorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.twoFactorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>[]
          }
          upsert: {
            args: Prisma.twoFactorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$twoFactorPayload>
          }
          aggregate: {
            args: Prisma.TwoFactorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwoFactor>
          }
          groupBy: {
            args: Prisma.twoFactorGroupByArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorGroupByOutputType>[]
          }
          count: {
            args: Prisma.twoFactorCountArgs<ExtArgs>
            result: $Utils.Optional<TwoFactorCountAggregateOutputType> | number
          }
        }
      }
      deviceCode: {
        payload: Prisma.$deviceCodePayload<ExtArgs>
        fields: Prisma.deviceCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.deviceCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.deviceCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          findFirst: {
            args: Prisma.deviceCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.deviceCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          findMany: {
            args: Prisma.deviceCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>[]
          }
          create: {
            args: Prisma.deviceCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          createMany: {
            args: Prisma.deviceCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.deviceCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>[]
          }
          delete: {
            args: Prisma.deviceCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          update: {
            args: Prisma.deviceCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          deleteMany: {
            args: Prisma.deviceCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.deviceCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.deviceCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>[]
          }
          upsert: {
            args: Prisma.deviceCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$deviceCodePayload>
          }
          aggregate: {
            args: Prisma.DeviceCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeviceCode>
          }
          groupBy: {
            args: Prisma.deviceCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.deviceCodeCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCodeCountAggregateOutputType> | number
          }
        }
      }
      jwks: {
        payload: Prisma.$jwksPayload<ExtArgs>
        fields: Prisma.jwksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.jwksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.jwksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          findFirst: {
            args: Prisma.jwksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.jwksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          findMany: {
            args: Prisma.jwksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>[]
          }
          create: {
            args: Prisma.jwksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          createMany: {
            args: Prisma.jwksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.jwksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>[]
          }
          delete: {
            args: Prisma.jwksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          update: {
            args: Prisma.jwksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          deleteMany: {
            args: Prisma.jwksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.jwksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.jwksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>[]
          }
          upsert: {
            args: Prisma.jwksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jwksPayload>
          }
          aggregate: {
            args: Prisma.JwksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJwks>
          }
          groupBy: {
            args: Prisma.jwksGroupByArgs<ExtArgs>
            result: $Utils.Optional<JwksGroupByOutputType>[]
          }
          count: {
            args: Prisma.jwksCountArgs<ExtArgs>
            result: $Utils.Optional<JwksCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    account?: accountOmit
    session?: sessionOmit
    user?: userOmit
    verification?: verificationOmit
    invitation?: invitationOmit
    member?: memberOmit
    oauthAccessToken?: oauthAccessTokenOmit
    oauthApplication?: oauthApplicationOmit
    oauthConsent?: oauthConsentOmit
    organization?: organizationOmit
    passkey?: passkeyOmit
    twoFactor?: twoFactorOmit
    deviceCode?: deviceCodeOmit
    jwks?: jwksOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    account: number
    invitation: number
    member: number
    oauthAccessToken: number
    oauthApplication: number
    oauthConsent: number
    passkey: number
    session: number
    twoFactor: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | UserCountOutputTypeCountAccountArgs
    invitation?: boolean | UserCountOutputTypeCountInvitationArgs
    member?: boolean | UserCountOutputTypeCountMemberArgs
    oauthAccessToken?: boolean | UserCountOutputTypeCountOauthAccessTokenArgs
    oauthApplication?: boolean | UserCountOutputTypeCountOauthApplicationArgs
    oauthConsent?: boolean | UserCountOutputTypeCountOauthConsentArgs
    passkey?: boolean | UserCountOutputTypeCountPasskeyArgs
    session?: boolean | UserCountOutputTypeCountSessionArgs
    twoFactor?: boolean | UserCountOutputTypeCountTwoFactorArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: invitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: memberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthAccessTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthApplicationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthConsentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthConsentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasskeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: passkeyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTwoFactorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twoFactorWhereInput
  }


  /**
   * Count Type OauthApplicationCountOutputType
   */

  export type OauthApplicationCountOutputType = {
    oauthAccessToken: number
    oauthConsent: number
  }

  export type OauthApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthAccessToken?: boolean | OauthApplicationCountOutputTypeCountOauthAccessTokenArgs
    oauthConsent?: boolean | OauthApplicationCountOutputTypeCountOauthConsentArgs
  }

  // Custom InputTypes
  /**
   * OauthApplicationCountOutputType without action
   */
  export type OauthApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OauthApplicationCountOutputType
     */
    select?: OauthApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OauthApplicationCountOutputType without action
   */
  export type OauthApplicationCountOutputTypeCountOauthAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthAccessTokenWhereInput
  }

  /**
   * OauthApplicationCountOutputType without action
   */
  export type OauthApplicationCountOutputTypeCountOauthConsentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthConsentWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    invitation: number
    member: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitation?: boolean | OrganizationCountOutputTypeCountInvitationArgs
    member?: boolean | OrganizationCountOutputTypeCountMemberArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountInvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: invitationWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: memberWhereInput
  }


  /**
   * Models
   */

  /**
   * Model account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which account to aggregate.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type accountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountWhereInput
    orderBy?: accountOrderByWithAggregationInput | accountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: accountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends accountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type accountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type accountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type accountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type accountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type accountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $accountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "account"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type accountGetPayload<S extends boolean | null | undefined | accountDefaultArgs> = $Result.GetResult<Prisma.$accountPayload, S>

  type accountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<accountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface accountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['account'], meta: { name: 'account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {accountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends accountFindUniqueArgs>(args: SelectSubset<T, accountFindUniqueArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {accountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends accountFindUniqueOrThrowArgs>(args: SelectSubset<T, accountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends accountFindFirstArgs>(args?: SelectSubset<T, accountFindFirstArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends accountFindFirstOrThrowArgs>(args?: SelectSubset<T, accountFindFirstOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends accountFindManyArgs>(args?: SelectSubset<T, accountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {accountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends accountCreateArgs>(args: SelectSubset<T, accountCreateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {accountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends accountCreateManyArgs>(args?: SelectSubset<T, accountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {accountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends accountCreateManyAndReturnArgs>(args?: SelectSubset<T, accountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {accountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends accountDeleteArgs>(args: SelectSubset<T, accountDeleteArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {accountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends accountUpdateArgs>(args: SelectSubset<T, accountUpdateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {accountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends accountDeleteManyArgs>(args?: SelectSubset<T, accountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends accountUpdateManyArgs>(args: SelectSubset<T, accountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {accountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends accountUpdateManyAndReturnArgs>(args: SelectSubset<T, accountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {accountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends accountUpsertArgs>(args: SelectSubset<T, accountUpsertArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends accountCountArgs>(
      args?: Subset<T, accountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends accountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: accountGroupByArgs['orderBy'] }
        : { orderBy?: accountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, accountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the account model
   */
  readonly fields: accountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__accountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the account model
   */
  interface accountFieldRefs {
    readonly id: FieldRef<"account", 'String'>
    readonly accountId: FieldRef<"account", 'String'>
    readonly providerId: FieldRef<"account", 'String'>
    readonly userId: FieldRef<"account", 'String'>
    readonly accessToken: FieldRef<"account", 'String'>
    readonly refreshToken: FieldRef<"account", 'String'>
    readonly idToken: FieldRef<"account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly scope: FieldRef<"account", 'String'>
    readonly password: FieldRef<"account", 'String'>
    readonly createdAt: FieldRef<"account", 'DateTime'>
    readonly updatedAt: FieldRef<"account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * account findUnique
   */
  export type accountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findUniqueOrThrow
   */
  export type accountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findFirst
   */
  export type accountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findFirstOrThrow
   */
  export type accountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findMany
   */
  export type accountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account create
   */
  export type accountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The data needed to create a account.
     */
    data: XOR<accountCreateInput, accountUncheckedCreateInput>
  }

  /**
   * account createMany
   */
  export type accountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many accounts.
     */
    data: accountCreateManyInput | accountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * account createManyAndReturn
   */
  export type accountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data used to create many accounts.
     */
    data: accountCreateManyInput | accountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * account update
   */
  export type accountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The data needed to update a account.
     */
    data: XOR<accountUpdateInput, accountUncheckedUpdateInput>
    /**
     * Choose, which account to update.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account updateMany
   */
  export type accountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update accounts.
     */
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
  }

  /**
   * account updateManyAndReturn
   */
  export type accountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data used to update accounts.
     */
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * account upsert
   */
  export type accountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The filter to search for the account to update in case it exists.
     */
    where: accountWhereUniqueInput
    /**
     * In case the account found by the `where` argument doesn't exist, create a new account with this data.
     */
    create: XOR<accountCreateInput, accountUncheckedCreateInput>
    /**
     * In case the account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<accountUpdateInput, accountUncheckedUpdateInput>
  }

  /**
   * account delete
   */
  export type accountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter which account to delete.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account deleteMany
   */
  export type accountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which accounts to delete
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to delete.
     */
    limit?: number
  }

  /**
   * account without action
   */
  export type accountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
  }


  /**
   * Model session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    activeOrganizationId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    activeOrganizationId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    activeOrganizationId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    activeOrganizationId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    activeOrganizationId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    activeOrganizationId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session to aggregate.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithAggregationInput | sessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    activeOrganizationId: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    activeOrganizationId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    activeOrganizationId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    activeOrganizationId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    activeOrganizationId?: boolean
  }

  export type sessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "activeOrganizationId", ExtArgs["result"]["session"]>
  export type sessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type sessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type sessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "session"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
      activeOrganizationId: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type sessionGetPayload<S extends boolean | null | undefined | sessionDefaultArgs> = $Result.GetResult<Prisma.$sessionPayload, S>

  type sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['session'], meta: { name: 'session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {sessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessionFindUniqueArgs>(args: SelectSubset<T, sessionFindUniqueArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessionFindFirstArgs>(args?: SelectSubset<T, sessionFindFirstArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessionFindManyArgs>(args?: SelectSubset<T, sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {sessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends sessionCreateArgs>(args: SelectSubset<T, sessionCreateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {sessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessionCreateManyArgs>(args?: SelectSubset<T, sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {sessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sessionCreateManyAndReturnArgs>(args?: SelectSubset<T, sessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {sessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends sessionDeleteArgs>(args: SelectSubset<T, sessionDeleteArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {sessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessionUpdateArgs>(args: SelectSubset<T, sessionUpdateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {sessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessionDeleteManyArgs>(args?: SelectSubset<T, sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessionUpdateManyArgs>(args: SelectSubset<T, sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {sessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sessionUpdateManyAndReturnArgs>(args: SelectSubset<T, sessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {sessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends sessionUpsertArgs>(args: SelectSubset<T, sessionUpsertArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionCountArgs>(
      args?: Subset<T, sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessionGroupByArgs['orderBy'] }
        : { orderBy?: sessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the session model
   */
  readonly fields: sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the session model
   */
  interface sessionFieldRefs {
    readonly id: FieldRef<"session", 'String'>
    readonly expiresAt: FieldRef<"session", 'DateTime'>
    readonly token: FieldRef<"session", 'String'>
    readonly createdAt: FieldRef<"session", 'DateTime'>
    readonly updatedAt: FieldRef<"session", 'DateTime'>
    readonly ipAddress: FieldRef<"session", 'String'>
    readonly userAgent: FieldRef<"session", 'String'>
    readonly userId: FieldRef<"session", 'String'>
    readonly activeOrganizationId: FieldRef<"session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * session findUnique
   */
  export type sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findUniqueOrThrow
   */
  export type sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findFirst
   */
  export type sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findFirstOrThrow
   */
  export type sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findMany
   */
  export type sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session create
   */
  export type sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to create a session.
     */
    data: XOR<sessionCreateInput, sessionUncheckedCreateInput>
  }

  /**
   * session createMany
   */
  export type sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * session createManyAndReturn
   */
  export type sessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * session update
   */
  export type sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to update a session.
     */
    data: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
    /**
     * Choose, which session to update.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session updateMany
   */
  export type sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
  }

  /**
   * session updateManyAndReturn
   */
  export type sessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * session upsert
   */
  export type sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The filter to search for the session to update in case it exists.
     */
    where: sessionWhereUniqueInput
    /**
     * In case the session found by the `where` argument doesn't exist, create a new session with this data.
     */
    create: XOR<sessionCreateInput, sessionUncheckedCreateInput>
    /**
     * In case the session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
  }

  /**
   * session delete
   */
  export type sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter which session to delete.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session deleteMany
   */
  export type sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to delete
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to delete.
     */
    limit?: number
  }

  /**
   * session without action
   */
  export type sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    twoFactorEnabled: boolean | null
    displayName: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    twoFactorEnabled: boolean | null
    displayName: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    twoFactorEnabled: number
    displayName: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    twoFactorEnabled?: true
    displayName?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    twoFactorEnabled?: true
    displayName?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    twoFactorEnabled?: true
    displayName?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    twoFactorEnabled: boolean | null
    displayName: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    twoFactorEnabled?: boolean
    displayName?: boolean
    account?: boolean | user$accountArgs<ExtArgs>
    invitation?: boolean | user$invitationArgs<ExtArgs>
    member?: boolean | user$memberArgs<ExtArgs>
    oauthAccessToken?: boolean | user$oauthAccessTokenArgs<ExtArgs>
    oauthApplication?: boolean | user$oauthApplicationArgs<ExtArgs>
    oauthConsent?: boolean | user$oauthConsentArgs<ExtArgs>
    passkey?: boolean | user$passkeyArgs<ExtArgs>
    session?: boolean | user$sessionArgs<ExtArgs>
    twoFactor?: boolean | user$twoFactorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    twoFactorEnabled?: boolean
    displayName?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    twoFactorEnabled?: boolean
    displayName?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    twoFactorEnabled?: boolean
    displayName?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "twoFactorEnabled" | "displayName", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | user$accountArgs<ExtArgs>
    invitation?: boolean | user$invitationArgs<ExtArgs>
    member?: boolean | user$memberArgs<ExtArgs>
    oauthAccessToken?: boolean | user$oauthAccessTokenArgs<ExtArgs>
    oauthApplication?: boolean | user$oauthApplicationArgs<ExtArgs>
    oauthConsent?: boolean | user$oauthConsentArgs<ExtArgs>
    passkey?: boolean | user$passkeyArgs<ExtArgs>
    session?: boolean | user$sessionArgs<ExtArgs>
    twoFactor?: boolean | user$twoFactorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      account: Prisma.$accountPayload<ExtArgs>[]
      invitation: Prisma.$invitationPayload<ExtArgs>[]
      member: Prisma.$memberPayload<ExtArgs>[]
      oauthAccessToken: Prisma.$oauthAccessTokenPayload<ExtArgs>[]
      oauthApplication: Prisma.$oauthApplicationPayload<ExtArgs>[]
      oauthConsent: Prisma.$oauthConsentPayload<ExtArgs>[]
      passkey: Prisma.$passkeyPayload<ExtArgs>[]
      session: Prisma.$sessionPayload<ExtArgs>[]
      twoFactor: Prisma.$twoFactorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      twoFactorEnabled: boolean | null
      displayName: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends user$accountArgs<ExtArgs> = {}>(args?: Subset<T, user$accountArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitation<T extends user$invitationArgs<ExtArgs> = {}>(args?: Subset<T, user$invitationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    member<T extends user$memberArgs<ExtArgs> = {}>(args?: Subset<T, user$memberArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthAccessToken<T extends user$oauthAccessTokenArgs<ExtArgs> = {}>(args?: Subset<T, user$oauthAccessTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthApplication<T extends user$oauthApplicationArgs<ExtArgs> = {}>(args?: Subset<T, user$oauthApplicationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthConsent<T extends user$oauthConsentArgs<ExtArgs> = {}>(args?: Subset<T, user$oauthConsentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passkey<T extends user$passkeyArgs<ExtArgs> = {}>(args?: Subset<T, user$passkeyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    session<T extends user$sessionArgs<ExtArgs> = {}>(args?: Subset<T, user$sessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    twoFactor<T extends user$twoFactorArgs<ExtArgs> = {}>(args?: Subset<T, user$twoFactorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly emailVerified: FieldRef<"user", 'Boolean'>
    readonly image: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
    readonly twoFactorEnabled: FieldRef<"user", 'Boolean'>
    readonly displayName: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.account
   */
  export type user$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    where?: accountWhereInput
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    cursor?: accountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * user.invitation
   */
  export type user$invitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    where?: invitationWhereInput
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    cursor?: invitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * user.member
   */
  export type user$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    where?: memberWhereInput
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    cursor?: memberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * user.oauthAccessToken
   */
  export type user$oauthAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    where?: oauthAccessTokenWhereInput
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    cursor?: oauthAccessTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OauthAccessTokenScalarFieldEnum | OauthAccessTokenScalarFieldEnum[]
  }

  /**
   * user.oauthApplication
   */
  export type user$oauthApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    where?: oauthApplicationWhereInput
    orderBy?: oauthApplicationOrderByWithRelationInput | oauthApplicationOrderByWithRelationInput[]
    cursor?: oauthApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OauthApplicationScalarFieldEnum | OauthApplicationScalarFieldEnum[]
  }

  /**
   * user.oauthConsent
   */
  export type user$oauthConsentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    where?: oauthConsentWhereInput
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    cursor?: oauthConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OauthConsentScalarFieldEnum | OauthConsentScalarFieldEnum[]
  }

  /**
   * user.passkey
   */
  export type user$passkeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    where?: passkeyWhereInput
    orderBy?: passkeyOrderByWithRelationInput | passkeyOrderByWithRelationInput[]
    cursor?: passkeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * user.session
   */
  export type user$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    cursor?: sessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * user.twoFactor
   */
  export type user$twoFactorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    where?: twoFactorWhereInput
    orderBy?: twoFactorOrderByWithRelationInput | twoFactorOrderByWithRelationInput[]
    cursor?: twoFactorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TwoFactorScalarFieldEnum | TwoFactorScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification to aggregate.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type verificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: verificationWhereInput
    orderBy?: verificationOrderByWithAggregationInput | verificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: verificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends verificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type verificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type verificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $verificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type verificationGetPayload<S extends boolean | null | undefined | verificationDefaultArgs> = $Result.GetResult<Prisma.$verificationPayload, S>

  type verificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<verificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface verificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['verification'], meta: { name: 'verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {verificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends verificationFindUniqueArgs>(args: SelectSubset<T, verificationFindUniqueArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {verificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends verificationFindUniqueOrThrowArgs>(args: SelectSubset<T, verificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends verificationFindFirstArgs>(args?: SelectSubset<T, verificationFindFirstArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends verificationFindFirstOrThrowArgs>(args?: SelectSubset<T, verificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends verificationFindManyArgs>(args?: SelectSubset<T, verificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {verificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends verificationCreateArgs>(args: SelectSubset<T, verificationCreateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {verificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends verificationCreateManyArgs>(args?: SelectSubset<T, verificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {verificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends verificationCreateManyAndReturnArgs>(args?: SelectSubset<T, verificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {verificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends verificationDeleteArgs>(args: SelectSubset<T, verificationDeleteArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {verificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends verificationUpdateArgs>(args: SelectSubset<T, verificationUpdateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {verificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends verificationDeleteManyArgs>(args?: SelectSubset<T, verificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends verificationUpdateManyArgs>(args: SelectSubset<T, verificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {verificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends verificationUpdateManyAndReturnArgs>(args: SelectSubset<T, verificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {verificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends verificationUpsertArgs>(args: SelectSubset<T, verificationUpsertArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends verificationCountArgs>(
      args?: Subset<T, verificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends verificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: verificationGroupByArgs['orderBy'] }
        : { orderBy?: verificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, verificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the verification model
   */
  readonly fields: verificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__verificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the verification model
   */
  interface verificationFieldRefs {
    readonly id: FieldRef<"verification", 'String'>
    readonly identifier: FieldRef<"verification", 'String'>
    readonly value: FieldRef<"verification", 'String'>
    readonly expiresAt: FieldRef<"verification", 'DateTime'>
    readonly createdAt: FieldRef<"verification", 'DateTime'>
    readonly updatedAt: FieldRef<"verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * verification findUnique
   */
  export type verificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findUniqueOrThrow
   */
  export type verificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findFirst
   */
  export type verificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findFirstOrThrow
   */
  export type verificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findMany
   */
  export type verificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verifications to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification create
   */
  export type verificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to create a verification.
     */
    data: XOR<verificationCreateInput, verificationUncheckedCreateInput>
  }

  /**
   * verification createMany
   */
  export type verificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many verifications.
     */
    data: verificationCreateManyInput | verificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification createManyAndReturn
   */
  export type verificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data used to create many verifications.
     */
    data: verificationCreateManyInput | verificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification update
   */
  export type verificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to update a verification.
     */
    data: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
    /**
     * Choose, which verification to update.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification updateMany
   */
  export type verificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update verifications.
     */
    data: XOR<verificationUpdateManyMutationInput, verificationUncheckedUpdateManyInput>
    /**
     * Filter which verifications to update
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to update.
     */
    limit?: number
  }

  /**
   * verification updateManyAndReturn
   */
  export type verificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data used to update verifications.
     */
    data: XOR<verificationUpdateManyMutationInput, verificationUncheckedUpdateManyInput>
    /**
     * Filter which verifications to update
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to update.
     */
    limit?: number
  }

  /**
   * verification upsert
   */
  export type verificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The filter to search for the verification to update in case it exists.
     */
    where: verificationWhereUniqueInput
    /**
     * In case the verification found by the `where` argument doesn't exist, create a new verification with this data.
     */
    create: XOR<verificationCreateInput, verificationUncheckedCreateInput>
    /**
     * In case the verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
  }

  /**
   * verification delete
   */
  export type verificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter which verification to delete.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification deleteMany
   */
  export type verificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verifications to delete
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to delete.
     */
    limit?: number
  }

  /**
   * verification without action
   */
  export type verificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
  }


  /**
   * Model invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    email: string | null
    role: string | null
    status: string | null
    expiresAt: Date | null
    inviterId: string | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    email: string | null
    role: string | null
    status: string | null
    expiresAt: Date | null
    inviterId: string | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    organizationId: number
    email: number
    role: number
    status: number
    expiresAt: number
    inviterId: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    organizationId?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    inviterId?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    organizationId?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    inviterId?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    organizationId?: true
    email?: true
    role?: true
    status?: true
    expiresAt?: true
    inviterId?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which invitation to aggregate.
     */
    where?: invitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invitations to fetch.
     */
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: invitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type invitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: invitationWhereInput
    orderBy?: invitationOrderByWithAggregationInput | invitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: invitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    organizationId: string
    email: string
    role: string | null
    status: string
    expiresAt: Date
    inviterId: string
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends invitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type invitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    inviterId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type invitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    inviterId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type invitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    inviterId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type invitationSelectScalar = {
    id?: boolean
    organizationId?: boolean
    email?: boolean
    role?: boolean
    status?: boolean
    expiresAt?: boolean
    inviterId?: boolean
  }

  export type invitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "email" | "role" | "status" | "expiresAt" | "inviterId", ExtArgs["result"]["invitation"]>
  export type invitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }
  export type invitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }
  export type invitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
  }

  export type $invitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "invitation"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      organization: Prisma.$organizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      email: string
      role: string | null
      status: string
      expiresAt: Date
      inviterId: string
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type invitationGetPayload<S extends boolean | null | undefined | invitationDefaultArgs> = $Result.GetResult<Prisma.$invitationPayload, S>

  type invitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<invitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface invitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['invitation'], meta: { name: 'invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {invitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends invitationFindUniqueArgs>(args: SelectSubset<T, invitationFindUniqueArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {invitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends invitationFindUniqueOrThrowArgs>(args: SelectSubset<T, invitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends invitationFindFirstArgs>(args?: SelectSubset<T, invitationFindFirstArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends invitationFindFirstOrThrowArgs>(args?: SelectSubset<T, invitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends invitationFindManyArgs>(args?: SelectSubset<T, invitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {invitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends invitationCreateArgs>(args: SelectSubset<T, invitationCreateArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {invitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends invitationCreateManyArgs>(args?: SelectSubset<T, invitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {invitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends invitationCreateManyAndReturnArgs>(args?: SelectSubset<T, invitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitation.
     * @param {invitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends invitationDeleteArgs>(args: SelectSubset<T, invitationDeleteArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {invitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends invitationUpdateArgs>(args: SelectSubset<T, invitationUpdateArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {invitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends invitationDeleteManyArgs>(args?: SelectSubset<T, invitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends invitationUpdateManyArgs>(args: SelectSubset<T, invitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {invitationUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends invitationUpdateManyAndReturnArgs>(args: SelectSubset<T, invitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitation.
     * @param {invitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends invitationUpsertArgs>(args: SelectSubset<T, invitationUpsertArgs<ExtArgs>>): Prisma__invitationClient<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends invitationCountArgs>(
      args?: Subset<T, invitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {invitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends invitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: invitationGroupByArgs['orderBy'] }
        : { orderBy?: invitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, invitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the invitation model
   */
  readonly fields: invitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__invitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends organizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, organizationDefaultArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the invitation model
   */
  interface invitationFieldRefs {
    readonly id: FieldRef<"invitation", 'String'>
    readonly organizationId: FieldRef<"invitation", 'String'>
    readonly email: FieldRef<"invitation", 'String'>
    readonly role: FieldRef<"invitation", 'String'>
    readonly status: FieldRef<"invitation", 'String'>
    readonly expiresAt: FieldRef<"invitation", 'DateTime'>
    readonly inviterId: FieldRef<"invitation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * invitation findUnique
   */
  export type invitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter, which invitation to fetch.
     */
    where: invitationWhereUniqueInput
  }

  /**
   * invitation findUniqueOrThrow
   */
  export type invitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter, which invitation to fetch.
     */
    where: invitationWhereUniqueInput
  }

  /**
   * invitation findFirst
   */
  export type invitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter, which invitation to fetch.
     */
    where?: invitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invitations to fetch.
     */
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invitations.
     */
    cursor?: invitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * invitation findFirstOrThrow
   */
  export type invitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter, which invitation to fetch.
     */
    where?: invitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invitations to fetch.
     */
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for invitations.
     */
    cursor?: invitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * invitation findMany
   */
  export type invitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter, which invitations to fetch.
     */
    where?: invitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of invitations to fetch.
     */
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing invitations.
     */
    cursor?: invitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * invitation create
   */
  export type invitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * The data needed to create a invitation.
     */
    data: XOR<invitationCreateInput, invitationUncheckedCreateInput>
  }

  /**
   * invitation createMany
   */
  export type invitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many invitations.
     */
    data: invitationCreateManyInput | invitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * invitation createManyAndReturn
   */
  export type invitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * The data used to create many invitations.
     */
    data: invitationCreateManyInput | invitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * invitation update
   */
  export type invitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * The data needed to update a invitation.
     */
    data: XOR<invitationUpdateInput, invitationUncheckedUpdateInput>
    /**
     * Choose, which invitation to update.
     */
    where: invitationWhereUniqueInput
  }

  /**
   * invitation updateMany
   */
  export type invitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update invitations.
     */
    data: XOR<invitationUpdateManyMutationInput, invitationUncheckedUpdateManyInput>
    /**
     * Filter which invitations to update
     */
    where?: invitationWhereInput
    /**
     * Limit how many invitations to update.
     */
    limit?: number
  }

  /**
   * invitation updateManyAndReturn
   */
  export type invitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * The data used to update invitations.
     */
    data: XOR<invitationUpdateManyMutationInput, invitationUncheckedUpdateManyInput>
    /**
     * Filter which invitations to update
     */
    where?: invitationWhereInput
    /**
     * Limit how many invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * invitation upsert
   */
  export type invitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * The filter to search for the invitation to update in case it exists.
     */
    where: invitationWhereUniqueInput
    /**
     * In case the invitation found by the `where` argument doesn't exist, create a new invitation with this data.
     */
    create: XOR<invitationCreateInput, invitationUncheckedCreateInput>
    /**
     * In case the invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<invitationUpdateInput, invitationUncheckedUpdateInput>
  }

  /**
   * invitation delete
   */
  export type invitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    /**
     * Filter which invitation to delete.
     */
    where: invitationWhereUniqueInput
  }

  /**
   * invitation deleteMany
   */
  export type invitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which invitations to delete
     */
    where?: invitationWhereInput
    /**
     * Limit how many invitations to delete.
     */
    limit?: number
  }

  /**
   * invitation without action
   */
  export type invitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
  }


  /**
   * Model member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    organizationId: number
    userId: number
    role: number
    createdAt: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    organizationId?: true
    userId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which member to aggregate.
     */
    where?: memberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of members to fetch.
     */
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: memberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type memberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: memberWhereInput
    orderBy?: memberOrderByWithAggregationInput | memberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: memberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    organizationId: string
    userId: string
    role: string
    createdAt: Date
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends memberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type memberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type memberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type memberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type memberSelectScalar = {
    id?: boolean
    organizationId?: boolean
    userId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type memberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "userId" | "role" | "createdAt", ExtArgs["result"]["member"]>
  export type memberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type memberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type memberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $memberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "member"
    objects: {
      organization: Prisma.$organizationPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      userId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type memberGetPayload<S extends boolean | null | undefined | memberDefaultArgs> = $Result.GetResult<Prisma.$memberPayload, S>

  type memberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<memberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface memberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['member'], meta: { name: 'member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {memberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends memberFindUniqueArgs>(args: SelectSubset<T, memberFindUniqueArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {memberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends memberFindUniqueOrThrowArgs>(args: SelectSubset<T, memberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends memberFindFirstArgs>(args?: SelectSubset<T, memberFindFirstArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends memberFindFirstOrThrowArgs>(args?: SelectSubset<T, memberFindFirstOrThrowArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends memberFindManyArgs>(args?: SelectSubset<T, memberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {memberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends memberCreateArgs>(args: SelectSubset<T, memberCreateArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {memberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends memberCreateManyArgs>(args?: SelectSubset<T, memberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {memberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends memberCreateManyAndReturnArgs>(args?: SelectSubset<T, memberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Member.
     * @param {memberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends memberDeleteArgs>(args: SelectSubset<T, memberDeleteArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {memberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends memberUpdateArgs>(args: SelectSubset<T, memberUpdateArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {memberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends memberDeleteManyArgs>(args?: SelectSubset<T, memberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends memberUpdateManyArgs>(args: SelectSubset<T, memberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members and returns the data updated in the database.
     * @param {memberUpdateManyAndReturnArgs} args - Arguments to update many Members.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends memberUpdateManyAndReturnArgs>(args: SelectSubset<T, memberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Member.
     * @param {memberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends memberUpsertArgs>(args: SelectSubset<T, memberUpsertArgs<ExtArgs>>): Prisma__memberClient<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends memberCountArgs>(
      args?: Subset<T, memberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {memberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends memberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: memberGroupByArgs['orderBy'] }
        : { orderBy?: memberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, memberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the member model
   */
  readonly fields: memberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__memberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends organizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, organizationDefaultArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the member model
   */
  interface memberFieldRefs {
    readonly id: FieldRef<"member", 'String'>
    readonly organizationId: FieldRef<"member", 'String'>
    readonly userId: FieldRef<"member", 'String'>
    readonly role: FieldRef<"member", 'String'>
    readonly createdAt: FieldRef<"member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * member findUnique
   */
  export type memberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter, which member to fetch.
     */
    where: memberWhereUniqueInput
  }

  /**
   * member findUniqueOrThrow
   */
  export type memberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter, which member to fetch.
     */
    where: memberWhereUniqueInput
  }

  /**
   * member findFirst
   */
  export type memberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter, which member to fetch.
     */
    where?: memberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of members to fetch.
     */
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for members.
     */
    cursor?: memberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * member findFirstOrThrow
   */
  export type memberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter, which member to fetch.
     */
    where?: memberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of members to fetch.
     */
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for members.
     */
    cursor?: memberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * member findMany
   */
  export type memberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter, which members to fetch.
     */
    where?: memberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of members to fetch.
     */
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing members.
     */
    cursor?: memberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * member create
   */
  export type memberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * The data needed to create a member.
     */
    data: XOR<memberCreateInput, memberUncheckedCreateInput>
  }

  /**
   * member createMany
   */
  export type memberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many members.
     */
    data: memberCreateManyInput | memberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * member createManyAndReturn
   */
  export type memberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * The data used to create many members.
     */
    data: memberCreateManyInput | memberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * member update
   */
  export type memberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * The data needed to update a member.
     */
    data: XOR<memberUpdateInput, memberUncheckedUpdateInput>
    /**
     * Choose, which member to update.
     */
    where: memberWhereUniqueInput
  }

  /**
   * member updateMany
   */
  export type memberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update members.
     */
    data: XOR<memberUpdateManyMutationInput, memberUncheckedUpdateManyInput>
    /**
     * Filter which members to update
     */
    where?: memberWhereInput
    /**
     * Limit how many members to update.
     */
    limit?: number
  }

  /**
   * member updateManyAndReturn
   */
  export type memberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * The data used to update members.
     */
    data: XOR<memberUpdateManyMutationInput, memberUncheckedUpdateManyInput>
    /**
     * Filter which members to update
     */
    where?: memberWhereInput
    /**
     * Limit how many members to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * member upsert
   */
  export type memberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * The filter to search for the member to update in case it exists.
     */
    where: memberWhereUniqueInput
    /**
     * In case the member found by the `where` argument doesn't exist, create a new member with this data.
     */
    create: XOR<memberCreateInput, memberUncheckedCreateInput>
    /**
     * In case the member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<memberUpdateInput, memberUncheckedUpdateInput>
  }

  /**
   * member delete
   */
  export type memberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    /**
     * Filter which member to delete.
     */
    where: memberWhereUniqueInput
  }

  /**
   * member deleteMany
   */
  export type memberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which members to delete
     */
    where?: memberWhereInput
    /**
     * Limit how many members to delete.
     */
    limit?: number
  }

  /**
   * member without action
   */
  export type memberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
  }


  /**
   * Model oauthAccessToken
   */

  export type AggregateOauthAccessToken = {
    _count: OauthAccessTokenCountAggregateOutputType | null
    _min: OauthAccessTokenMinAggregateOutputType | null
    _max: OauthAccessTokenMaxAggregateOutputType | null
  }

  export type OauthAccessTokenMinAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    clientId: string | null
    userId: string | null
    scopes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OauthAccessTokenMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    clientId: string | null
    userId: string | null
    scopes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OauthAccessTokenCountAggregateOutputType = {
    id: number
    accessToken: number
    refreshToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    clientId: number
    userId: number
    scopes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OauthAccessTokenMinAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OauthAccessTokenMaxAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OauthAccessTokenCountAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OauthAccessTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthAccessToken to aggregate.
     */
    where?: oauthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthAccessTokens to fetch.
     */
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: oauthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned oauthAccessTokens
    **/
    _count?: true | OauthAccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OauthAccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OauthAccessTokenMaxAggregateInputType
  }

  export type GetOauthAccessTokenAggregateType<T extends OauthAccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOauthAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauthAccessToken[P]>
      : GetScalarType<T[P], AggregateOauthAccessToken[P]>
  }




  export type oauthAccessTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthAccessTokenWhereInput
    orderBy?: oauthAccessTokenOrderByWithAggregationInput | oauthAccessTokenOrderByWithAggregationInput[]
    by: OauthAccessTokenScalarFieldEnum[] | OauthAccessTokenScalarFieldEnum
    having?: oauthAccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OauthAccessTokenCountAggregateInputType | true
    _min?: OauthAccessTokenMinAggregateInputType
    _max?: OauthAccessTokenMaxAggregateInputType
  }

  export type OauthAccessTokenGroupByOutputType = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date
    refreshTokenExpiresAt: Date
    clientId: string
    userId: string | null
    scopes: string
    createdAt: Date
    updatedAt: Date
    _count: OauthAccessTokenCountAggregateOutputType | null
    _min: OauthAccessTokenMinAggregateOutputType | null
    _max: OauthAccessTokenMaxAggregateOutputType | null
  }

  type GetOauthAccessTokenGroupByPayload<T extends oauthAccessTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OauthAccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OauthAccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OauthAccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OauthAccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type oauthAccessTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oauthAccessToken"]>

  export type oauthAccessTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oauthAccessToken"]>

  export type oauthAccessTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oauthAccessToken"]>

  export type oauthAccessTokenSelectScalar = {
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type oauthAccessTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "clientId" | "userId" | "scopes" | "createdAt" | "updatedAt", ExtArgs["result"]["oauthAccessToken"]>
  export type oauthAccessTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }
  export type oauthAccessTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }
  export type oauthAccessTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | oauthAccessToken$userArgs<ExtArgs>
  }

  export type $oauthAccessTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "oauthAccessToken"
    objects: {
      oauthApplication: Prisma.$oauthApplicationPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accessToken: string
      refreshToken: string
      accessTokenExpiresAt: Date
      refreshTokenExpiresAt: Date
      clientId: string
      userId: string | null
      scopes: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oauthAccessToken"]>
    composites: {}
  }

  type oauthAccessTokenGetPayload<S extends boolean | null | undefined | oauthAccessTokenDefaultArgs> = $Result.GetResult<Prisma.$oauthAccessTokenPayload, S>

  type oauthAccessTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<oauthAccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OauthAccessTokenCountAggregateInputType | true
    }

  export interface oauthAccessTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['oauthAccessToken'], meta: { name: 'oauthAccessToken' } }
    /**
     * Find zero or one OauthAccessToken that matches the filter.
     * @param {oauthAccessTokenFindUniqueArgs} args - Arguments to find a OauthAccessToken
     * @example
     * // Get one OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends oauthAccessTokenFindUniqueArgs>(args: SelectSubset<T, oauthAccessTokenFindUniqueArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OauthAccessToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {oauthAccessTokenFindUniqueOrThrowArgs} args - Arguments to find a OauthAccessToken
     * @example
     * // Get one OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends oauthAccessTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, oauthAccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthAccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenFindFirstArgs} args - Arguments to find a OauthAccessToken
     * @example
     * // Get one OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends oauthAccessTokenFindFirstArgs>(args?: SelectSubset<T, oauthAccessTokenFindFirstArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthAccessToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenFindFirstOrThrowArgs} args - Arguments to find a OauthAccessToken
     * @example
     * // Get one OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends oauthAccessTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, oauthAccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OauthAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OauthAccessTokens
     * const oauthAccessTokens = await prisma.oauthAccessToken.findMany()
     * 
     * // Get first 10 OauthAccessTokens
     * const oauthAccessTokens = await prisma.oauthAccessToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauthAccessTokenWithIdOnly = await prisma.oauthAccessToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends oauthAccessTokenFindManyArgs>(args?: SelectSubset<T, oauthAccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OauthAccessToken.
     * @param {oauthAccessTokenCreateArgs} args - Arguments to create a OauthAccessToken.
     * @example
     * // Create one OauthAccessToken
     * const OauthAccessToken = await prisma.oauthAccessToken.create({
     *   data: {
     *     // ... data to create a OauthAccessToken
     *   }
     * })
     * 
     */
    create<T extends oauthAccessTokenCreateArgs>(args: SelectSubset<T, oauthAccessTokenCreateArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OauthAccessTokens.
     * @param {oauthAccessTokenCreateManyArgs} args - Arguments to create many OauthAccessTokens.
     * @example
     * // Create many OauthAccessTokens
     * const oauthAccessToken = await prisma.oauthAccessToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends oauthAccessTokenCreateManyArgs>(args?: SelectSubset<T, oauthAccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OauthAccessTokens and returns the data saved in the database.
     * @param {oauthAccessTokenCreateManyAndReturnArgs} args - Arguments to create many OauthAccessTokens.
     * @example
     * // Create many OauthAccessTokens
     * const oauthAccessToken = await prisma.oauthAccessToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OauthAccessTokens and only return the `id`
     * const oauthAccessTokenWithIdOnly = await prisma.oauthAccessToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends oauthAccessTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, oauthAccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OauthAccessToken.
     * @param {oauthAccessTokenDeleteArgs} args - Arguments to delete one OauthAccessToken.
     * @example
     * // Delete one OauthAccessToken
     * const OauthAccessToken = await prisma.oauthAccessToken.delete({
     *   where: {
     *     // ... filter to delete one OauthAccessToken
     *   }
     * })
     * 
     */
    delete<T extends oauthAccessTokenDeleteArgs>(args: SelectSubset<T, oauthAccessTokenDeleteArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OauthAccessToken.
     * @param {oauthAccessTokenUpdateArgs} args - Arguments to update one OauthAccessToken.
     * @example
     * // Update one OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends oauthAccessTokenUpdateArgs>(args: SelectSubset<T, oauthAccessTokenUpdateArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OauthAccessTokens.
     * @param {oauthAccessTokenDeleteManyArgs} args - Arguments to filter OauthAccessTokens to delete.
     * @example
     * // Delete a few OauthAccessTokens
     * const { count } = await prisma.oauthAccessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends oauthAccessTokenDeleteManyArgs>(args?: SelectSubset<T, oauthAccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OauthAccessTokens
     * const oauthAccessToken = await prisma.oauthAccessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends oauthAccessTokenUpdateManyArgs>(args: SelectSubset<T, oauthAccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthAccessTokens and returns the data updated in the database.
     * @param {oauthAccessTokenUpdateManyAndReturnArgs} args - Arguments to update many OauthAccessTokens.
     * @example
     * // Update many OauthAccessTokens
     * const oauthAccessToken = await prisma.oauthAccessToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OauthAccessTokens and only return the `id`
     * const oauthAccessTokenWithIdOnly = await prisma.oauthAccessToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends oauthAccessTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, oauthAccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OauthAccessToken.
     * @param {oauthAccessTokenUpsertArgs} args - Arguments to update or create a OauthAccessToken.
     * @example
     * // Update or create a OauthAccessToken
     * const oauthAccessToken = await prisma.oauthAccessToken.upsert({
     *   create: {
     *     // ... data to create a OauthAccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OauthAccessToken we want to update
     *   }
     * })
     */
    upsert<T extends oauthAccessTokenUpsertArgs>(args: SelectSubset<T, oauthAccessTokenUpsertArgs<ExtArgs>>): Prisma__oauthAccessTokenClient<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OauthAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenCountArgs} args - Arguments to filter OauthAccessTokens to count.
     * @example
     * // Count the number of OauthAccessTokens
     * const count = await prisma.oauthAccessToken.count({
     *   where: {
     *     // ... the filter for the OauthAccessTokens we want to count
     *   }
     * })
    **/
    count<T extends oauthAccessTokenCountArgs>(
      args?: Subset<T, oauthAccessTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OauthAccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OauthAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OauthAccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OauthAccessTokenAggregateArgs>(args: Subset<T, OauthAccessTokenAggregateArgs>): Prisma.PrismaPromise<GetOauthAccessTokenAggregateType<T>>

    /**
     * Group by OauthAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthAccessTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends oauthAccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: oauthAccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: oauthAccessTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, oauthAccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the oauthAccessToken model
   */
  readonly fields: oauthAccessTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for oauthAccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__oauthAccessTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oauthApplication<T extends oauthApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, oauthApplicationDefaultArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends oauthAccessToken$userArgs<ExtArgs> = {}>(args?: Subset<T, oauthAccessToken$userArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the oauthAccessToken model
   */
  interface oauthAccessTokenFieldRefs {
    readonly id: FieldRef<"oauthAccessToken", 'String'>
    readonly accessToken: FieldRef<"oauthAccessToken", 'String'>
    readonly refreshToken: FieldRef<"oauthAccessToken", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"oauthAccessToken", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"oauthAccessToken", 'DateTime'>
    readonly clientId: FieldRef<"oauthAccessToken", 'String'>
    readonly userId: FieldRef<"oauthAccessToken", 'String'>
    readonly scopes: FieldRef<"oauthAccessToken", 'String'>
    readonly createdAt: FieldRef<"oauthAccessToken", 'DateTime'>
    readonly updatedAt: FieldRef<"oauthAccessToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * oauthAccessToken findUnique
   */
  export type oauthAccessTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which oauthAccessToken to fetch.
     */
    where: oauthAccessTokenWhereUniqueInput
  }

  /**
   * oauthAccessToken findUniqueOrThrow
   */
  export type oauthAccessTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which oauthAccessToken to fetch.
     */
    where: oauthAccessTokenWhereUniqueInput
  }

  /**
   * oauthAccessToken findFirst
   */
  export type oauthAccessTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which oauthAccessToken to fetch.
     */
    where?: oauthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthAccessTokens to fetch.
     */
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthAccessTokens.
     */
    cursor?: oauthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthAccessTokens.
     */
    distinct?: OauthAccessTokenScalarFieldEnum | OauthAccessTokenScalarFieldEnum[]
  }

  /**
   * oauthAccessToken findFirstOrThrow
   */
  export type oauthAccessTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which oauthAccessToken to fetch.
     */
    where?: oauthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthAccessTokens to fetch.
     */
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthAccessTokens.
     */
    cursor?: oauthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthAccessTokens.
     */
    distinct?: OauthAccessTokenScalarFieldEnum | OauthAccessTokenScalarFieldEnum[]
  }

  /**
   * oauthAccessToken findMany
   */
  export type oauthAccessTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which oauthAccessTokens to fetch.
     */
    where?: oauthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthAccessTokens to fetch.
     */
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing oauthAccessTokens.
     */
    cursor?: oauthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthAccessTokens.
     */
    skip?: number
    distinct?: OauthAccessTokenScalarFieldEnum | OauthAccessTokenScalarFieldEnum[]
  }

  /**
   * oauthAccessToken create
   */
  export type oauthAccessTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a oauthAccessToken.
     */
    data: XOR<oauthAccessTokenCreateInput, oauthAccessTokenUncheckedCreateInput>
  }

  /**
   * oauthAccessToken createMany
   */
  export type oauthAccessTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many oauthAccessTokens.
     */
    data: oauthAccessTokenCreateManyInput | oauthAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauthAccessToken createManyAndReturn
   */
  export type oauthAccessTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to create many oauthAccessTokens.
     */
    data: oauthAccessTokenCreateManyInput | oauthAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthAccessToken update
   */
  export type oauthAccessTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a oauthAccessToken.
     */
    data: XOR<oauthAccessTokenUpdateInput, oauthAccessTokenUncheckedUpdateInput>
    /**
     * Choose, which oauthAccessToken to update.
     */
    where: oauthAccessTokenWhereUniqueInput
  }

  /**
   * oauthAccessToken updateMany
   */
  export type oauthAccessTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update oauthAccessTokens.
     */
    data: XOR<oauthAccessTokenUpdateManyMutationInput, oauthAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which oauthAccessTokens to update
     */
    where?: oauthAccessTokenWhereInput
    /**
     * Limit how many oauthAccessTokens to update.
     */
    limit?: number
  }

  /**
   * oauthAccessToken updateManyAndReturn
   */
  export type oauthAccessTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to update oauthAccessTokens.
     */
    data: XOR<oauthAccessTokenUpdateManyMutationInput, oauthAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which oauthAccessTokens to update
     */
    where?: oauthAccessTokenWhereInput
    /**
     * Limit how many oauthAccessTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthAccessToken upsert
   */
  export type oauthAccessTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the oauthAccessToken to update in case it exists.
     */
    where: oauthAccessTokenWhereUniqueInput
    /**
     * In case the oauthAccessToken found by the `where` argument doesn't exist, create a new oauthAccessToken with this data.
     */
    create: XOR<oauthAccessTokenCreateInput, oauthAccessTokenUncheckedCreateInput>
    /**
     * In case the oauthAccessToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<oauthAccessTokenUpdateInput, oauthAccessTokenUncheckedUpdateInput>
  }

  /**
   * oauthAccessToken delete
   */
  export type oauthAccessTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter which oauthAccessToken to delete.
     */
    where: oauthAccessTokenWhereUniqueInput
  }

  /**
   * oauthAccessToken deleteMany
   */
  export type oauthAccessTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthAccessTokens to delete
     */
    where?: oauthAccessTokenWhereInput
    /**
     * Limit how many oauthAccessTokens to delete.
     */
    limit?: number
  }

  /**
   * oauthAccessToken.user
   */
  export type oauthAccessToken$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
  }

  /**
   * oauthAccessToken without action
   */
  export type oauthAccessTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
  }


  /**
   * Model oauthApplication
   */

  export type AggregateOauthApplication = {
    _count: OauthApplicationCountAggregateOutputType | null
    _min: OauthApplicationMinAggregateOutputType | null
    _max: OauthApplicationMaxAggregateOutputType | null
  }

  export type OauthApplicationMinAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    metadata: string | null
    clientId: string | null
    clientSecret: string | null
    redirectURLs: string | null
    type: string | null
    disabled: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OauthApplicationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    icon: string | null
    metadata: string | null
    clientId: string | null
    clientSecret: string | null
    redirectURLs: string | null
    type: string | null
    disabled: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OauthApplicationCountAggregateOutputType = {
    id: number
    name: number
    icon: number
    metadata: number
    clientId: number
    clientSecret: number
    redirectURLs: number
    type: number
    disabled: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OauthApplicationMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    metadata?: true
    clientId?: true
    clientSecret?: true
    redirectURLs?: true
    type?: true
    disabled?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OauthApplicationMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    metadata?: true
    clientId?: true
    clientSecret?: true
    redirectURLs?: true
    type?: true
    disabled?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OauthApplicationCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    metadata?: true
    clientId?: true
    clientSecret?: true
    redirectURLs?: true
    type?: true
    disabled?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OauthApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthApplication to aggregate.
     */
    where?: oauthApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthApplications to fetch.
     */
    orderBy?: oauthApplicationOrderByWithRelationInput | oauthApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: oauthApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned oauthApplications
    **/
    _count?: true | OauthApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OauthApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OauthApplicationMaxAggregateInputType
  }

  export type GetOauthApplicationAggregateType<T extends OauthApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateOauthApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauthApplication[P]>
      : GetScalarType<T[P], AggregateOauthApplication[P]>
  }




  export type oauthApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthApplicationWhereInput
    orderBy?: oauthApplicationOrderByWithAggregationInput | oauthApplicationOrderByWithAggregationInput[]
    by: OauthApplicationScalarFieldEnum[] | OauthApplicationScalarFieldEnum
    having?: oauthApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OauthApplicationCountAggregateInputType | true
    _min?: OauthApplicationMinAggregateInputType
    _max?: OauthApplicationMaxAggregateInputType
  }

  export type OauthApplicationGroupByOutputType = {
    id: string
    name: string
    icon: string | null
    metadata: string | null
    clientId: string
    clientSecret: string | null
    redirectURLs: string
    type: string
    disabled: boolean | null
    userId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OauthApplicationCountAggregateOutputType | null
    _min: OauthApplicationMinAggregateOutputType | null
    _max: OauthApplicationMaxAggregateOutputType | null
  }

  type GetOauthApplicationGroupByPayload<T extends oauthApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OauthApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OauthApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OauthApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], OauthApplicationGroupByOutputType[P]>
        }
      >
    >


  export type oauthApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    metadata?: boolean
    clientId?: boolean
    clientSecret?: boolean
    redirectURLs?: boolean
    type?: boolean
    disabled?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    oauthAccessToken?: boolean | oauthApplication$oauthAccessTokenArgs<ExtArgs>
    user?: boolean | oauthApplication$userArgs<ExtArgs>
    oauthConsent?: boolean | oauthApplication$oauthConsentArgs<ExtArgs>
    _count?: boolean | OauthApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauthApplication"]>

  export type oauthApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    metadata?: boolean
    clientId?: boolean
    clientSecret?: boolean
    redirectURLs?: boolean
    type?: boolean
    disabled?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | oauthApplication$userArgs<ExtArgs>
  }, ExtArgs["result"]["oauthApplication"]>

  export type oauthApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    metadata?: boolean
    clientId?: boolean
    clientSecret?: boolean
    redirectURLs?: boolean
    type?: boolean
    disabled?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | oauthApplication$userArgs<ExtArgs>
  }, ExtArgs["result"]["oauthApplication"]>

  export type oauthApplicationSelectScalar = {
    id?: boolean
    name?: boolean
    icon?: boolean
    metadata?: boolean
    clientId?: boolean
    clientSecret?: boolean
    redirectURLs?: boolean
    type?: boolean
    disabled?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type oauthApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "icon" | "metadata" | "clientId" | "clientSecret" | "redirectURLs" | "type" | "disabled" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["oauthApplication"]>
  export type oauthApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthAccessToken?: boolean | oauthApplication$oauthAccessTokenArgs<ExtArgs>
    user?: boolean | oauthApplication$userArgs<ExtArgs>
    oauthConsent?: boolean | oauthApplication$oauthConsentArgs<ExtArgs>
    _count?: boolean | OauthApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type oauthApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | oauthApplication$userArgs<ExtArgs>
  }
  export type oauthApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | oauthApplication$userArgs<ExtArgs>
  }

  export type $oauthApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "oauthApplication"
    objects: {
      oauthAccessToken: Prisma.$oauthAccessTokenPayload<ExtArgs>[]
      user: Prisma.$userPayload<ExtArgs> | null
      oauthConsent: Prisma.$oauthConsentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      icon: string | null
      metadata: string | null
      clientId: string
      clientSecret: string | null
      redirectURLs: string
      type: string
      disabled: boolean | null
      userId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oauthApplication"]>
    composites: {}
  }

  type oauthApplicationGetPayload<S extends boolean | null | undefined | oauthApplicationDefaultArgs> = $Result.GetResult<Prisma.$oauthApplicationPayload, S>

  type oauthApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<oauthApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OauthApplicationCountAggregateInputType | true
    }

  export interface oauthApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['oauthApplication'], meta: { name: 'oauthApplication' } }
    /**
     * Find zero or one OauthApplication that matches the filter.
     * @param {oauthApplicationFindUniqueArgs} args - Arguments to find a OauthApplication
     * @example
     * // Get one OauthApplication
     * const oauthApplication = await prisma.oauthApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends oauthApplicationFindUniqueArgs>(args: SelectSubset<T, oauthApplicationFindUniqueArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OauthApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {oauthApplicationFindUniqueOrThrowArgs} args - Arguments to find a OauthApplication
     * @example
     * // Get one OauthApplication
     * const oauthApplication = await prisma.oauthApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends oauthApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, oauthApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationFindFirstArgs} args - Arguments to find a OauthApplication
     * @example
     * // Get one OauthApplication
     * const oauthApplication = await prisma.oauthApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends oauthApplicationFindFirstArgs>(args?: SelectSubset<T, oauthApplicationFindFirstArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationFindFirstOrThrowArgs} args - Arguments to find a OauthApplication
     * @example
     * // Get one OauthApplication
     * const oauthApplication = await prisma.oauthApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends oauthApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, oauthApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OauthApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OauthApplications
     * const oauthApplications = await prisma.oauthApplication.findMany()
     * 
     * // Get first 10 OauthApplications
     * const oauthApplications = await prisma.oauthApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauthApplicationWithIdOnly = await prisma.oauthApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends oauthApplicationFindManyArgs>(args?: SelectSubset<T, oauthApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OauthApplication.
     * @param {oauthApplicationCreateArgs} args - Arguments to create a OauthApplication.
     * @example
     * // Create one OauthApplication
     * const OauthApplication = await prisma.oauthApplication.create({
     *   data: {
     *     // ... data to create a OauthApplication
     *   }
     * })
     * 
     */
    create<T extends oauthApplicationCreateArgs>(args: SelectSubset<T, oauthApplicationCreateArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OauthApplications.
     * @param {oauthApplicationCreateManyArgs} args - Arguments to create many OauthApplications.
     * @example
     * // Create many OauthApplications
     * const oauthApplication = await prisma.oauthApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends oauthApplicationCreateManyArgs>(args?: SelectSubset<T, oauthApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OauthApplications and returns the data saved in the database.
     * @param {oauthApplicationCreateManyAndReturnArgs} args - Arguments to create many OauthApplications.
     * @example
     * // Create many OauthApplications
     * const oauthApplication = await prisma.oauthApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OauthApplications and only return the `id`
     * const oauthApplicationWithIdOnly = await prisma.oauthApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends oauthApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, oauthApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OauthApplication.
     * @param {oauthApplicationDeleteArgs} args - Arguments to delete one OauthApplication.
     * @example
     * // Delete one OauthApplication
     * const OauthApplication = await prisma.oauthApplication.delete({
     *   where: {
     *     // ... filter to delete one OauthApplication
     *   }
     * })
     * 
     */
    delete<T extends oauthApplicationDeleteArgs>(args: SelectSubset<T, oauthApplicationDeleteArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OauthApplication.
     * @param {oauthApplicationUpdateArgs} args - Arguments to update one OauthApplication.
     * @example
     * // Update one OauthApplication
     * const oauthApplication = await prisma.oauthApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends oauthApplicationUpdateArgs>(args: SelectSubset<T, oauthApplicationUpdateArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OauthApplications.
     * @param {oauthApplicationDeleteManyArgs} args - Arguments to filter OauthApplications to delete.
     * @example
     * // Delete a few OauthApplications
     * const { count } = await prisma.oauthApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends oauthApplicationDeleteManyArgs>(args?: SelectSubset<T, oauthApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OauthApplications
     * const oauthApplication = await prisma.oauthApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends oauthApplicationUpdateManyArgs>(args: SelectSubset<T, oauthApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthApplications and returns the data updated in the database.
     * @param {oauthApplicationUpdateManyAndReturnArgs} args - Arguments to update many OauthApplications.
     * @example
     * // Update many OauthApplications
     * const oauthApplication = await prisma.oauthApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OauthApplications and only return the `id`
     * const oauthApplicationWithIdOnly = await prisma.oauthApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends oauthApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, oauthApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OauthApplication.
     * @param {oauthApplicationUpsertArgs} args - Arguments to update or create a OauthApplication.
     * @example
     * // Update or create a OauthApplication
     * const oauthApplication = await prisma.oauthApplication.upsert({
     *   create: {
     *     // ... data to create a OauthApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OauthApplication we want to update
     *   }
     * })
     */
    upsert<T extends oauthApplicationUpsertArgs>(args: SelectSubset<T, oauthApplicationUpsertArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OauthApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationCountArgs} args - Arguments to filter OauthApplications to count.
     * @example
     * // Count the number of OauthApplications
     * const count = await prisma.oauthApplication.count({
     *   where: {
     *     // ... the filter for the OauthApplications we want to count
     *   }
     * })
    **/
    count<T extends oauthApplicationCountArgs>(
      args?: Subset<T, oauthApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OauthApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OauthApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OauthApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OauthApplicationAggregateArgs>(args: Subset<T, OauthApplicationAggregateArgs>): Prisma.PrismaPromise<GetOauthApplicationAggregateType<T>>

    /**
     * Group by OauthApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends oauthApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: oauthApplicationGroupByArgs['orderBy'] }
        : { orderBy?: oauthApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, oauthApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the oauthApplication model
   */
  readonly fields: oauthApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for oauthApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__oauthApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oauthAccessToken<T extends oauthApplication$oauthAccessTokenArgs<ExtArgs> = {}>(args?: Subset<T, oauthApplication$oauthAccessTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends oauthApplication$userArgs<ExtArgs> = {}>(args?: Subset<T, oauthApplication$userArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    oauthConsent<T extends oauthApplication$oauthConsentArgs<ExtArgs> = {}>(args?: Subset<T, oauthApplication$oauthConsentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the oauthApplication model
   */
  interface oauthApplicationFieldRefs {
    readonly id: FieldRef<"oauthApplication", 'String'>
    readonly name: FieldRef<"oauthApplication", 'String'>
    readonly icon: FieldRef<"oauthApplication", 'String'>
    readonly metadata: FieldRef<"oauthApplication", 'String'>
    readonly clientId: FieldRef<"oauthApplication", 'String'>
    readonly clientSecret: FieldRef<"oauthApplication", 'String'>
    readonly redirectURLs: FieldRef<"oauthApplication", 'String'>
    readonly type: FieldRef<"oauthApplication", 'String'>
    readonly disabled: FieldRef<"oauthApplication", 'Boolean'>
    readonly userId: FieldRef<"oauthApplication", 'String'>
    readonly createdAt: FieldRef<"oauthApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"oauthApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * oauthApplication findUnique
   */
  export type oauthApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter, which oauthApplication to fetch.
     */
    where: oauthApplicationWhereUniqueInput
  }

  /**
   * oauthApplication findUniqueOrThrow
   */
  export type oauthApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter, which oauthApplication to fetch.
     */
    where: oauthApplicationWhereUniqueInput
  }

  /**
   * oauthApplication findFirst
   */
  export type oauthApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter, which oauthApplication to fetch.
     */
    where?: oauthApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthApplications to fetch.
     */
    orderBy?: oauthApplicationOrderByWithRelationInput | oauthApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthApplications.
     */
    cursor?: oauthApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthApplications.
     */
    distinct?: OauthApplicationScalarFieldEnum | OauthApplicationScalarFieldEnum[]
  }

  /**
   * oauthApplication findFirstOrThrow
   */
  export type oauthApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter, which oauthApplication to fetch.
     */
    where?: oauthApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthApplications to fetch.
     */
    orderBy?: oauthApplicationOrderByWithRelationInput | oauthApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthApplications.
     */
    cursor?: oauthApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthApplications.
     */
    distinct?: OauthApplicationScalarFieldEnum | OauthApplicationScalarFieldEnum[]
  }

  /**
   * oauthApplication findMany
   */
  export type oauthApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter, which oauthApplications to fetch.
     */
    where?: oauthApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthApplications to fetch.
     */
    orderBy?: oauthApplicationOrderByWithRelationInput | oauthApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing oauthApplications.
     */
    cursor?: oauthApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthApplications.
     */
    skip?: number
    distinct?: OauthApplicationScalarFieldEnum | OauthApplicationScalarFieldEnum[]
  }

  /**
   * oauthApplication create
   */
  export type oauthApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a oauthApplication.
     */
    data: XOR<oauthApplicationCreateInput, oauthApplicationUncheckedCreateInput>
  }

  /**
   * oauthApplication createMany
   */
  export type oauthApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many oauthApplications.
     */
    data: oauthApplicationCreateManyInput | oauthApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauthApplication createManyAndReturn
   */
  export type oauthApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many oauthApplications.
     */
    data: oauthApplicationCreateManyInput | oauthApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthApplication update
   */
  export type oauthApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a oauthApplication.
     */
    data: XOR<oauthApplicationUpdateInput, oauthApplicationUncheckedUpdateInput>
    /**
     * Choose, which oauthApplication to update.
     */
    where: oauthApplicationWhereUniqueInput
  }

  /**
   * oauthApplication updateMany
   */
  export type oauthApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update oauthApplications.
     */
    data: XOR<oauthApplicationUpdateManyMutationInput, oauthApplicationUncheckedUpdateManyInput>
    /**
     * Filter which oauthApplications to update
     */
    where?: oauthApplicationWhereInput
    /**
     * Limit how many oauthApplications to update.
     */
    limit?: number
  }

  /**
   * oauthApplication updateManyAndReturn
   */
  export type oauthApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * The data used to update oauthApplications.
     */
    data: XOR<oauthApplicationUpdateManyMutationInput, oauthApplicationUncheckedUpdateManyInput>
    /**
     * Filter which oauthApplications to update
     */
    where?: oauthApplicationWhereInput
    /**
     * Limit how many oauthApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthApplication upsert
   */
  export type oauthApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the oauthApplication to update in case it exists.
     */
    where: oauthApplicationWhereUniqueInput
    /**
     * In case the oauthApplication found by the `where` argument doesn't exist, create a new oauthApplication with this data.
     */
    create: XOR<oauthApplicationCreateInput, oauthApplicationUncheckedCreateInput>
    /**
     * In case the oauthApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<oauthApplicationUpdateInput, oauthApplicationUncheckedUpdateInput>
  }

  /**
   * oauthApplication delete
   */
  export type oauthApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
    /**
     * Filter which oauthApplication to delete.
     */
    where: oauthApplicationWhereUniqueInput
  }

  /**
   * oauthApplication deleteMany
   */
  export type oauthApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthApplications to delete
     */
    where?: oauthApplicationWhereInput
    /**
     * Limit how many oauthApplications to delete.
     */
    limit?: number
  }

  /**
   * oauthApplication.oauthAccessToken
   */
  export type oauthApplication$oauthAccessTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthAccessToken
     */
    select?: oauthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthAccessToken
     */
    omit?: oauthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthAccessTokenInclude<ExtArgs> | null
    where?: oauthAccessTokenWhereInput
    orderBy?: oauthAccessTokenOrderByWithRelationInput | oauthAccessTokenOrderByWithRelationInput[]
    cursor?: oauthAccessTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OauthAccessTokenScalarFieldEnum | OauthAccessTokenScalarFieldEnum[]
  }

  /**
   * oauthApplication.user
   */
  export type oauthApplication$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
  }

  /**
   * oauthApplication.oauthConsent
   */
  export type oauthApplication$oauthConsentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    where?: oauthConsentWhereInput
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    cursor?: oauthConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OauthConsentScalarFieldEnum | OauthConsentScalarFieldEnum[]
  }

  /**
   * oauthApplication without action
   */
  export type oauthApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthApplication
     */
    select?: oauthApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthApplication
     */
    omit?: oauthApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthApplicationInclude<ExtArgs> | null
  }


  /**
   * Model oauthConsent
   */

  export type AggregateOauthConsent = {
    _count: OauthConsentCountAggregateOutputType | null
    _min: OauthConsentMinAggregateOutputType | null
    _max: OauthConsentMaxAggregateOutputType | null
  }

  export type OauthConsentMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    userId: string | null
    scopes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    consentGiven: boolean | null
  }

  export type OauthConsentMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    userId: string | null
    scopes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    consentGiven: boolean | null
  }

  export type OauthConsentCountAggregateOutputType = {
    id: number
    clientId: number
    userId: number
    scopes: number
    createdAt: number
    updatedAt: number
    consentGiven: number
    _all: number
  }


  export type OauthConsentMinAggregateInputType = {
    id?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
    consentGiven?: true
  }

  export type OauthConsentMaxAggregateInputType = {
    id?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
    consentGiven?: true
  }

  export type OauthConsentCountAggregateInputType = {
    id?: true
    clientId?: true
    userId?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
    consentGiven?: true
    _all?: true
  }

  export type OauthConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthConsent to aggregate.
     */
    where?: oauthConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthConsents to fetch.
     */
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: oauthConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned oauthConsents
    **/
    _count?: true | OauthConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OauthConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OauthConsentMaxAggregateInputType
  }

  export type GetOauthConsentAggregateType<T extends OauthConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateOauthConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauthConsent[P]>
      : GetScalarType<T[P], AggregateOauthConsent[P]>
  }




  export type oauthConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauthConsentWhereInput
    orderBy?: oauthConsentOrderByWithAggregationInput | oauthConsentOrderByWithAggregationInput[]
    by: OauthConsentScalarFieldEnum[] | OauthConsentScalarFieldEnum
    having?: oauthConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OauthConsentCountAggregateInputType | true
    _min?: OauthConsentMinAggregateInputType
    _max?: OauthConsentMaxAggregateInputType
  }

  export type OauthConsentGroupByOutputType = {
    id: string
    clientId: string
    userId: string
    scopes: string
    createdAt: Date
    updatedAt: Date
    consentGiven: boolean
    _count: OauthConsentCountAggregateOutputType | null
    _min: OauthConsentMinAggregateOutputType | null
    _max: OauthConsentMaxAggregateOutputType | null
  }

  type GetOauthConsentGroupByPayload<T extends oauthConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OauthConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OauthConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OauthConsentGroupByOutputType[P]>
            : GetScalarType<T[P], OauthConsentGroupByOutputType[P]>
        }
      >
    >


  export type oauthConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consentGiven?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauthConsent"]>

  export type oauthConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consentGiven?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauthConsent"]>

  export type oauthConsentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consentGiven?: boolean
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauthConsent"]>

  export type oauthConsentSelectScalar = {
    id?: boolean
    clientId?: boolean
    userId?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consentGiven?: boolean
  }

  export type oauthConsentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "userId" | "scopes" | "createdAt" | "updatedAt" | "consentGiven", ExtArgs["result"]["oauthConsent"]>
  export type oauthConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type oauthConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type oauthConsentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauthApplication?: boolean | oauthApplicationDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $oauthConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "oauthConsent"
    objects: {
      oauthApplication: Prisma.$oauthApplicationPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      userId: string
      scopes: string
      createdAt: Date
      updatedAt: Date
      consentGiven: boolean
    }, ExtArgs["result"]["oauthConsent"]>
    composites: {}
  }

  type oauthConsentGetPayload<S extends boolean | null | undefined | oauthConsentDefaultArgs> = $Result.GetResult<Prisma.$oauthConsentPayload, S>

  type oauthConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<oauthConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OauthConsentCountAggregateInputType | true
    }

  export interface oauthConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['oauthConsent'], meta: { name: 'oauthConsent' } }
    /**
     * Find zero or one OauthConsent that matches the filter.
     * @param {oauthConsentFindUniqueArgs} args - Arguments to find a OauthConsent
     * @example
     * // Get one OauthConsent
     * const oauthConsent = await prisma.oauthConsent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends oauthConsentFindUniqueArgs>(args: SelectSubset<T, oauthConsentFindUniqueArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OauthConsent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {oauthConsentFindUniqueOrThrowArgs} args - Arguments to find a OauthConsent
     * @example
     * // Get one OauthConsent
     * const oauthConsent = await prisma.oauthConsent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends oauthConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, oauthConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthConsent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentFindFirstArgs} args - Arguments to find a OauthConsent
     * @example
     * // Get one OauthConsent
     * const oauthConsent = await prisma.oauthConsent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends oauthConsentFindFirstArgs>(args?: SelectSubset<T, oauthConsentFindFirstArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OauthConsent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentFindFirstOrThrowArgs} args - Arguments to find a OauthConsent
     * @example
     * // Get one OauthConsent
     * const oauthConsent = await prisma.oauthConsent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends oauthConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, oauthConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OauthConsents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OauthConsents
     * const oauthConsents = await prisma.oauthConsent.findMany()
     * 
     * // Get first 10 OauthConsents
     * const oauthConsents = await prisma.oauthConsent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauthConsentWithIdOnly = await prisma.oauthConsent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends oauthConsentFindManyArgs>(args?: SelectSubset<T, oauthConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OauthConsent.
     * @param {oauthConsentCreateArgs} args - Arguments to create a OauthConsent.
     * @example
     * // Create one OauthConsent
     * const OauthConsent = await prisma.oauthConsent.create({
     *   data: {
     *     // ... data to create a OauthConsent
     *   }
     * })
     * 
     */
    create<T extends oauthConsentCreateArgs>(args: SelectSubset<T, oauthConsentCreateArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OauthConsents.
     * @param {oauthConsentCreateManyArgs} args - Arguments to create many OauthConsents.
     * @example
     * // Create many OauthConsents
     * const oauthConsent = await prisma.oauthConsent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends oauthConsentCreateManyArgs>(args?: SelectSubset<T, oauthConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OauthConsents and returns the data saved in the database.
     * @param {oauthConsentCreateManyAndReturnArgs} args - Arguments to create many OauthConsents.
     * @example
     * // Create many OauthConsents
     * const oauthConsent = await prisma.oauthConsent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OauthConsents and only return the `id`
     * const oauthConsentWithIdOnly = await prisma.oauthConsent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends oauthConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, oauthConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OauthConsent.
     * @param {oauthConsentDeleteArgs} args - Arguments to delete one OauthConsent.
     * @example
     * // Delete one OauthConsent
     * const OauthConsent = await prisma.oauthConsent.delete({
     *   where: {
     *     // ... filter to delete one OauthConsent
     *   }
     * })
     * 
     */
    delete<T extends oauthConsentDeleteArgs>(args: SelectSubset<T, oauthConsentDeleteArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OauthConsent.
     * @param {oauthConsentUpdateArgs} args - Arguments to update one OauthConsent.
     * @example
     * // Update one OauthConsent
     * const oauthConsent = await prisma.oauthConsent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends oauthConsentUpdateArgs>(args: SelectSubset<T, oauthConsentUpdateArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OauthConsents.
     * @param {oauthConsentDeleteManyArgs} args - Arguments to filter OauthConsents to delete.
     * @example
     * // Delete a few OauthConsents
     * const { count } = await prisma.oauthConsent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends oauthConsentDeleteManyArgs>(args?: SelectSubset<T, oauthConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthConsents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OauthConsents
     * const oauthConsent = await prisma.oauthConsent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends oauthConsentUpdateManyArgs>(args: SelectSubset<T, oauthConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OauthConsents and returns the data updated in the database.
     * @param {oauthConsentUpdateManyAndReturnArgs} args - Arguments to update many OauthConsents.
     * @example
     * // Update many OauthConsents
     * const oauthConsent = await prisma.oauthConsent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OauthConsents and only return the `id`
     * const oauthConsentWithIdOnly = await prisma.oauthConsent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends oauthConsentUpdateManyAndReturnArgs>(args: SelectSubset<T, oauthConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OauthConsent.
     * @param {oauthConsentUpsertArgs} args - Arguments to update or create a OauthConsent.
     * @example
     * // Update or create a OauthConsent
     * const oauthConsent = await prisma.oauthConsent.upsert({
     *   create: {
     *     // ... data to create a OauthConsent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OauthConsent we want to update
     *   }
     * })
     */
    upsert<T extends oauthConsentUpsertArgs>(args: SelectSubset<T, oauthConsentUpsertArgs<ExtArgs>>): Prisma__oauthConsentClient<$Result.GetResult<Prisma.$oauthConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OauthConsents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentCountArgs} args - Arguments to filter OauthConsents to count.
     * @example
     * // Count the number of OauthConsents
     * const count = await prisma.oauthConsent.count({
     *   where: {
     *     // ... the filter for the OauthConsents we want to count
     *   }
     * })
    **/
    count<T extends oauthConsentCountArgs>(
      args?: Subset<T, oauthConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OauthConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OauthConsent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OauthConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OauthConsentAggregateArgs>(args: Subset<T, OauthConsentAggregateArgs>): Prisma.PrismaPromise<GetOauthConsentAggregateType<T>>

    /**
     * Group by OauthConsent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauthConsentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends oauthConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: oauthConsentGroupByArgs['orderBy'] }
        : { orderBy?: oauthConsentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, oauthConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the oauthConsent model
   */
  readonly fields: oauthConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for oauthConsent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__oauthConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oauthApplication<T extends oauthApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, oauthApplicationDefaultArgs<ExtArgs>>): Prisma__oauthApplicationClient<$Result.GetResult<Prisma.$oauthApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the oauthConsent model
   */
  interface oauthConsentFieldRefs {
    readonly id: FieldRef<"oauthConsent", 'String'>
    readonly clientId: FieldRef<"oauthConsent", 'String'>
    readonly userId: FieldRef<"oauthConsent", 'String'>
    readonly scopes: FieldRef<"oauthConsent", 'String'>
    readonly createdAt: FieldRef<"oauthConsent", 'DateTime'>
    readonly updatedAt: FieldRef<"oauthConsent", 'DateTime'>
    readonly consentGiven: FieldRef<"oauthConsent", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * oauthConsent findUnique
   */
  export type oauthConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter, which oauthConsent to fetch.
     */
    where: oauthConsentWhereUniqueInput
  }

  /**
   * oauthConsent findUniqueOrThrow
   */
  export type oauthConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter, which oauthConsent to fetch.
     */
    where: oauthConsentWhereUniqueInput
  }

  /**
   * oauthConsent findFirst
   */
  export type oauthConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter, which oauthConsent to fetch.
     */
    where?: oauthConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthConsents to fetch.
     */
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthConsents.
     */
    cursor?: oauthConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthConsents.
     */
    distinct?: OauthConsentScalarFieldEnum | OauthConsentScalarFieldEnum[]
  }

  /**
   * oauthConsent findFirstOrThrow
   */
  export type oauthConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter, which oauthConsent to fetch.
     */
    where?: oauthConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthConsents to fetch.
     */
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauthConsents.
     */
    cursor?: oauthConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauthConsents.
     */
    distinct?: OauthConsentScalarFieldEnum | OauthConsentScalarFieldEnum[]
  }

  /**
   * oauthConsent findMany
   */
  export type oauthConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter, which oauthConsents to fetch.
     */
    where?: oauthConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauthConsents to fetch.
     */
    orderBy?: oauthConsentOrderByWithRelationInput | oauthConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing oauthConsents.
     */
    cursor?: oauthConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauthConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauthConsents.
     */
    skip?: number
    distinct?: OauthConsentScalarFieldEnum | OauthConsentScalarFieldEnum[]
  }

  /**
   * oauthConsent create
   */
  export type oauthConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a oauthConsent.
     */
    data: XOR<oauthConsentCreateInput, oauthConsentUncheckedCreateInput>
  }

  /**
   * oauthConsent createMany
   */
  export type oauthConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many oauthConsents.
     */
    data: oauthConsentCreateManyInput | oauthConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauthConsent createManyAndReturn
   */
  export type oauthConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * The data used to create many oauthConsents.
     */
    data: oauthConsentCreateManyInput | oauthConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthConsent update
   */
  export type oauthConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a oauthConsent.
     */
    data: XOR<oauthConsentUpdateInput, oauthConsentUncheckedUpdateInput>
    /**
     * Choose, which oauthConsent to update.
     */
    where: oauthConsentWhereUniqueInput
  }

  /**
   * oauthConsent updateMany
   */
  export type oauthConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update oauthConsents.
     */
    data: XOR<oauthConsentUpdateManyMutationInput, oauthConsentUncheckedUpdateManyInput>
    /**
     * Filter which oauthConsents to update
     */
    where?: oauthConsentWhereInput
    /**
     * Limit how many oauthConsents to update.
     */
    limit?: number
  }

  /**
   * oauthConsent updateManyAndReturn
   */
  export type oauthConsentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * The data used to update oauthConsents.
     */
    data: XOR<oauthConsentUpdateManyMutationInput, oauthConsentUncheckedUpdateManyInput>
    /**
     * Filter which oauthConsents to update
     */
    where?: oauthConsentWhereInput
    /**
     * Limit how many oauthConsents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauthConsent upsert
   */
  export type oauthConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the oauthConsent to update in case it exists.
     */
    where: oauthConsentWhereUniqueInput
    /**
     * In case the oauthConsent found by the `where` argument doesn't exist, create a new oauthConsent with this data.
     */
    create: XOR<oauthConsentCreateInput, oauthConsentUncheckedCreateInput>
    /**
     * In case the oauthConsent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<oauthConsentUpdateInput, oauthConsentUncheckedUpdateInput>
  }

  /**
   * oauthConsent delete
   */
  export type oauthConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
    /**
     * Filter which oauthConsent to delete.
     */
    where: oauthConsentWhereUniqueInput
  }

  /**
   * oauthConsent deleteMany
   */
  export type oauthConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauthConsents to delete
     */
    where?: oauthConsentWhereInput
    /**
     * Limit how many oauthConsents to delete.
     */
    limit?: number
  }

  /**
   * oauthConsent without action
   */
  export type oauthConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauthConsent
     */
    select?: oauthConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauthConsent
     */
    omit?: oauthConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauthConsentInclude<ExtArgs> | null
  }


  /**
   * Model organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logo: string | null
    createdAt: Date | null
    metadata: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logo: string | null
    createdAt: Date | null
    metadata: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    logo: number
    createdAt: number
    metadata: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logo?: true
    createdAt?: true
    metadata?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logo?: true
    createdAt?: true
    metadata?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logo?: true
    createdAt?: true
    metadata?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which organization to aggregate.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type organizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: organizationWhereInput
    orderBy?: organizationOrderByWithAggregationInput | organizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: organizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    logo: string | null
    createdAt: Date
    metadata: string | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends organizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type organizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logo?: boolean
    createdAt?: boolean
    metadata?: boolean
    invitation?: boolean | organization$invitationArgs<ExtArgs>
    member?: boolean | organization$memberArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type organizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logo?: boolean
    createdAt?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["organization"]>

  export type organizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logo?: boolean
    createdAt?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["organization"]>

  export type organizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    logo?: boolean
    createdAt?: boolean
    metadata?: boolean
  }

  export type organizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "logo" | "createdAt" | "metadata", ExtArgs["result"]["organization"]>
  export type organizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitation?: boolean | organization$invitationArgs<ExtArgs>
    member?: boolean | organization$memberArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type organizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type organizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $organizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "organization"
    objects: {
      invitation: Prisma.$invitationPayload<ExtArgs>[]
      member: Prisma.$memberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      logo: string | null
      createdAt: Date
      metadata: string | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type organizationGetPayload<S extends boolean | null | undefined | organizationDefaultArgs> = $Result.GetResult<Prisma.$organizationPayload, S>

  type organizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<organizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface organizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['organization'], meta: { name: 'organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {organizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends organizationFindUniqueArgs>(args: SelectSubset<T, organizationFindUniqueArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {organizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends organizationFindUniqueOrThrowArgs>(args: SelectSubset<T, organizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends organizationFindFirstArgs>(args?: SelectSubset<T, organizationFindFirstArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends organizationFindFirstOrThrowArgs>(args?: SelectSubset<T, organizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends organizationFindManyArgs>(args?: SelectSubset<T, organizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {organizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends organizationCreateArgs>(args: SelectSubset<T, organizationCreateArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {organizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends organizationCreateManyArgs>(args?: SelectSubset<T, organizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {organizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends organizationCreateManyAndReturnArgs>(args?: SelectSubset<T, organizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {organizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends organizationDeleteArgs>(args: SelectSubset<T, organizationDeleteArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {organizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends organizationUpdateArgs>(args: SelectSubset<T, organizationUpdateArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {organizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends organizationDeleteManyArgs>(args?: SelectSubset<T, organizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends organizationUpdateManyArgs>(args: SelectSubset<T, organizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {organizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends organizationUpdateManyAndReturnArgs>(args: SelectSubset<T, organizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {organizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends organizationUpsertArgs>(args: SelectSubset<T, organizationUpsertArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends organizationCountArgs>(
      args?: Subset<T, organizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends organizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: organizationGroupByArgs['orderBy'] }
        : { orderBy?: organizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, organizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the organization model
   */
  readonly fields: organizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__organizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invitation<T extends organization$invitationArgs<ExtArgs> = {}>(args?: Subset<T, organization$invitationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$invitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    member<T extends organization$memberArgs<ExtArgs> = {}>(args?: Subset<T, organization$memberArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$memberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the organization model
   */
  interface organizationFieldRefs {
    readonly id: FieldRef<"organization", 'String'>
    readonly name: FieldRef<"organization", 'String'>
    readonly slug: FieldRef<"organization", 'String'>
    readonly logo: FieldRef<"organization", 'String'>
    readonly createdAt: FieldRef<"organization", 'DateTime'>
    readonly metadata: FieldRef<"organization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * organization findUnique
   */
  export type organizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization findUniqueOrThrow
   */
  export type organizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization findFirst
   */
  export type organizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization findFirstOrThrow
   */
  export type organizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization findMany
   */
  export type organizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organizations to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization create
   */
  export type organizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The data needed to create a organization.
     */
    data: XOR<organizationCreateInput, organizationUncheckedCreateInput>
  }

  /**
   * organization createMany
   */
  export type organizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many organizations.
     */
    data: organizationCreateManyInput | organizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * organization createManyAndReturn
   */
  export type organizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * The data used to create many organizations.
     */
    data: organizationCreateManyInput | organizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * organization update
   */
  export type organizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The data needed to update a organization.
     */
    data: XOR<organizationUpdateInput, organizationUncheckedUpdateInput>
    /**
     * Choose, which organization to update.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization updateMany
   */
  export type organizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update organizations.
     */
    data: XOR<organizationUpdateManyMutationInput, organizationUncheckedUpdateManyInput>
    /**
     * Filter which organizations to update
     */
    where?: organizationWhereInput
    /**
     * Limit how many organizations to update.
     */
    limit?: number
  }

  /**
   * organization updateManyAndReturn
   */
  export type organizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * The data used to update organizations.
     */
    data: XOR<organizationUpdateManyMutationInput, organizationUncheckedUpdateManyInput>
    /**
     * Filter which organizations to update
     */
    where?: organizationWhereInput
    /**
     * Limit how many organizations to update.
     */
    limit?: number
  }

  /**
   * organization upsert
   */
  export type organizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The filter to search for the organization to update in case it exists.
     */
    where: organizationWhereUniqueInput
    /**
     * In case the organization found by the `where` argument doesn't exist, create a new organization with this data.
     */
    create: XOR<organizationCreateInput, organizationUncheckedCreateInput>
    /**
     * In case the organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<organizationUpdateInput, organizationUncheckedUpdateInput>
  }

  /**
   * organization delete
   */
  export type organizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter which organization to delete.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization deleteMany
   */
  export type organizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which organizations to delete
     */
    where?: organizationWhereInput
    /**
     * Limit how many organizations to delete.
     */
    limit?: number
  }

  /**
   * organization.invitation
   */
  export type organization$invitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the invitation
     */
    select?: invitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the invitation
     */
    omit?: invitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: invitationInclude<ExtArgs> | null
    where?: invitationWhereInput
    orderBy?: invitationOrderByWithRelationInput | invitationOrderByWithRelationInput[]
    cursor?: invitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * organization.member
   */
  export type organization$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the member
     */
    select?: memberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the member
     */
    omit?: memberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: memberInclude<ExtArgs> | null
    where?: memberWhereInput
    orderBy?: memberOrderByWithRelationInput | memberOrderByWithRelationInput[]
    cursor?: memberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * organization without action
   */
  export type organizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
  }


  /**
   * Model passkey
   */

  export type AggregatePasskey = {
    _count: PasskeyCountAggregateOutputType | null
    _avg: PasskeyAvgAggregateOutputType | null
    _sum: PasskeySumAggregateOutputType | null
    _min: PasskeyMinAggregateOutputType | null
    _max: PasskeyMaxAggregateOutputType | null
  }

  export type PasskeyAvgAggregateOutputType = {
    counter: number | null
  }

  export type PasskeySumAggregateOutputType = {
    counter: number | null
  }

  export type PasskeyMinAggregateOutputType = {
    id: string | null
    name: string | null
    publicKey: string | null
    userId: string | null
    credentialID: string | null
    counter: number | null
    deviceType: string | null
    backedUp: boolean | null
    transports: string | null
    createdAt: Date | null
    aaguid: string | null
  }

  export type PasskeyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    publicKey: string | null
    userId: string | null
    credentialID: string | null
    counter: number | null
    deviceType: string | null
    backedUp: boolean | null
    transports: string | null
    createdAt: Date | null
    aaguid: string | null
  }

  export type PasskeyCountAggregateOutputType = {
    id: number
    name: number
    publicKey: number
    userId: number
    credentialID: number
    counter: number
    deviceType: number
    backedUp: number
    transports: number
    createdAt: number
    aaguid: number
    _all: number
  }


  export type PasskeyAvgAggregateInputType = {
    counter?: true
  }

  export type PasskeySumAggregateInputType = {
    counter?: true
  }

  export type PasskeyMinAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    createdAt?: true
    aaguid?: true
  }

  export type PasskeyMaxAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    createdAt?: true
    aaguid?: true
  }

  export type PasskeyCountAggregateInputType = {
    id?: true
    name?: true
    publicKey?: true
    userId?: true
    credentialID?: true
    counter?: true
    deviceType?: true
    backedUp?: true
    transports?: true
    createdAt?: true
    aaguid?: true
    _all?: true
  }

  export type PasskeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which passkey to aggregate.
     */
    where?: passkeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of passkeys to fetch.
     */
    orderBy?: passkeyOrderByWithRelationInput | passkeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: passkeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned passkeys
    **/
    _count?: true | PasskeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PasskeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PasskeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasskeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasskeyMaxAggregateInputType
  }

  export type GetPasskeyAggregateType<T extends PasskeyAggregateArgs> = {
        [P in keyof T & keyof AggregatePasskey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasskey[P]>
      : GetScalarType<T[P], AggregatePasskey[P]>
  }




  export type passkeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: passkeyWhereInput
    orderBy?: passkeyOrderByWithAggregationInput | passkeyOrderByWithAggregationInput[]
    by: PasskeyScalarFieldEnum[] | PasskeyScalarFieldEnum
    having?: passkeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasskeyCountAggregateInputType | true
    _avg?: PasskeyAvgAggregateInputType
    _sum?: PasskeySumAggregateInputType
    _min?: PasskeyMinAggregateInputType
    _max?: PasskeyMaxAggregateInputType
  }

  export type PasskeyGroupByOutputType = {
    id: string
    name: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports: string | null
    createdAt: Date | null
    aaguid: string | null
    _count: PasskeyCountAggregateOutputType | null
    _avg: PasskeyAvgAggregateOutputType | null
    _sum: PasskeySumAggregateOutputType | null
    _min: PasskeyMinAggregateOutputType | null
    _max: PasskeyMaxAggregateOutputType | null
  }

  type GetPasskeyGroupByPayload<T extends passkeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasskeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasskeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasskeyGroupByOutputType[P]>
            : GetScalarType<T[P], PasskeyGroupByOutputType[P]>
        }
      >
    >


  export type passkeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    createdAt?: boolean
    aaguid?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passkey"]>

  export type passkeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    createdAt?: boolean
    aaguid?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passkey"]>

  export type passkeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    createdAt?: boolean
    aaguid?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passkey"]>

  export type passkeySelectScalar = {
    id?: boolean
    name?: boolean
    publicKey?: boolean
    userId?: boolean
    credentialID?: boolean
    counter?: boolean
    deviceType?: boolean
    backedUp?: boolean
    transports?: boolean
    createdAt?: boolean
    aaguid?: boolean
  }

  export type passkeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "publicKey" | "userId" | "credentialID" | "counter" | "deviceType" | "backedUp" | "transports" | "createdAt" | "aaguid", ExtArgs["result"]["passkey"]>
  export type passkeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type passkeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type passkeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $passkeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "passkey"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      publicKey: string
      userId: string
      credentialID: string
      counter: number
      deviceType: string
      backedUp: boolean
      transports: string | null
      createdAt: Date | null
      aaguid: string | null
    }, ExtArgs["result"]["passkey"]>
    composites: {}
  }

  type passkeyGetPayload<S extends boolean | null | undefined | passkeyDefaultArgs> = $Result.GetResult<Prisma.$passkeyPayload, S>

  type passkeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<passkeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasskeyCountAggregateInputType | true
    }

  export interface passkeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['passkey'], meta: { name: 'passkey' } }
    /**
     * Find zero or one Passkey that matches the filter.
     * @param {passkeyFindUniqueArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends passkeyFindUniqueArgs>(args: SelectSubset<T, passkeyFindUniqueArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Passkey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {passkeyFindUniqueOrThrowArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends passkeyFindUniqueOrThrowArgs>(args: SelectSubset<T, passkeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passkey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyFindFirstArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends passkeyFindFirstArgs>(args?: SelectSubset<T, passkeyFindFirstArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passkey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyFindFirstOrThrowArgs} args - Arguments to find a Passkey
     * @example
     * // Get one Passkey
     * const passkey = await prisma.passkey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends passkeyFindFirstOrThrowArgs>(args?: SelectSubset<T, passkeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Passkeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passkeys
     * const passkeys = await prisma.passkey.findMany()
     * 
     * // Get first 10 Passkeys
     * const passkeys = await prisma.passkey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passkeyWithIdOnly = await prisma.passkey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends passkeyFindManyArgs>(args?: SelectSubset<T, passkeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Passkey.
     * @param {passkeyCreateArgs} args - Arguments to create a Passkey.
     * @example
     * // Create one Passkey
     * const Passkey = await prisma.passkey.create({
     *   data: {
     *     // ... data to create a Passkey
     *   }
     * })
     * 
     */
    create<T extends passkeyCreateArgs>(args: SelectSubset<T, passkeyCreateArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Passkeys.
     * @param {passkeyCreateManyArgs} args - Arguments to create many Passkeys.
     * @example
     * // Create many Passkeys
     * const passkey = await prisma.passkey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends passkeyCreateManyArgs>(args?: SelectSubset<T, passkeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Passkeys and returns the data saved in the database.
     * @param {passkeyCreateManyAndReturnArgs} args - Arguments to create many Passkeys.
     * @example
     * // Create many Passkeys
     * const passkey = await prisma.passkey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Passkeys and only return the `id`
     * const passkeyWithIdOnly = await prisma.passkey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends passkeyCreateManyAndReturnArgs>(args?: SelectSubset<T, passkeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Passkey.
     * @param {passkeyDeleteArgs} args - Arguments to delete one Passkey.
     * @example
     * // Delete one Passkey
     * const Passkey = await prisma.passkey.delete({
     *   where: {
     *     // ... filter to delete one Passkey
     *   }
     * })
     * 
     */
    delete<T extends passkeyDeleteArgs>(args: SelectSubset<T, passkeyDeleteArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Passkey.
     * @param {passkeyUpdateArgs} args - Arguments to update one Passkey.
     * @example
     * // Update one Passkey
     * const passkey = await prisma.passkey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends passkeyUpdateArgs>(args: SelectSubset<T, passkeyUpdateArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Passkeys.
     * @param {passkeyDeleteManyArgs} args - Arguments to filter Passkeys to delete.
     * @example
     * // Delete a few Passkeys
     * const { count } = await prisma.passkey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends passkeyDeleteManyArgs>(args?: SelectSubset<T, passkeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passkeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passkeys
     * const passkey = await prisma.passkey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends passkeyUpdateManyArgs>(args: SelectSubset<T, passkeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passkeys and returns the data updated in the database.
     * @param {passkeyUpdateManyAndReturnArgs} args - Arguments to update many Passkeys.
     * @example
     * // Update many Passkeys
     * const passkey = await prisma.passkey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Passkeys and only return the `id`
     * const passkeyWithIdOnly = await prisma.passkey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends passkeyUpdateManyAndReturnArgs>(args: SelectSubset<T, passkeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Passkey.
     * @param {passkeyUpsertArgs} args - Arguments to update or create a Passkey.
     * @example
     * // Update or create a Passkey
     * const passkey = await prisma.passkey.upsert({
     *   create: {
     *     // ... data to create a Passkey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Passkey we want to update
     *   }
     * })
     */
    upsert<T extends passkeyUpsertArgs>(args: SelectSubset<T, passkeyUpsertArgs<ExtArgs>>): Prisma__passkeyClient<$Result.GetResult<Prisma.$passkeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Passkeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyCountArgs} args - Arguments to filter Passkeys to count.
     * @example
     * // Count the number of Passkeys
     * const count = await prisma.passkey.count({
     *   where: {
     *     // ... the filter for the Passkeys we want to count
     *   }
     * })
    **/
    count<T extends passkeyCountArgs>(
      args?: Subset<T, passkeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasskeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Passkey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasskeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasskeyAggregateArgs>(args: Subset<T, PasskeyAggregateArgs>): Prisma.PrismaPromise<GetPasskeyAggregateType<T>>

    /**
     * Group by Passkey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {passkeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends passkeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: passkeyGroupByArgs['orderBy'] }
        : { orderBy?: passkeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, passkeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasskeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the passkey model
   */
  readonly fields: passkeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for passkey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__passkeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the passkey model
   */
  interface passkeyFieldRefs {
    readonly id: FieldRef<"passkey", 'String'>
    readonly name: FieldRef<"passkey", 'String'>
    readonly publicKey: FieldRef<"passkey", 'String'>
    readonly userId: FieldRef<"passkey", 'String'>
    readonly credentialID: FieldRef<"passkey", 'String'>
    readonly counter: FieldRef<"passkey", 'Int'>
    readonly deviceType: FieldRef<"passkey", 'String'>
    readonly backedUp: FieldRef<"passkey", 'Boolean'>
    readonly transports: FieldRef<"passkey", 'String'>
    readonly createdAt: FieldRef<"passkey", 'DateTime'>
    readonly aaguid: FieldRef<"passkey", 'String'>
  }
    

  // Custom InputTypes
  /**
   * passkey findUnique
   */
  export type passkeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter, which passkey to fetch.
     */
    where: passkeyWhereUniqueInput
  }

  /**
   * passkey findUniqueOrThrow
   */
  export type passkeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter, which passkey to fetch.
     */
    where: passkeyWhereUniqueInput
  }

  /**
   * passkey findFirst
   */
  export type passkeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter, which passkey to fetch.
     */
    where?: passkeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of passkeys to fetch.
     */
    orderBy?: passkeyOrderByWithRelationInput | passkeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for passkeys.
     */
    cursor?: passkeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of passkeys.
     */
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * passkey findFirstOrThrow
   */
  export type passkeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter, which passkey to fetch.
     */
    where?: passkeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of passkeys to fetch.
     */
    orderBy?: passkeyOrderByWithRelationInput | passkeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for passkeys.
     */
    cursor?: passkeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` passkeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of passkeys.
     */
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * passkey findMany
   */
  export type passkeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter, which passkeys to fetch.
     */
    where?: passkeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of passkeys to fetch.
     */
    orderBy?: passkeyOrderByWithRelationInput | passkeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing passkeys.
     */
    cursor?: passkeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` passkeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` passkeys.
     */
    skip?: number
    distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
  }

  /**
   * passkey create
   */
  export type passkeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * The data needed to create a passkey.
     */
    data: XOR<passkeyCreateInput, passkeyUncheckedCreateInput>
  }

  /**
   * passkey createMany
   */
  export type passkeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many passkeys.
     */
    data: passkeyCreateManyInput | passkeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * passkey createManyAndReturn
   */
  export type passkeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * The data used to create many passkeys.
     */
    data: passkeyCreateManyInput | passkeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * passkey update
   */
  export type passkeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * The data needed to update a passkey.
     */
    data: XOR<passkeyUpdateInput, passkeyUncheckedUpdateInput>
    /**
     * Choose, which passkey to update.
     */
    where: passkeyWhereUniqueInput
  }

  /**
   * passkey updateMany
   */
  export type passkeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update passkeys.
     */
    data: XOR<passkeyUpdateManyMutationInput, passkeyUncheckedUpdateManyInput>
    /**
     * Filter which passkeys to update
     */
    where?: passkeyWhereInput
    /**
     * Limit how many passkeys to update.
     */
    limit?: number
  }

  /**
   * passkey updateManyAndReturn
   */
  export type passkeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * The data used to update passkeys.
     */
    data: XOR<passkeyUpdateManyMutationInput, passkeyUncheckedUpdateManyInput>
    /**
     * Filter which passkeys to update
     */
    where?: passkeyWhereInput
    /**
     * Limit how many passkeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * passkey upsert
   */
  export type passkeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * The filter to search for the passkey to update in case it exists.
     */
    where: passkeyWhereUniqueInput
    /**
     * In case the passkey found by the `where` argument doesn't exist, create a new passkey with this data.
     */
    create: XOR<passkeyCreateInput, passkeyUncheckedCreateInput>
    /**
     * In case the passkey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<passkeyUpdateInput, passkeyUncheckedUpdateInput>
  }

  /**
   * passkey delete
   */
  export type passkeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
    /**
     * Filter which passkey to delete.
     */
    where: passkeyWhereUniqueInput
  }

  /**
   * passkey deleteMany
   */
  export type passkeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which passkeys to delete
     */
    where?: passkeyWhereInput
    /**
     * Limit how many passkeys to delete.
     */
    limit?: number
  }

  /**
   * passkey without action
   */
  export type passkeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the passkey
     */
    select?: passkeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the passkey
     */
    omit?: passkeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: passkeyInclude<ExtArgs> | null
  }


  /**
   * Model twoFactor
   */

  export type AggregateTwoFactor = {
    _count: TwoFactorCountAggregateOutputType | null
    _min: TwoFactorMinAggregateOutputType | null
    _max: TwoFactorMaxAggregateOutputType | null
  }

  export type TwoFactorMinAggregateOutputType = {
    id: string | null
    secret: string | null
    backupCodes: string | null
    userId: string | null
  }

  export type TwoFactorMaxAggregateOutputType = {
    id: string | null
    secret: string | null
    backupCodes: string | null
    userId: string | null
  }

  export type TwoFactorCountAggregateOutputType = {
    id: number
    secret: number
    backupCodes: number
    userId: number
    _all: number
  }


  export type TwoFactorMinAggregateInputType = {
    id?: true
    secret?: true
    backupCodes?: true
    userId?: true
  }

  export type TwoFactorMaxAggregateInputType = {
    id?: true
    secret?: true
    backupCodes?: true
    userId?: true
  }

  export type TwoFactorCountAggregateInputType = {
    id?: true
    secret?: true
    backupCodes?: true
    userId?: true
    _all?: true
  }

  export type TwoFactorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twoFactor to aggregate.
     */
    where?: twoFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twoFactors to fetch.
     */
    orderBy?: twoFactorOrderByWithRelationInput | twoFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: twoFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twoFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twoFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned twoFactors
    **/
    _count?: true | TwoFactorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwoFactorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwoFactorMaxAggregateInputType
  }

  export type GetTwoFactorAggregateType<T extends TwoFactorAggregateArgs> = {
        [P in keyof T & keyof AggregateTwoFactor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwoFactor[P]>
      : GetScalarType<T[P], AggregateTwoFactor[P]>
  }




  export type twoFactorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: twoFactorWhereInput
    orderBy?: twoFactorOrderByWithAggregationInput | twoFactorOrderByWithAggregationInput[]
    by: TwoFactorScalarFieldEnum[] | TwoFactorScalarFieldEnum
    having?: twoFactorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwoFactorCountAggregateInputType | true
    _min?: TwoFactorMinAggregateInputType
    _max?: TwoFactorMaxAggregateInputType
  }

  export type TwoFactorGroupByOutputType = {
    id: string
    secret: string
    backupCodes: string
    userId: string
    _count: TwoFactorCountAggregateOutputType | null
    _min: TwoFactorMinAggregateOutputType | null
    _max: TwoFactorMaxAggregateOutputType | null
  }

  type GetTwoFactorGroupByPayload<T extends twoFactorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TwoFactorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwoFactorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwoFactorGroupByOutputType[P]>
            : GetScalarType<T[P], TwoFactorGroupByOutputType[P]>
        }
      >
    >


  export type twoFactorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
    backupCodes?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactor"]>

  export type twoFactorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
    backupCodes?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactor"]>

  export type twoFactorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    secret?: boolean
    backupCodes?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["twoFactor"]>

  export type twoFactorSelectScalar = {
    id?: boolean
    secret?: boolean
    backupCodes?: boolean
    userId?: boolean
  }

  export type twoFactorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "secret" | "backupCodes" | "userId", ExtArgs["result"]["twoFactor"]>
  export type twoFactorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type twoFactorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type twoFactorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $twoFactorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "twoFactor"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      secret: string
      backupCodes: string
      userId: string
    }, ExtArgs["result"]["twoFactor"]>
    composites: {}
  }

  type twoFactorGetPayload<S extends boolean | null | undefined | twoFactorDefaultArgs> = $Result.GetResult<Prisma.$twoFactorPayload, S>

  type twoFactorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<twoFactorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TwoFactorCountAggregateInputType | true
    }

  export interface twoFactorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['twoFactor'], meta: { name: 'twoFactor' } }
    /**
     * Find zero or one TwoFactor that matches the filter.
     * @param {twoFactorFindUniqueArgs} args - Arguments to find a TwoFactor
     * @example
     * // Get one TwoFactor
     * const twoFactor = await prisma.twoFactor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends twoFactorFindUniqueArgs>(args: SelectSubset<T, twoFactorFindUniqueArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TwoFactor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {twoFactorFindUniqueOrThrowArgs} args - Arguments to find a TwoFactor
     * @example
     * // Get one TwoFactor
     * const twoFactor = await prisma.twoFactor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends twoFactorFindUniqueOrThrowArgs>(args: SelectSubset<T, twoFactorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorFindFirstArgs} args - Arguments to find a TwoFactor
     * @example
     * // Get one TwoFactor
     * const twoFactor = await prisma.twoFactor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends twoFactorFindFirstArgs>(args?: SelectSubset<T, twoFactorFindFirstArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwoFactor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorFindFirstOrThrowArgs} args - Arguments to find a TwoFactor
     * @example
     * // Get one TwoFactor
     * const twoFactor = await prisma.twoFactor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends twoFactorFindFirstOrThrowArgs>(args?: SelectSubset<T, twoFactorFindFirstOrThrowArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TwoFactors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwoFactors
     * const twoFactors = await prisma.twoFactor.findMany()
     * 
     * // Get first 10 TwoFactors
     * const twoFactors = await prisma.twoFactor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twoFactorWithIdOnly = await prisma.twoFactor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends twoFactorFindManyArgs>(args?: SelectSubset<T, twoFactorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TwoFactor.
     * @param {twoFactorCreateArgs} args - Arguments to create a TwoFactor.
     * @example
     * // Create one TwoFactor
     * const TwoFactor = await prisma.twoFactor.create({
     *   data: {
     *     // ... data to create a TwoFactor
     *   }
     * })
     * 
     */
    create<T extends twoFactorCreateArgs>(args: SelectSubset<T, twoFactorCreateArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TwoFactors.
     * @param {twoFactorCreateManyArgs} args - Arguments to create many TwoFactors.
     * @example
     * // Create many TwoFactors
     * const twoFactor = await prisma.twoFactor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends twoFactorCreateManyArgs>(args?: SelectSubset<T, twoFactorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TwoFactors and returns the data saved in the database.
     * @param {twoFactorCreateManyAndReturnArgs} args - Arguments to create many TwoFactors.
     * @example
     * // Create many TwoFactors
     * const twoFactor = await prisma.twoFactor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TwoFactors and only return the `id`
     * const twoFactorWithIdOnly = await prisma.twoFactor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends twoFactorCreateManyAndReturnArgs>(args?: SelectSubset<T, twoFactorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TwoFactor.
     * @param {twoFactorDeleteArgs} args - Arguments to delete one TwoFactor.
     * @example
     * // Delete one TwoFactor
     * const TwoFactor = await prisma.twoFactor.delete({
     *   where: {
     *     // ... filter to delete one TwoFactor
     *   }
     * })
     * 
     */
    delete<T extends twoFactorDeleteArgs>(args: SelectSubset<T, twoFactorDeleteArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TwoFactor.
     * @param {twoFactorUpdateArgs} args - Arguments to update one TwoFactor.
     * @example
     * // Update one TwoFactor
     * const twoFactor = await prisma.twoFactor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends twoFactorUpdateArgs>(args: SelectSubset<T, twoFactorUpdateArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TwoFactors.
     * @param {twoFactorDeleteManyArgs} args - Arguments to filter TwoFactors to delete.
     * @example
     * // Delete a few TwoFactors
     * const { count } = await prisma.twoFactor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends twoFactorDeleteManyArgs>(args?: SelectSubset<T, twoFactorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwoFactors
     * const twoFactor = await prisma.twoFactor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends twoFactorUpdateManyArgs>(args: SelectSubset<T, twoFactorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwoFactors and returns the data updated in the database.
     * @param {twoFactorUpdateManyAndReturnArgs} args - Arguments to update many TwoFactors.
     * @example
     * // Update many TwoFactors
     * const twoFactor = await prisma.twoFactor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TwoFactors and only return the `id`
     * const twoFactorWithIdOnly = await prisma.twoFactor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends twoFactorUpdateManyAndReturnArgs>(args: SelectSubset<T, twoFactorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TwoFactor.
     * @param {twoFactorUpsertArgs} args - Arguments to update or create a TwoFactor.
     * @example
     * // Update or create a TwoFactor
     * const twoFactor = await prisma.twoFactor.upsert({
     *   create: {
     *     // ... data to create a TwoFactor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwoFactor we want to update
     *   }
     * })
     */
    upsert<T extends twoFactorUpsertArgs>(args: SelectSubset<T, twoFactorUpsertArgs<ExtArgs>>): Prisma__twoFactorClient<$Result.GetResult<Prisma.$twoFactorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TwoFactors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorCountArgs} args - Arguments to filter TwoFactors to count.
     * @example
     * // Count the number of TwoFactors
     * const count = await prisma.twoFactor.count({
     *   where: {
     *     // ... the filter for the TwoFactors we want to count
     *   }
     * })
    **/
    count<T extends twoFactorCountArgs>(
      args?: Subset<T, twoFactorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwoFactorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwoFactor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwoFactorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TwoFactorAggregateArgs>(args: Subset<T, TwoFactorAggregateArgs>): Prisma.PrismaPromise<GetTwoFactorAggregateType<T>>

    /**
     * Group by TwoFactor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {twoFactorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends twoFactorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: twoFactorGroupByArgs['orderBy'] }
        : { orderBy?: twoFactorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, twoFactorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwoFactorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the twoFactor model
   */
  readonly fields: twoFactorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for twoFactor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__twoFactorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the twoFactor model
   */
  interface twoFactorFieldRefs {
    readonly id: FieldRef<"twoFactor", 'String'>
    readonly secret: FieldRef<"twoFactor", 'String'>
    readonly backupCodes: FieldRef<"twoFactor", 'String'>
    readonly userId: FieldRef<"twoFactor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * twoFactor findUnique
   */
  export type twoFactorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter, which twoFactor to fetch.
     */
    where: twoFactorWhereUniqueInput
  }

  /**
   * twoFactor findUniqueOrThrow
   */
  export type twoFactorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter, which twoFactor to fetch.
     */
    where: twoFactorWhereUniqueInput
  }

  /**
   * twoFactor findFirst
   */
  export type twoFactorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter, which twoFactor to fetch.
     */
    where?: twoFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twoFactors to fetch.
     */
    orderBy?: twoFactorOrderByWithRelationInput | twoFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twoFactors.
     */
    cursor?: twoFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twoFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twoFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twoFactors.
     */
    distinct?: TwoFactorScalarFieldEnum | TwoFactorScalarFieldEnum[]
  }

  /**
   * twoFactor findFirstOrThrow
   */
  export type twoFactorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter, which twoFactor to fetch.
     */
    where?: twoFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twoFactors to fetch.
     */
    orderBy?: twoFactorOrderByWithRelationInput | twoFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for twoFactors.
     */
    cursor?: twoFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twoFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twoFactors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of twoFactors.
     */
    distinct?: TwoFactorScalarFieldEnum | TwoFactorScalarFieldEnum[]
  }

  /**
   * twoFactor findMany
   */
  export type twoFactorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter, which twoFactors to fetch.
     */
    where?: twoFactorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of twoFactors to fetch.
     */
    orderBy?: twoFactorOrderByWithRelationInput | twoFactorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing twoFactors.
     */
    cursor?: twoFactorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` twoFactors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` twoFactors.
     */
    skip?: number
    distinct?: TwoFactorScalarFieldEnum | TwoFactorScalarFieldEnum[]
  }

  /**
   * twoFactor create
   */
  export type twoFactorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * The data needed to create a twoFactor.
     */
    data: XOR<twoFactorCreateInput, twoFactorUncheckedCreateInput>
  }

  /**
   * twoFactor createMany
   */
  export type twoFactorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many twoFactors.
     */
    data: twoFactorCreateManyInput | twoFactorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * twoFactor createManyAndReturn
   */
  export type twoFactorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * The data used to create many twoFactors.
     */
    data: twoFactorCreateManyInput | twoFactorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * twoFactor update
   */
  export type twoFactorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * The data needed to update a twoFactor.
     */
    data: XOR<twoFactorUpdateInput, twoFactorUncheckedUpdateInput>
    /**
     * Choose, which twoFactor to update.
     */
    where: twoFactorWhereUniqueInput
  }

  /**
   * twoFactor updateMany
   */
  export type twoFactorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update twoFactors.
     */
    data: XOR<twoFactorUpdateManyMutationInput, twoFactorUncheckedUpdateManyInput>
    /**
     * Filter which twoFactors to update
     */
    where?: twoFactorWhereInput
    /**
     * Limit how many twoFactors to update.
     */
    limit?: number
  }

  /**
   * twoFactor updateManyAndReturn
   */
  export type twoFactorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * The data used to update twoFactors.
     */
    data: XOR<twoFactorUpdateManyMutationInput, twoFactorUncheckedUpdateManyInput>
    /**
     * Filter which twoFactors to update
     */
    where?: twoFactorWhereInput
    /**
     * Limit how many twoFactors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * twoFactor upsert
   */
  export type twoFactorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * The filter to search for the twoFactor to update in case it exists.
     */
    where: twoFactorWhereUniqueInput
    /**
     * In case the twoFactor found by the `where` argument doesn't exist, create a new twoFactor with this data.
     */
    create: XOR<twoFactorCreateInput, twoFactorUncheckedCreateInput>
    /**
     * In case the twoFactor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<twoFactorUpdateInput, twoFactorUncheckedUpdateInput>
  }

  /**
   * twoFactor delete
   */
  export type twoFactorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
    /**
     * Filter which twoFactor to delete.
     */
    where: twoFactorWhereUniqueInput
  }

  /**
   * twoFactor deleteMany
   */
  export type twoFactorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which twoFactors to delete
     */
    where?: twoFactorWhereInput
    /**
     * Limit how many twoFactors to delete.
     */
    limit?: number
  }

  /**
   * twoFactor without action
   */
  export type twoFactorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the twoFactor
     */
    select?: twoFactorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the twoFactor
     */
    omit?: twoFactorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: twoFactorInclude<ExtArgs> | null
  }


  /**
   * Model deviceCode
   */

  export type AggregateDeviceCode = {
    _count: DeviceCodeCountAggregateOutputType | null
    _avg: DeviceCodeAvgAggregateOutputType | null
    _sum: DeviceCodeSumAggregateOutputType | null
    _min: DeviceCodeMinAggregateOutputType | null
    _max: DeviceCodeMaxAggregateOutputType | null
  }

  export type DeviceCodeAvgAggregateOutputType = {
    pollingInterval: number | null
  }

  export type DeviceCodeSumAggregateOutputType = {
    pollingInterval: number | null
  }

  export type DeviceCodeMinAggregateOutputType = {
    id: string | null
    deviceCode: string | null
    userCode: string | null
    userId: string | null
    expiresAt: Date | null
    status: string | null
    lastPolledAt: Date | null
    pollingInterval: number | null
    clientId: string | null
    scope: string | null
  }

  export type DeviceCodeMaxAggregateOutputType = {
    id: string | null
    deviceCode: string | null
    userCode: string | null
    userId: string | null
    expiresAt: Date | null
    status: string | null
    lastPolledAt: Date | null
    pollingInterval: number | null
    clientId: string | null
    scope: string | null
  }

  export type DeviceCodeCountAggregateOutputType = {
    id: number
    deviceCode: number
    userCode: number
    userId: number
    expiresAt: number
    status: number
    lastPolledAt: number
    pollingInterval: number
    clientId: number
    scope: number
    _all: number
  }


  export type DeviceCodeAvgAggregateInputType = {
    pollingInterval?: true
  }

  export type DeviceCodeSumAggregateInputType = {
    pollingInterval?: true
  }

  export type DeviceCodeMinAggregateInputType = {
    id?: true
    deviceCode?: true
    userCode?: true
    userId?: true
    expiresAt?: true
    status?: true
    lastPolledAt?: true
    pollingInterval?: true
    clientId?: true
    scope?: true
  }

  export type DeviceCodeMaxAggregateInputType = {
    id?: true
    deviceCode?: true
    userCode?: true
    userId?: true
    expiresAt?: true
    status?: true
    lastPolledAt?: true
    pollingInterval?: true
    clientId?: true
    scope?: true
  }

  export type DeviceCodeCountAggregateInputType = {
    id?: true
    deviceCode?: true
    userCode?: true
    userId?: true
    expiresAt?: true
    status?: true
    lastPolledAt?: true
    pollingInterval?: true
    clientId?: true
    scope?: true
    _all?: true
  }

  export type DeviceCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which deviceCode to aggregate.
     */
    where?: deviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of deviceCodes to fetch.
     */
    orderBy?: deviceCodeOrderByWithRelationInput | deviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: deviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` deviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` deviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned deviceCodes
    **/
    _count?: true | DeviceCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceCodeMaxAggregateInputType
  }

  export type GetDeviceCodeAggregateType<T extends DeviceCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceCode[P]>
      : GetScalarType<T[P], AggregateDeviceCode[P]>
  }




  export type deviceCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: deviceCodeWhereInput
    orderBy?: deviceCodeOrderByWithAggregationInput | deviceCodeOrderByWithAggregationInput[]
    by: DeviceCodeScalarFieldEnum[] | DeviceCodeScalarFieldEnum
    having?: deviceCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCodeCountAggregateInputType | true
    _avg?: DeviceCodeAvgAggregateInputType
    _sum?: DeviceCodeSumAggregateInputType
    _min?: DeviceCodeMinAggregateInputType
    _max?: DeviceCodeMaxAggregateInputType
  }

  export type DeviceCodeGroupByOutputType = {
    id: string
    deviceCode: string
    userCode: string
    userId: string | null
    expiresAt: Date
    status: string
    lastPolledAt: Date | null
    pollingInterval: number | null
    clientId: string | null
    scope: string | null
    _count: DeviceCodeCountAggregateOutputType | null
    _avg: DeviceCodeAvgAggregateOutputType | null
    _sum: DeviceCodeSumAggregateOutputType | null
    _min: DeviceCodeMinAggregateOutputType | null
    _max: DeviceCodeMaxAggregateOutputType | null
  }

  type GetDeviceCodeGroupByPayload<T extends deviceCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceCodeGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceCodeGroupByOutputType[P]>
        }
      >
    >


  export type deviceCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceCode?: boolean
    userCode?: boolean
    userId?: boolean
    expiresAt?: boolean
    status?: boolean
    lastPolledAt?: boolean
    pollingInterval?: boolean
    clientId?: boolean
    scope?: boolean
  }, ExtArgs["result"]["deviceCode"]>

  export type deviceCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceCode?: boolean
    userCode?: boolean
    userId?: boolean
    expiresAt?: boolean
    status?: boolean
    lastPolledAt?: boolean
    pollingInterval?: boolean
    clientId?: boolean
    scope?: boolean
  }, ExtArgs["result"]["deviceCode"]>

  export type deviceCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceCode?: boolean
    userCode?: boolean
    userId?: boolean
    expiresAt?: boolean
    status?: boolean
    lastPolledAt?: boolean
    pollingInterval?: boolean
    clientId?: boolean
    scope?: boolean
  }, ExtArgs["result"]["deviceCode"]>

  export type deviceCodeSelectScalar = {
    id?: boolean
    deviceCode?: boolean
    userCode?: boolean
    userId?: boolean
    expiresAt?: boolean
    status?: boolean
    lastPolledAt?: boolean
    pollingInterval?: boolean
    clientId?: boolean
    scope?: boolean
  }

  export type deviceCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceCode" | "userCode" | "userId" | "expiresAt" | "status" | "lastPolledAt" | "pollingInterval" | "clientId" | "scope", ExtArgs["result"]["deviceCode"]>

  export type $deviceCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "deviceCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceCode: string
      userCode: string
      userId: string | null
      expiresAt: Date
      status: string
      lastPolledAt: Date | null
      pollingInterval: number | null
      clientId: string | null
      scope: string | null
    }, ExtArgs["result"]["deviceCode"]>
    composites: {}
  }

  type deviceCodeGetPayload<S extends boolean | null | undefined | deviceCodeDefaultArgs> = $Result.GetResult<Prisma.$deviceCodePayload, S>

  type deviceCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<deviceCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCodeCountAggregateInputType | true
    }

  export interface deviceCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['deviceCode'], meta: { name: 'deviceCode' } }
    /**
     * Find zero or one DeviceCode that matches the filter.
     * @param {deviceCodeFindUniqueArgs} args - Arguments to find a DeviceCode
     * @example
     * // Get one DeviceCode
     * const deviceCode = await prisma.deviceCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends deviceCodeFindUniqueArgs>(args: SelectSubset<T, deviceCodeFindUniqueArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeviceCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {deviceCodeFindUniqueOrThrowArgs} args - Arguments to find a DeviceCode
     * @example
     * // Get one DeviceCode
     * const deviceCode = await prisma.deviceCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends deviceCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, deviceCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeFindFirstArgs} args - Arguments to find a DeviceCode
     * @example
     * // Get one DeviceCode
     * const deviceCode = await prisma.deviceCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends deviceCodeFindFirstArgs>(args?: SelectSubset<T, deviceCodeFindFirstArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeFindFirstOrThrowArgs} args - Arguments to find a DeviceCode
     * @example
     * // Get one DeviceCode
     * const deviceCode = await prisma.deviceCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends deviceCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, deviceCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeviceCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceCodes
     * const deviceCodes = await prisma.deviceCode.findMany()
     * 
     * // Get first 10 DeviceCodes
     * const deviceCodes = await prisma.deviceCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceCodeWithIdOnly = await prisma.deviceCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends deviceCodeFindManyArgs>(args?: SelectSubset<T, deviceCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeviceCode.
     * @param {deviceCodeCreateArgs} args - Arguments to create a DeviceCode.
     * @example
     * // Create one DeviceCode
     * const DeviceCode = await prisma.deviceCode.create({
     *   data: {
     *     // ... data to create a DeviceCode
     *   }
     * })
     * 
     */
    create<T extends deviceCodeCreateArgs>(args: SelectSubset<T, deviceCodeCreateArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeviceCodes.
     * @param {deviceCodeCreateManyArgs} args - Arguments to create many DeviceCodes.
     * @example
     * // Create many DeviceCodes
     * const deviceCode = await prisma.deviceCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends deviceCodeCreateManyArgs>(args?: SelectSubset<T, deviceCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeviceCodes and returns the data saved in the database.
     * @param {deviceCodeCreateManyAndReturnArgs} args - Arguments to create many DeviceCodes.
     * @example
     * // Create many DeviceCodes
     * const deviceCode = await prisma.deviceCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeviceCodes and only return the `id`
     * const deviceCodeWithIdOnly = await prisma.deviceCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends deviceCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, deviceCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeviceCode.
     * @param {deviceCodeDeleteArgs} args - Arguments to delete one DeviceCode.
     * @example
     * // Delete one DeviceCode
     * const DeviceCode = await prisma.deviceCode.delete({
     *   where: {
     *     // ... filter to delete one DeviceCode
     *   }
     * })
     * 
     */
    delete<T extends deviceCodeDeleteArgs>(args: SelectSubset<T, deviceCodeDeleteArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeviceCode.
     * @param {deviceCodeUpdateArgs} args - Arguments to update one DeviceCode.
     * @example
     * // Update one DeviceCode
     * const deviceCode = await prisma.deviceCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends deviceCodeUpdateArgs>(args: SelectSubset<T, deviceCodeUpdateArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeviceCodes.
     * @param {deviceCodeDeleteManyArgs} args - Arguments to filter DeviceCodes to delete.
     * @example
     * // Delete a few DeviceCodes
     * const { count } = await prisma.deviceCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends deviceCodeDeleteManyArgs>(args?: SelectSubset<T, deviceCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceCodes
     * const deviceCode = await prisma.deviceCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends deviceCodeUpdateManyArgs>(args: SelectSubset<T, deviceCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceCodes and returns the data updated in the database.
     * @param {deviceCodeUpdateManyAndReturnArgs} args - Arguments to update many DeviceCodes.
     * @example
     * // Update many DeviceCodes
     * const deviceCode = await prisma.deviceCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeviceCodes and only return the `id`
     * const deviceCodeWithIdOnly = await prisma.deviceCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends deviceCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, deviceCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeviceCode.
     * @param {deviceCodeUpsertArgs} args - Arguments to update or create a DeviceCode.
     * @example
     * // Update or create a DeviceCode
     * const deviceCode = await prisma.deviceCode.upsert({
     *   create: {
     *     // ... data to create a DeviceCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceCode we want to update
     *   }
     * })
     */
    upsert<T extends deviceCodeUpsertArgs>(args: SelectSubset<T, deviceCodeUpsertArgs<ExtArgs>>): Prisma__deviceCodeClient<$Result.GetResult<Prisma.$deviceCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeviceCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeCountArgs} args - Arguments to filter DeviceCodes to count.
     * @example
     * // Count the number of DeviceCodes
     * const count = await prisma.deviceCode.count({
     *   where: {
     *     // ... the filter for the DeviceCodes we want to count
     *   }
     * })
    **/
    count<T extends deviceCodeCountArgs>(
      args?: Subset<T, deviceCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceCodeAggregateArgs>(args: Subset<T, DeviceCodeAggregateArgs>): Prisma.PrismaPromise<GetDeviceCodeAggregateType<T>>

    /**
     * Group by DeviceCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends deviceCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: deviceCodeGroupByArgs['orderBy'] }
        : { orderBy?: deviceCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, deviceCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the deviceCode model
   */
  readonly fields: deviceCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for deviceCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__deviceCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the deviceCode model
   */
  interface deviceCodeFieldRefs {
    readonly id: FieldRef<"deviceCode", 'String'>
    readonly deviceCode: FieldRef<"deviceCode", 'String'>
    readonly userCode: FieldRef<"deviceCode", 'String'>
    readonly userId: FieldRef<"deviceCode", 'String'>
    readonly expiresAt: FieldRef<"deviceCode", 'DateTime'>
    readonly status: FieldRef<"deviceCode", 'String'>
    readonly lastPolledAt: FieldRef<"deviceCode", 'DateTime'>
    readonly pollingInterval: FieldRef<"deviceCode", 'Int'>
    readonly clientId: FieldRef<"deviceCode", 'String'>
    readonly scope: FieldRef<"deviceCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * deviceCode findUnique
   */
  export type deviceCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter, which deviceCode to fetch.
     */
    where: deviceCodeWhereUniqueInput
  }

  /**
   * deviceCode findUniqueOrThrow
   */
  export type deviceCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter, which deviceCode to fetch.
     */
    where: deviceCodeWhereUniqueInput
  }

  /**
   * deviceCode findFirst
   */
  export type deviceCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter, which deviceCode to fetch.
     */
    where?: deviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of deviceCodes to fetch.
     */
    orderBy?: deviceCodeOrderByWithRelationInput | deviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for deviceCodes.
     */
    cursor?: deviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` deviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` deviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of deviceCodes.
     */
    distinct?: DeviceCodeScalarFieldEnum | DeviceCodeScalarFieldEnum[]
  }

  /**
   * deviceCode findFirstOrThrow
   */
  export type deviceCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter, which deviceCode to fetch.
     */
    where?: deviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of deviceCodes to fetch.
     */
    orderBy?: deviceCodeOrderByWithRelationInput | deviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for deviceCodes.
     */
    cursor?: deviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` deviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` deviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of deviceCodes.
     */
    distinct?: DeviceCodeScalarFieldEnum | DeviceCodeScalarFieldEnum[]
  }

  /**
   * deviceCode findMany
   */
  export type deviceCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter, which deviceCodes to fetch.
     */
    where?: deviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of deviceCodes to fetch.
     */
    orderBy?: deviceCodeOrderByWithRelationInput | deviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing deviceCodes.
     */
    cursor?: deviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` deviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` deviceCodes.
     */
    skip?: number
    distinct?: DeviceCodeScalarFieldEnum | DeviceCodeScalarFieldEnum[]
  }

  /**
   * deviceCode create
   */
  export type deviceCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a deviceCode.
     */
    data: XOR<deviceCodeCreateInput, deviceCodeUncheckedCreateInput>
  }

  /**
   * deviceCode createMany
   */
  export type deviceCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many deviceCodes.
     */
    data: deviceCodeCreateManyInput | deviceCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * deviceCode createManyAndReturn
   */
  export type deviceCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * The data used to create many deviceCodes.
     */
    data: deviceCodeCreateManyInput | deviceCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * deviceCode update
   */
  export type deviceCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a deviceCode.
     */
    data: XOR<deviceCodeUpdateInput, deviceCodeUncheckedUpdateInput>
    /**
     * Choose, which deviceCode to update.
     */
    where: deviceCodeWhereUniqueInput
  }

  /**
   * deviceCode updateMany
   */
  export type deviceCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update deviceCodes.
     */
    data: XOR<deviceCodeUpdateManyMutationInput, deviceCodeUncheckedUpdateManyInput>
    /**
     * Filter which deviceCodes to update
     */
    where?: deviceCodeWhereInput
    /**
     * Limit how many deviceCodes to update.
     */
    limit?: number
  }

  /**
   * deviceCode updateManyAndReturn
   */
  export type deviceCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * The data used to update deviceCodes.
     */
    data: XOR<deviceCodeUpdateManyMutationInput, deviceCodeUncheckedUpdateManyInput>
    /**
     * Filter which deviceCodes to update
     */
    where?: deviceCodeWhereInput
    /**
     * Limit how many deviceCodes to update.
     */
    limit?: number
  }

  /**
   * deviceCode upsert
   */
  export type deviceCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the deviceCode to update in case it exists.
     */
    where: deviceCodeWhereUniqueInput
    /**
     * In case the deviceCode found by the `where` argument doesn't exist, create a new deviceCode with this data.
     */
    create: XOR<deviceCodeCreateInput, deviceCodeUncheckedCreateInput>
    /**
     * In case the deviceCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<deviceCodeUpdateInput, deviceCodeUncheckedUpdateInput>
  }

  /**
   * deviceCode delete
   */
  export type deviceCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
    /**
     * Filter which deviceCode to delete.
     */
    where: deviceCodeWhereUniqueInput
  }

  /**
   * deviceCode deleteMany
   */
  export type deviceCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which deviceCodes to delete
     */
    where?: deviceCodeWhereInput
    /**
     * Limit how many deviceCodes to delete.
     */
    limit?: number
  }

  /**
   * deviceCode without action
   */
  export type deviceCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the deviceCode
     */
    select?: deviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the deviceCode
     */
    omit?: deviceCodeOmit<ExtArgs> | null
  }


  /**
   * Model jwks
   */

  export type AggregateJwks = {
    _count: JwksCountAggregateOutputType | null
    _min: JwksMinAggregateOutputType | null
    _max: JwksMaxAggregateOutputType | null
  }

  export type JwksMinAggregateOutputType = {
    id: string | null
    publicKey: string | null
    privateKey: string | null
    createdAt: Date | null
  }

  export type JwksMaxAggregateOutputType = {
    id: string | null
    publicKey: string | null
    privateKey: string | null
    createdAt: Date | null
  }

  export type JwksCountAggregateOutputType = {
    id: number
    publicKey: number
    privateKey: number
    createdAt: number
    _all: number
  }


  export type JwksMinAggregateInputType = {
    id?: true
    publicKey?: true
    privateKey?: true
    createdAt?: true
  }

  export type JwksMaxAggregateInputType = {
    id?: true
    publicKey?: true
    privateKey?: true
    createdAt?: true
  }

  export type JwksCountAggregateInputType = {
    id?: true
    publicKey?: true
    privateKey?: true
    createdAt?: true
    _all?: true
  }

  export type JwksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which jwks to aggregate.
     */
    where?: jwksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jwks to fetch.
     */
    orderBy?: jwksOrderByWithRelationInput | jwksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: jwksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jwks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jwks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned jwks
    **/
    _count?: true | JwksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JwksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JwksMaxAggregateInputType
  }

  export type GetJwksAggregateType<T extends JwksAggregateArgs> = {
        [P in keyof T & keyof AggregateJwks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJwks[P]>
      : GetScalarType<T[P], AggregateJwks[P]>
  }




  export type jwksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: jwksWhereInput
    orderBy?: jwksOrderByWithAggregationInput | jwksOrderByWithAggregationInput[]
    by: JwksScalarFieldEnum[] | JwksScalarFieldEnum
    having?: jwksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JwksCountAggregateInputType | true
    _min?: JwksMinAggregateInputType
    _max?: JwksMaxAggregateInputType
  }

  export type JwksGroupByOutputType = {
    id: string
    publicKey: string
    privateKey: string
    createdAt: Date
    _count: JwksCountAggregateOutputType | null
    _min: JwksMinAggregateOutputType | null
    _max: JwksMaxAggregateOutputType | null
  }

  type GetJwksGroupByPayload<T extends jwksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JwksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JwksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JwksGroupByOutputType[P]>
            : GetScalarType<T[P], JwksGroupByOutputType[P]>
        }
      >
    >


  export type jwksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    privateKey?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jwks"]>

  export type jwksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    privateKey?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jwks"]>

  export type jwksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    privateKey?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jwks"]>

  export type jwksSelectScalar = {
    id?: boolean
    publicKey?: boolean
    privateKey?: boolean
    createdAt?: boolean
  }

  export type jwksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "publicKey" | "privateKey" | "createdAt", ExtArgs["result"]["jwks"]>

  export type $jwksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "jwks"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      publicKey: string
      privateKey: string
      createdAt: Date
    }, ExtArgs["result"]["jwks"]>
    composites: {}
  }

  type jwksGetPayload<S extends boolean | null | undefined | jwksDefaultArgs> = $Result.GetResult<Prisma.$jwksPayload, S>

  type jwksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<jwksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JwksCountAggregateInputType | true
    }

  export interface jwksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['jwks'], meta: { name: 'jwks' } }
    /**
     * Find zero or one Jwks that matches the filter.
     * @param {jwksFindUniqueArgs} args - Arguments to find a Jwks
     * @example
     * // Get one Jwks
     * const jwks = await prisma.jwks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends jwksFindUniqueArgs>(args: SelectSubset<T, jwksFindUniqueArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Jwks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {jwksFindUniqueOrThrowArgs} args - Arguments to find a Jwks
     * @example
     * // Get one Jwks
     * const jwks = await prisma.jwks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends jwksFindUniqueOrThrowArgs>(args: SelectSubset<T, jwksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jwks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksFindFirstArgs} args - Arguments to find a Jwks
     * @example
     * // Get one Jwks
     * const jwks = await prisma.jwks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends jwksFindFirstArgs>(args?: SelectSubset<T, jwksFindFirstArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jwks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksFindFirstOrThrowArgs} args - Arguments to find a Jwks
     * @example
     * // Get one Jwks
     * const jwks = await prisma.jwks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends jwksFindFirstOrThrowArgs>(args?: SelectSubset<T, jwksFindFirstOrThrowArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jwks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jwks
     * const jwks = await prisma.jwks.findMany()
     * 
     * // Get first 10 Jwks
     * const jwks = await prisma.jwks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jwksWithIdOnly = await prisma.jwks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends jwksFindManyArgs>(args?: SelectSubset<T, jwksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Jwks.
     * @param {jwksCreateArgs} args - Arguments to create a Jwks.
     * @example
     * // Create one Jwks
     * const Jwks = await prisma.jwks.create({
     *   data: {
     *     // ... data to create a Jwks
     *   }
     * })
     * 
     */
    create<T extends jwksCreateArgs>(args: SelectSubset<T, jwksCreateArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jwks.
     * @param {jwksCreateManyArgs} args - Arguments to create many Jwks.
     * @example
     * // Create many Jwks
     * const jwks = await prisma.jwks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends jwksCreateManyArgs>(args?: SelectSubset<T, jwksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jwks and returns the data saved in the database.
     * @param {jwksCreateManyAndReturnArgs} args - Arguments to create many Jwks.
     * @example
     * // Create many Jwks
     * const jwks = await prisma.jwks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jwks and only return the `id`
     * const jwksWithIdOnly = await prisma.jwks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends jwksCreateManyAndReturnArgs>(args?: SelectSubset<T, jwksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Jwks.
     * @param {jwksDeleteArgs} args - Arguments to delete one Jwks.
     * @example
     * // Delete one Jwks
     * const Jwks = await prisma.jwks.delete({
     *   where: {
     *     // ... filter to delete one Jwks
     *   }
     * })
     * 
     */
    delete<T extends jwksDeleteArgs>(args: SelectSubset<T, jwksDeleteArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Jwks.
     * @param {jwksUpdateArgs} args - Arguments to update one Jwks.
     * @example
     * // Update one Jwks
     * const jwks = await prisma.jwks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends jwksUpdateArgs>(args: SelectSubset<T, jwksUpdateArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jwks.
     * @param {jwksDeleteManyArgs} args - Arguments to filter Jwks to delete.
     * @example
     * // Delete a few Jwks
     * const { count } = await prisma.jwks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends jwksDeleteManyArgs>(args?: SelectSubset<T, jwksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jwks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jwks
     * const jwks = await prisma.jwks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends jwksUpdateManyArgs>(args: SelectSubset<T, jwksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jwks and returns the data updated in the database.
     * @param {jwksUpdateManyAndReturnArgs} args - Arguments to update many Jwks.
     * @example
     * // Update many Jwks
     * const jwks = await prisma.jwks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jwks and only return the `id`
     * const jwksWithIdOnly = await prisma.jwks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends jwksUpdateManyAndReturnArgs>(args: SelectSubset<T, jwksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Jwks.
     * @param {jwksUpsertArgs} args - Arguments to update or create a Jwks.
     * @example
     * // Update or create a Jwks
     * const jwks = await prisma.jwks.upsert({
     *   create: {
     *     // ... data to create a Jwks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jwks we want to update
     *   }
     * })
     */
    upsert<T extends jwksUpsertArgs>(args: SelectSubset<T, jwksUpsertArgs<ExtArgs>>): Prisma__jwksClient<$Result.GetResult<Prisma.$jwksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jwks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksCountArgs} args - Arguments to filter Jwks to count.
     * @example
     * // Count the number of Jwks
     * const count = await prisma.jwks.count({
     *   where: {
     *     // ... the filter for the Jwks we want to count
     *   }
     * })
    **/
    count<T extends jwksCountArgs>(
      args?: Subset<T, jwksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JwksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jwks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JwksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JwksAggregateArgs>(args: Subset<T, JwksAggregateArgs>): Prisma.PrismaPromise<GetJwksAggregateType<T>>

    /**
     * Group by Jwks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jwksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends jwksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: jwksGroupByArgs['orderBy'] }
        : { orderBy?: jwksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, jwksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJwksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the jwks model
   */
  readonly fields: jwksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for jwks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__jwksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the jwks model
   */
  interface jwksFieldRefs {
    readonly id: FieldRef<"jwks", 'String'>
    readonly publicKey: FieldRef<"jwks", 'String'>
    readonly privateKey: FieldRef<"jwks", 'String'>
    readonly createdAt: FieldRef<"jwks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * jwks findUnique
   */
  export type jwksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter, which jwks to fetch.
     */
    where: jwksWhereUniqueInput
  }

  /**
   * jwks findUniqueOrThrow
   */
  export type jwksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter, which jwks to fetch.
     */
    where: jwksWhereUniqueInput
  }

  /**
   * jwks findFirst
   */
  export type jwksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter, which jwks to fetch.
     */
    where?: jwksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jwks to fetch.
     */
    orderBy?: jwksOrderByWithRelationInput | jwksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jwks.
     */
    cursor?: jwksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jwks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jwks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jwks.
     */
    distinct?: JwksScalarFieldEnum | JwksScalarFieldEnum[]
  }

  /**
   * jwks findFirstOrThrow
   */
  export type jwksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter, which jwks to fetch.
     */
    where?: jwksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jwks to fetch.
     */
    orderBy?: jwksOrderByWithRelationInput | jwksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jwks.
     */
    cursor?: jwksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jwks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jwks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jwks.
     */
    distinct?: JwksScalarFieldEnum | JwksScalarFieldEnum[]
  }

  /**
   * jwks findMany
   */
  export type jwksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter, which jwks to fetch.
     */
    where?: jwksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jwks to fetch.
     */
    orderBy?: jwksOrderByWithRelationInput | jwksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing jwks.
     */
    cursor?: jwksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jwks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jwks.
     */
    skip?: number
    distinct?: JwksScalarFieldEnum | JwksScalarFieldEnum[]
  }

  /**
   * jwks create
   */
  export type jwksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * The data needed to create a jwks.
     */
    data: XOR<jwksCreateInput, jwksUncheckedCreateInput>
  }

  /**
   * jwks createMany
   */
  export type jwksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many jwks.
     */
    data: jwksCreateManyInput | jwksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * jwks createManyAndReturn
   */
  export type jwksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * The data used to create many jwks.
     */
    data: jwksCreateManyInput | jwksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * jwks update
   */
  export type jwksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * The data needed to update a jwks.
     */
    data: XOR<jwksUpdateInput, jwksUncheckedUpdateInput>
    /**
     * Choose, which jwks to update.
     */
    where: jwksWhereUniqueInput
  }

  /**
   * jwks updateMany
   */
  export type jwksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update jwks.
     */
    data: XOR<jwksUpdateManyMutationInput, jwksUncheckedUpdateManyInput>
    /**
     * Filter which jwks to update
     */
    where?: jwksWhereInput
    /**
     * Limit how many jwks to update.
     */
    limit?: number
  }

  /**
   * jwks updateManyAndReturn
   */
  export type jwksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * The data used to update jwks.
     */
    data: XOR<jwksUpdateManyMutationInput, jwksUncheckedUpdateManyInput>
    /**
     * Filter which jwks to update
     */
    where?: jwksWhereInput
    /**
     * Limit how many jwks to update.
     */
    limit?: number
  }

  /**
   * jwks upsert
   */
  export type jwksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * The filter to search for the jwks to update in case it exists.
     */
    where: jwksWhereUniqueInput
    /**
     * In case the jwks found by the `where` argument doesn't exist, create a new jwks with this data.
     */
    create: XOR<jwksCreateInput, jwksUncheckedCreateInput>
    /**
     * In case the jwks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<jwksUpdateInput, jwksUncheckedUpdateInput>
  }

  /**
   * jwks delete
   */
  export type jwksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
    /**
     * Filter which jwks to delete.
     */
    where: jwksWhereUniqueInput
  }

  /**
   * jwks deleteMany
   */
  export type jwksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which jwks to delete
     */
    where?: jwksWhereInput
    /**
     * Limit how many jwks to delete.
     */
    limit?: number
  }

  /**
   * jwks without action
   */
  export type jwksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the jwks
     */
    select?: jwksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the jwks
     */
    omit?: jwksOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    activeOrganizationId: 'activeOrganizationId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    twoFactorEnabled: 'twoFactorEnabled',
    displayName: 'displayName'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    email: 'email',
    role: 'role',
    status: 'status',
    expiresAt: 'expiresAt',
    inviterId: 'inviterId'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const OauthAccessTokenScalarFieldEnum: {
    id: 'id',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    clientId: 'clientId',
    userId: 'userId',
    scopes: 'scopes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OauthAccessTokenScalarFieldEnum = (typeof OauthAccessTokenScalarFieldEnum)[keyof typeof OauthAccessTokenScalarFieldEnum]


  export const OauthApplicationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    metadata: 'metadata',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectURLs: 'redirectURLs',
    type: 'type',
    disabled: 'disabled',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OauthApplicationScalarFieldEnum = (typeof OauthApplicationScalarFieldEnum)[keyof typeof OauthApplicationScalarFieldEnum]


  export const OauthConsentScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    userId: 'userId',
    scopes: 'scopes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    consentGiven: 'consentGiven'
  };

  export type OauthConsentScalarFieldEnum = (typeof OauthConsentScalarFieldEnum)[keyof typeof OauthConsentScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    logo: 'logo',
    createdAt: 'createdAt',
    metadata: 'metadata'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const PasskeyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    publicKey: 'publicKey',
    userId: 'userId',
    credentialID: 'credentialID',
    counter: 'counter',
    deviceType: 'deviceType',
    backedUp: 'backedUp',
    transports: 'transports',
    createdAt: 'createdAt',
    aaguid: 'aaguid'
  };

  export type PasskeyScalarFieldEnum = (typeof PasskeyScalarFieldEnum)[keyof typeof PasskeyScalarFieldEnum]


  export const TwoFactorScalarFieldEnum: {
    id: 'id',
    secret: 'secret',
    backupCodes: 'backupCodes',
    userId: 'userId'
  };

  export type TwoFactorScalarFieldEnum = (typeof TwoFactorScalarFieldEnum)[keyof typeof TwoFactorScalarFieldEnum]


  export const DeviceCodeScalarFieldEnum: {
    id: 'id',
    deviceCode: 'deviceCode',
    userCode: 'userCode',
    userId: 'userId',
    expiresAt: 'expiresAt',
    status: 'status',
    lastPolledAt: 'lastPolledAt',
    pollingInterval: 'pollingInterval',
    clientId: 'clientId',
    scope: 'scope'
  };

  export type DeviceCodeScalarFieldEnum = (typeof DeviceCodeScalarFieldEnum)[keyof typeof DeviceCodeScalarFieldEnum]


  export const JwksScalarFieldEnum: {
    id: 'id',
    publicKey: 'publicKey',
    privateKey: 'privateKey',
    createdAt: 'createdAt'
  };

  export type JwksScalarFieldEnum = (typeof JwksScalarFieldEnum)[keyof typeof JwksScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type accountWhereInput = {
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    id?: StringFilter<"account"> | string
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: StringFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type accountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type accountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: StringFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type accountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: accountCountOrderByAggregateInput
    _max?: accountMaxOrderByAggregateInput
    _min?: accountMinOrderByAggregateInput
  }

  export type accountScalarWhereWithAggregatesInput = {
    AND?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    OR?: accountScalarWhereWithAggregatesInput[]
    NOT?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"account"> | string
    accountId?: StringWithAggregatesFilter<"account"> | string
    providerId?: StringWithAggregatesFilter<"account"> | string
    userId?: StringWithAggregatesFilter<"account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"account"> | string | null
    password?: StringNullableWithAggregatesFilter<"account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
  }

  export type sessionWhereInput = {
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    id?: StringFilter<"session"> | string
    expiresAt?: DateTimeFilter<"session"> | Date | string
    token?: StringFilter<"session"> | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: StringFilter<"session"> | string
    activeOrganizationId?: StringNullableFilter<"session"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type sessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    activeOrganizationId?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
  }

  export type sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    expiresAt?: DateTimeFilter<"session"> | Date | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: StringFilter<"session"> | string
    activeOrganizationId?: StringNullableFilter<"session"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "token">

  export type sessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    activeOrganizationId?: SortOrderInput | SortOrder
    _count?: sessionCountOrderByAggregateInput
    _max?: sessionMaxOrderByAggregateInput
    _min?: sessionMinOrderByAggregateInput
  }

  export type sessionScalarWhereWithAggregatesInput = {
    AND?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    OR?: sessionScalarWhereWithAggregatesInput[]
    NOT?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    token?: StringWithAggregatesFilter<"session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"session"> | string | null
    userId?: StringWithAggregatesFilter<"session"> | string
    activeOrganizationId?: StringNullableWithAggregatesFilter<"session"> | string | null
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    email?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    twoFactorEnabled?: BoolNullableFilter<"user"> | boolean | null
    displayName?: StringNullableFilter<"user"> | string | null
    account?: AccountListRelationFilter
    invitation?: InvitationListRelationFilter
    member?: MemberListRelationFilter
    oauthAccessToken?: OauthAccessTokenListRelationFilter
    oauthApplication?: OauthApplicationListRelationFilter
    oauthConsent?: OauthConsentListRelationFilter
    passkey?: PasskeyListRelationFilter
    session?: SessionListRelationFilter
    twoFactor?: TwoFactorListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    twoFactorEnabled?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    account?: accountOrderByRelationAggregateInput
    invitation?: invitationOrderByRelationAggregateInput
    member?: memberOrderByRelationAggregateInput
    oauthAccessToken?: oauthAccessTokenOrderByRelationAggregateInput
    oauthApplication?: oauthApplicationOrderByRelationAggregateInput
    oauthConsent?: oauthConsentOrderByRelationAggregateInput
    passkey?: passkeyOrderByRelationAggregateInput
    session?: sessionOrderByRelationAggregateInput
    twoFactor?: twoFactorOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    twoFactorEnabled?: BoolNullableFilter<"user"> | boolean | null
    displayName?: StringNullableFilter<"user"> | string | null
    account?: AccountListRelationFilter
    invitation?: InvitationListRelationFilter
    member?: MemberListRelationFilter
    oauthAccessToken?: OauthAccessTokenListRelationFilter
    oauthApplication?: OauthApplicationListRelationFilter
    oauthConsent?: OauthConsentListRelationFilter
    passkey?: PasskeyListRelationFilter
    session?: SessionListRelationFilter
    twoFactor?: TwoFactorListRelationFilter
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    twoFactorEnabled?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    email?: StringWithAggregatesFilter<"user"> | string
    emailVerified?: BoolWithAggregatesFilter<"user"> | boolean
    image?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    twoFactorEnabled?: BoolNullableWithAggregatesFilter<"user"> | boolean | null
    displayName?: StringNullableWithAggregatesFilter<"user"> | string | null
  }

  export type verificationWhereInput = {
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    id?: StringFilter<"verification"> | string
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeFilter<"verification"> | Date | string
    updatedAt?: DateTimeFilter<"verification"> | Date | string
  }

  export type verificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeFilter<"verification"> | Date | string
    updatedAt?: DateTimeFilter<"verification"> | Date | string
  }, "id">

  export type verificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: verificationCountOrderByAggregateInput
    _max?: verificationMaxOrderByAggregateInput
    _min?: verificationMinOrderByAggregateInput
  }

  export type verificationScalarWhereWithAggregatesInput = {
    AND?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    OR?: verificationScalarWhereWithAggregatesInput[]
    NOT?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"verification"> | string
    identifier?: StringWithAggregatesFilter<"verification"> | string
    value?: StringWithAggregatesFilter<"verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"verification"> | Date | string
  }

  export type invitationWhereInput = {
    AND?: invitationWhereInput | invitationWhereInput[]
    OR?: invitationWhereInput[]
    NOT?: invitationWhereInput | invitationWhereInput[]
    id?: StringFilter<"invitation"> | string
    organizationId?: StringFilter<"invitation"> | string
    email?: StringFilter<"invitation"> | string
    role?: StringNullableFilter<"invitation"> | string | null
    status?: StringFilter<"invitation"> | string
    expiresAt?: DateTimeFilter<"invitation"> | Date | string
    inviterId?: StringFilter<"invitation"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }

  export type invitationOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    email?: SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    inviterId?: SortOrder
    user?: userOrderByWithRelationInput
    organization?: organizationOrderByWithRelationInput
  }

  export type invitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: invitationWhereInput | invitationWhereInput[]
    OR?: invitationWhereInput[]
    NOT?: invitationWhereInput | invitationWhereInput[]
    organizationId?: StringFilter<"invitation"> | string
    email?: StringFilter<"invitation"> | string
    role?: StringNullableFilter<"invitation"> | string | null
    status?: StringFilter<"invitation"> | string
    expiresAt?: DateTimeFilter<"invitation"> | Date | string
    inviterId?: StringFilter<"invitation"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }, "id">

  export type invitationOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    email?: SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    inviterId?: SortOrder
    _count?: invitationCountOrderByAggregateInput
    _max?: invitationMaxOrderByAggregateInput
    _min?: invitationMinOrderByAggregateInput
  }

  export type invitationScalarWhereWithAggregatesInput = {
    AND?: invitationScalarWhereWithAggregatesInput | invitationScalarWhereWithAggregatesInput[]
    OR?: invitationScalarWhereWithAggregatesInput[]
    NOT?: invitationScalarWhereWithAggregatesInput | invitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"invitation"> | string
    organizationId?: StringWithAggregatesFilter<"invitation"> | string
    email?: StringWithAggregatesFilter<"invitation"> | string
    role?: StringNullableWithAggregatesFilter<"invitation"> | string | null
    status?: StringWithAggregatesFilter<"invitation"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"invitation"> | Date | string
    inviterId?: StringWithAggregatesFilter<"invitation"> | string
  }

  export type memberWhereInput = {
    AND?: memberWhereInput | memberWhereInput[]
    OR?: memberWhereInput[]
    NOT?: memberWhereInput | memberWhereInput[]
    id?: StringFilter<"member"> | string
    organizationId?: StringFilter<"member"> | string
    userId?: StringFilter<"member"> | string
    role?: StringFilter<"member"> | string
    createdAt?: DateTimeFilter<"member"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type memberOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    organization?: organizationOrderByWithRelationInput
    user?: userOrderByWithRelationInput
  }

  export type memberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: memberWhereInput | memberWhereInput[]
    OR?: memberWhereInput[]
    NOT?: memberWhereInput | memberWhereInput[]
    organizationId?: StringFilter<"member"> | string
    userId?: StringFilter<"member"> | string
    role?: StringFilter<"member"> | string
    createdAt?: DateTimeFilter<"member"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type memberOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: memberCountOrderByAggregateInput
    _max?: memberMaxOrderByAggregateInput
    _min?: memberMinOrderByAggregateInput
  }

  export type memberScalarWhereWithAggregatesInput = {
    AND?: memberScalarWhereWithAggregatesInput | memberScalarWhereWithAggregatesInput[]
    OR?: memberScalarWhereWithAggregatesInput[]
    NOT?: memberScalarWhereWithAggregatesInput | memberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"member"> | string
    organizationId?: StringWithAggregatesFilter<"member"> | string
    userId?: StringWithAggregatesFilter<"member"> | string
    role?: StringWithAggregatesFilter<"member"> | string
    createdAt?: DateTimeWithAggregatesFilter<"member"> | Date | string
  }

  export type oauthAccessTokenWhereInput = {
    AND?: oauthAccessTokenWhereInput | oauthAccessTokenWhereInput[]
    OR?: oauthAccessTokenWhereInput[]
    NOT?: oauthAccessTokenWhereInput | oauthAccessTokenWhereInput[]
    id?: StringFilter<"oauthAccessToken"> | string
    accessToken?: StringFilter<"oauthAccessToken"> | string
    refreshToken?: StringFilter<"oauthAccessToken"> | string
    accessTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    refreshTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    clientId?: StringFilter<"oauthAccessToken"> | string
    userId?: StringNullableFilter<"oauthAccessToken"> | string | null
    scopes?: StringFilter<"oauthAccessToken"> | string
    createdAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    oauthApplication?: XOR<OauthApplicationScalarRelationFilter, oauthApplicationWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
  }

  export type oauthAccessTokenOrderByWithRelationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    clientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    oauthApplication?: oauthApplicationOrderByWithRelationInput
    user?: userOrderByWithRelationInput
  }

  export type oauthAccessTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    accessToken?: string
    refreshToken?: string
    AND?: oauthAccessTokenWhereInput | oauthAccessTokenWhereInput[]
    OR?: oauthAccessTokenWhereInput[]
    NOT?: oauthAccessTokenWhereInput | oauthAccessTokenWhereInput[]
    accessTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    refreshTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    clientId?: StringFilter<"oauthAccessToken"> | string
    userId?: StringNullableFilter<"oauthAccessToken"> | string | null
    scopes?: StringFilter<"oauthAccessToken"> | string
    createdAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    oauthApplication?: XOR<OauthApplicationScalarRelationFilter, oauthApplicationWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
  }, "id" | "accessToken" | "refreshToken">

  export type oauthAccessTokenOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    clientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: oauthAccessTokenCountOrderByAggregateInput
    _max?: oauthAccessTokenMaxOrderByAggregateInput
    _min?: oauthAccessTokenMinOrderByAggregateInput
  }

  export type oauthAccessTokenScalarWhereWithAggregatesInput = {
    AND?: oauthAccessTokenScalarWhereWithAggregatesInput | oauthAccessTokenScalarWhereWithAggregatesInput[]
    OR?: oauthAccessTokenScalarWhereWithAggregatesInput[]
    NOT?: oauthAccessTokenScalarWhereWithAggregatesInput | oauthAccessTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"oauthAccessToken"> | string
    accessToken?: StringWithAggregatesFilter<"oauthAccessToken"> | string
    refreshToken?: StringWithAggregatesFilter<"oauthAccessToken"> | string
    accessTokenExpiresAt?: DateTimeWithAggregatesFilter<"oauthAccessToken"> | Date | string
    refreshTokenExpiresAt?: DateTimeWithAggregatesFilter<"oauthAccessToken"> | Date | string
    clientId?: StringWithAggregatesFilter<"oauthAccessToken"> | string
    userId?: StringNullableWithAggregatesFilter<"oauthAccessToken"> | string | null
    scopes?: StringWithAggregatesFilter<"oauthAccessToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"oauthAccessToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"oauthAccessToken"> | Date | string
  }

  export type oauthApplicationWhereInput = {
    AND?: oauthApplicationWhereInput | oauthApplicationWhereInput[]
    OR?: oauthApplicationWhereInput[]
    NOT?: oauthApplicationWhereInput | oauthApplicationWhereInput[]
    id?: StringFilter<"oauthApplication"> | string
    name?: StringFilter<"oauthApplication"> | string
    icon?: StringNullableFilter<"oauthApplication"> | string | null
    metadata?: StringNullableFilter<"oauthApplication"> | string | null
    clientId?: StringFilter<"oauthApplication"> | string
    clientSecret?: StringNullableFilter<"oauthApplication"> | string | null
    redirectURLs?: StringFilter<"oauthApplication"> | string
    type?: StringFilter<"oauthApplication"> | string
    disabled?: BoolNullableFilter<"oauthApplication"> | boolean | null
    userId?: StringNullableFilter<"oauthApplication"> | string | null
    createdAt?: DateTimeFilter<"oauthApplication"> | Date | string
    updatedAt?: DateTimeFilter<"oauthApplication"> | Date | string
    oauthAccessToken?: OauthAccessTokenListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    oauthConsent?: OauthConsentListRelationFilter
  }

  export type oauthApplicationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrderInput | SortOrder
    redirectURLs?: SortOrder
    type?: SortOrder
    disabled?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    oauthAccessToken?: oauthAccessTokenOrderByRelationAggregateInput
    user?: userOrderByWithRelationInput
    oauthConsent?: oauthConsentOrderByRelationAggregateInput
  }

  export type oauthApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientId?: string
    AND?: oauthApplicationWhereInput | oauthApplicationWhereInput[]
    OR?: oauthApplicationWhereInput[]
    NOT?: oauthApplicationWhereInput | oauthApplicationWhereInput[]
    name?: StringFilter<"oauthApplication"> | string
    icon?: StringNullableFilter<"oauthApplication"> | string | null
    metadata?: StringNullableFilter<"oauthApplication"> | string | null
    clientSecret?: StringNullableFilter<"oauthApplication"> | string | null
    redirectURLs?: StringFilter<"oauthApplication"> | string
    type?: StringFilter<"oauthApplication"> | string
    disabled?: BoolNullableFilter<"oauthApplication"> | boolean | null
    userId?: StringNullableFilter<"oauthApplication"> | string | null
    createdAt?: DateTimeFilter<"oauthApplication"> | Date | string
    updatedAt?: DateTimeFilter<"oauthApplication"> | Date | string
    oauthAccessToken?: OauthAccessTokenListRelationFilter
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    oauthConsent?: OauthConsentListRelationFilter
  }, "id" | "clientId">

  export type oauthApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrderInput | SortOrder
    redirectURLs?: SortOrder
    type?: SortOrder
    disabled?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: oauthApplicationCountOrderByAggregateInput
    _max?: oauthApplicationMaxOrderByAggregateInput
    _min?: oauthApplicationMinOrderByAggregateInput
  }

  export type oauthApplicationScalarWhereWithAggregatesInput = {
    AND?: oauthApplicationScalarWhereWithAggregatesInput | oauthApplicationScalarWhereWithAggregatesInput[]
    OR?: oauthApplicationScalarWhereWithAggregatesInput[]
    NOT?: oauthApplicationScalarWhereWithAggregatesInput | oauthApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"oauthApplication"> | string
    name?: StringWithAggregatesFilter<"oauthApplication"> | string
    icon?: StringNullableWithAggregatesFilter<"oauthApplication"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"oauthApplication"> | string | null
    clientId?: StringWithAggregatesFilter<"oauthApplication"> | string
    clientSecret?: StringNullableWithAggregatesFilter<"oauthApplication"> | string | null
    redirectURLs?: StringWithAggregatesFilter<"oauthApplication"> | string
    type?: StringWithAggregatesFilter<"oauthApplication"> | string
    disabled?: BoolNullableWithAggregatesFilter<"oauthApplication"> | boolean | null
    userId?: StringNullableWithAggregatesFilter<"oauthApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"oauthApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"oauthApplication"> | Date | string
  }

  export type oauthConsentWhereInput = {
    AND?: oauthConsentWhereInput | oauthConsentWhereInput[]
    OR?: oauthConsentWhereInput[]
    NOT?: oauthConsentWhereInput | oauthConsentWhereInput[]
    id?: StringFilter<"oauthConsent"> | string
    clientId?: StringFilter<"oauthConsent"> | string
    userId?: StringFilter<"oauthConsent"> | string
    scopes?: StringFilter<"oauthConsent"> | string
    createdAt?: DateTimeFilter<"oauthConsent"> | Date | string
    updatedAt?: DateTimeFilter<"oauthConsent"> | Date | string
    consentGiven?: BoolFilter<"oauthConsent"> | boolean
    oauthApplication?: XOR<OauthApplicationScalarRelationFilter, oauthApplicationWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type oauthConsentOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consentGiven?: SortOrder
    oauthApplication?: oauthApplicationOrderByWithRelationInput
    user?: userOrderByWithRelationInput
  }

  export type oauthConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: oauthConsentWhereInput | oauthConsentWhereInput[]
    OR?: oauthConsentWhereInput[]
    NOT?: oauthConsentWhereInput | oauthConsentWhereInput[]
    clientId?: StringFilter<"oauthConsent"> | string
    userId?: StringFilter<"oauthConsent"> | string
    scopes?: StringFilter<"oauthConsent"> | string
    createdAt?: DateTimeFilter<"oauthConsent"> | Date | string
    updatedAt?: DateTimeFilter<"oauthConsent"> | Date | string
    consentGiven?: BoolFilter<"oauthConsent"> | boolean
    oauthApplication?: XOR<OauthApplicationScalarRelationFilter, oauthApplicationWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type oauthConsentOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consentGiven?: SortOrder
    _count?: oauthConsentCountOrderByAggregateInput
    _max?: oauthConsentMaxOrderByAggregateInput
    _min?: oauthConsentMinOrderByAggregateInput
  }

  export type oauthConsentScalarWhereWithAggregatesInput = {
    AND?: oauthConsentScalarWhereWithAggregatesInput | oauthConsentScalarWhereWithAggregatesInput[]
    OR?: oauthConsentScalarWhereWithAggregatesInput[]
    NOT?: oauthConsentScalarWhereWithAggregatesInput | oauthConsentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"oauthConsent"> | string
    clientId?: StringWithAggregatesFilter<"oauthConsent"> | string
    userId?: StringWithAggregatesFilter<"oauthConsent"> | string
    scopes?: StringWithAggregatesFilter<"oauthConsent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"oauthConsent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"oauthConsent"> | Date | string
    consentGiven?: BoolWithAggregatesFilter<"oauthConsent"> | boolean
  }

  export type organizationWhereInput = {
    AND?: organizationWhereInput | organizationWhereInput[]
    OR?: organizationWhereInput[]
    NOT?: organizationWhereInput | organizationWhereInput[]
    id?: StringFilter<"organization"> | string
    name?: StringFilter<"organization"> | string
    slug?: StringFilter<"organization"> | string
    logo?: StringNullableFilter<"organization"> | string | null
    createdAt?: DateTimeFilter<"organization"> | Date | string
    metadata?: StringNullableFilter<"organization"> | string | null
    invitation?: InvitationListRelationFilter
    member?: MemberListRelationFilter
  }

  export type organizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    invitation?: invitationOrderByRelationAggregateInput
    member?: memberOrderByRelationAggregateInput
  }

  export type organizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: organizationWhereInput | organizationWhereInput[]
    OR?: organizationWhereInput[]
    NOT?: organizationWhereInput | organizationWhereInput[]
    name?: StringFilter<"organization"> | string
    logo?: StringNullableFilter<"organization"> | string | null
    createdAt?: DateTimeFilter<"organization"> | Date | string
    metadata?: StringNullableFilter<"organization"> | string | null
    invitation?: InvitationListRelationFilter
    member?: MemberListRelationFilter
  }, "id" | "slug">

  export type organizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: organizationCountOrderByAggregateInput
    _max?: organizationMaxOrderByAggregateInput
    _min?: organizationMinOrderByAggregateInput
  }

  export type organizationScalarWhereWithAggregatesInput = {
    AND?: organizationScalarWhereWithAggregatesInput | organizationScalarWhereWithAggregatesInput[]
    OR?: organizationScalarWhereWithAggregatesInput[]
    NOT?: organizationScalarWhereWithAggregatesInput | organizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"organization"> | string
    name?: StringWithAggregatesFilter<"organization"> | string
    slug?: StringWithAggregatesFilter<"organization"> | string
    logo?: StringNullableWithAggregatesFilter<"organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"organization"> | Date | string
    metadata?: StringNullableWithAggregatesFilter<"organization"> | string | null
  }

  export type passkeyWhereInput = {
    AND?: passkeyWhereInput | passkeyWhereInput[]
    OR?: passkeyWhereInput[]
    NOT?: passkeyWhereInput | passkeyWhereInput[]
    id?: StringFilter<"passkey"> | string
    name?: StringNullableFilter<"passkey"> | string | null
    publicKey?: StringFilter<"passkey"> | string
    userId?: StringFilter<"passkey"> | string
    credentialID?: StringFilter<"passkey"> | string
    counter?: IntFilter<"passkey"> | number
    deviceType?: StringFilter<"passkey"> | string
    backedUp?: BoolFilter<"passkey"> | boolean
    transports?: StringNullableFilter<"passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"passkey"> | Date | string | null
    aaguid?: StringNullableFilter<"passkey"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type passkeyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    aaguid?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
  }

  export type passkeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: passkeyWhereInput | passkeyWhereInput[]
    OR?: passkeyWhereInput[]
    NOT?: passkeyWhereInput | passkeyWhereInput[]
    name?: StringNullableFilter<"passkey"> | string | null
    publicKey?: StringFilter<"passkey"> | string
    userId?: StringFilter<"passkey"> | string
    credentialID?: StringFilter<"passkey"> | string
    counter?: IntFilter<"passkey"> | number
    deviceType?: StringFilter<"passkey"> | string
    backedUp?: BoolFilter<"passkey"> | boolean
    transports?: StringNullableFilter<"passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"passkey"> | Date | string | null
    aaguid?: StringNullableFilter<"passkey"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type passkeyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    aaguid?: SortOrderInput | SortOrder
    _count?: passkeyCountOrderByAggregateInput
    _avg?: passkeyAvgOrderByAggregateInput
    _max?: passkeyMaxOrderByAggregateInput
    _min?: passkeyMinOrderByAggregateInput
    _sum?: passkeySumOrderByAggregateInput
  }

  export type passkeyScalarWhereWithAggregatesInput = {
    AND?: passkeyScalarWhereWithAggregatesInput | passkeyScalarWhereWithAggregatesInput[]
    OR?: passkeyScalarWhereWithAggregatesInput[]
    NOT?: passkeyScalarWhereWithAggregatesInput | passkeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"passkey"> | string
    name?: StringNullableWithAggregatesFilter<"passkey"> | string | null
    publicKey?: StringWithAggregatesFilter<"passkey"> | string
    userId?: StringWithAggregatesFilter<"passkey"> | string
    credentialID?: StringWithAggregatesFilter<"passkey"> | string
    counter?: IntWithAggregatesFilter<"passkey"> | number
    deviceType?: StringWithAggregatesFilter<"passkey"> | string
    backedUp?: BoolWithAggregatesFilter<"passkey"> | boolean
    transports?: StringNullableWithAggregatesFilter<"passkey"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"passkey"> | Date | string | null
    aaguid?: StringNullableWithAggregatesFilter<"passkey"> | string | null
  }

  export type twoFactorWhereInput = {
    AND?: twoFactorWhereInput | twoFactorWhereInput[]
    OR?: twoFactorWhereInput[]
    NOT?: twoFactorWhereInput | twoFactorWhereInput[]
    id?: StringFilter<"twoFactor"> | string
    secret?: StringFilter<"twoFactor"> | string
    backupCodes?: StringFilter<"twoFactor"> | string
    userId?: StringFilter<"twoFactor"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type twoFactorOrderByWithRelationInput = {
    id?: SortOrder
    secret?: SortOrder
    backupCodes?: SortOrder
    userId?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type twoFactorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: twoFactorWhereInput | twoFactorWhereInput[]
    OR?: twoFactorWhereInput[]
    NOT?: twoFactorWhereInput | twoFactorWhereInput[]
    secret?: StringFilter<"twoFactor"> | string
    backupCodes?: StringFilter<"twoFactor"> | string
    userId?: StringFilter<"twoFactor"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type twoFactorOrderByWithAggregationInput = {
    id?: SortOrder
    secret?: SortOrder
    backupCodes?: SortOrder
    userId?: SortOrder
    _count?: twoFactorCountOrderByAggregateInput
    _max?: twoFactorMaxOrderByAggregateInput
    _min?: twoFactorMinOrderByAggregateInput
  }

  export type twoFactorScalarWhereWithAggregatesInput = {
    AND?: twoFactorScalarWhereWithAggregatesInput | twoFactorScalarWhereWithAggregatesInput[]
    OR?: twoFactorScalarWhereWithAggregatesInput[]
    NOT?: twoFactorScalarWhereWithAggregatesInput | twoFactorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"twoFactor"> | string
    secret?: StringWithAggregatesFilter<"twoFactor"> | string
    backupCodes?: StringWithAggregatesFilter<"twoFactor"> | string
    userId?: StringWithAggregatesFilter<"twoFactor"> | string
  }

  export type deviceCodeWhereInput = {
    AND?: deviceCodeWhereInput | deviceCodeWhereInput[]
    OR?: deviceCodeWhereInput[]
    NOT?: deviceCodeWhereInput | deviceCodeWhereInput[]
    id?: StringFilter<"deviceCode"> | string
    deviceCode?: StringFilter<"deviceCode"> | string
    userCode?: StringFilter<"deviceCode"> | string
    userId?: StringNullableFilter<"deviceCode"> | string | null
    expiresAt?: DateTimeFilter<"deviceCode"> | Date | string
    status?: StringFilter<"deviceCode"> | string
    lastPolledAt?: DateTimeNullableFilter<"deviceCode"> | Date | string | null
    pollingInterval?: IntNullableFilter<"deviceCode"> | number | null
    clientId?: StringNullableFilter<"deviceCode"> | string | null
    scope?: StringNullableFilter<"deviceCode"> | string | null
  }

  export type deviceCodeOrderByWithRelationInput = {
    id?: SortOrder
    deviceCode?: SortOrder
    userCode?: SortOrder
    userId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastPolledAt?: SortOrderInput | SortOrder
    pollingInterval?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
  }

  export type deviceCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: deviceCodeWhereInput | deviceCodeWhereInput[]
    OR?: deviceCodeWhereInput[]
    NOT?: deviceCodeWhereInput | deviceCodeWhereInput[]
    deviceCode?: StringFilter<"deviceCode"> | string
    userCode?: StringFilter<"deviceCode"> | string
    userId?: StringNullableFilter<"deviceCode"> | string | null
    expiresAt?: DateTimeFilter<"deviceCode"> | Date | string
    status?: StringFilter<"deviceCode"> | string
    lastPolledAt?: DateTimeNullableFilter<"deviceCode"> | Date | string | null
    pollingInterval?: IntNullableFilter<"deviceCode"> | number | null
    clientId?: StringNullableFilter<"deviceCode"> | string | null
    scope?: StringNullableFilter<"deviceCode"> | string | null
  }, "id">

  export type deviceCodeOrderByWithAggregationInput = {
    id?: SortOrder
    deviceCode?: SortOrder
    userCode?: SortOrder
    userId?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastPolledAt?: SortOrderInput | SortOrder
    pollingInterval?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    _count?: deviceCodeCountOrderByAggregateInput
    _avg?: deviceCodeAvgOrderByAggregateInput
    _max?: deviceCodeMaxOrderByAggregateInput
    _min?: deviceCodeMinOrderByAggregateInput
    _sum?: deviceCodeSumOrderByAggregateInput
  }

  export type deviceCodeScalarWhereWithAggregatesInput = {
    AND?: deviceCodeScalarWhereWithAggregatesInput | deviceCodeScalarWhereWithAggregatesInput[]
    OR?: deviceCodeScalarWhereWithAggregatesInput[]
    NOT?: deviceCodeScalarWhereWithAggregatesInput | deviceCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"deviceCode"> | string
    deviceCode?: StringWithAggregatesFilter<"deviceCode"> | string
    userCode?: StringWithAggregatesFilter<"deviceCode"> | string
    userId?: StringNullableWithAggregatesFilter<"deviceCode"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"deviceCode"> | Date | string
    status?: StringWithAggregatesFilter<"deviceCode"> | string
    lastPolledAt?: DateTimeNullableWithAggregatesFilter<"deviceCode"> | Date | string | null
    pollingInterval?: IntNullableWithAggregatesFilter<"deviceCode"> | number | null
    clientId?: StringNullableWithAggregatesFilter<"deviceCode"> | string | null
    scope?: StringNullableWithAggregatesFilter<"deviceCode"> | string | null
  }

  export type jwksWhereInput = {
    AND?: jwksWhereInput | jwksWhereInput[]
    OR?: jwksWhereInput[]
    NOT?: jwksWhereInput | jwksWhereInput[]
    id?: StringFilter<"jwks"> | string
    publicKey?: StringFilter<"jwks"> | string
    privateKey?: StringFilter<"jwks"> | string
    createdAt?: DateTimeFilter<"jwks"> | Date | string
  }

  export type jwksOrderByWithRelationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    createdAt?: SortOrder
  }

  export type jwksWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: jwksWhereInput | jwksWhereInput[]
    OR?: jwksWhereInput[]
    NOT?: jwksWhereInput | jwksWhereInput[]
    publicKey?: StringFilter<"jwks"> | string
    privateKey?: StringFilter<"jwks"> | string
    createdAt?: DateTimeFilter<"jwks"> | Date | string
  }, "id">

  export type jwksOrderByWithAggregationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    createdAt?: SortOrder
    _count?: jwksCountOrderByAggregateInput
    _max?: jwksMaxOrderByAggregateInput
    _min?: jwksMinOrderByAggregateInput
  }

  export type jwksScalarWhereWithAggregatesInput = {
    AND?: jwksScalarWhereWithAggregatesInput | jwksScalarWhereWithAggregatesInput[]
    OR?: jwksScalarWhereWithAggregatesInput[]
    NOT?: jwksScalarWhereWithAggregatesInput | jwksScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"jwks"> | string
    publicKey?: StringWithAggregatesFilter<"jwks"> | string
    privateKey?: StringWithAggregatesFilter<"jwks"> | string
    createdAt?: DateTimeWithAggregatesFilter<"jwks"> | Date | string
  }

  export type accountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    user: userCreateNestedOneWithoutAccountInput
  }

  export type accountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutAccountNestedInput
  }

  export type accountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    activeOrganizationId?: string | null
    user: userCreateNestedOneWithoutSessionInput
  }

  export type sessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    activeOrganizationId?: string | null
  }

  export type sessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutSessionNestedInput
  }

  export type sessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    activeOrganizationId?: string | null
  }

  export type sessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type verificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type verificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type verificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type verificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type invitationCreateInput = {
    id: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    user: userCreateNestedOneWithoutInvitationInput
    organization: organizationCreateNestedOneWithoutInvitationInput
  }

  export type invitationUncheckedCreateInput = {
    id: string
    organizationId: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    inviterId: string
  }

  export type invitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutInvitationNestedInput
    organization?: organizationUpdateOneRequiredWithoutInvitationNestedInput
  }

  export type invitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviterId?: StringFieldUpdateOperationsInput | string
  }

  export type invitationCreateManyInput = {
    id: string
    organizationId: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    inviterId: string
  }

  export type invitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type invitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviterId?: StringFieldUpdateOperationsInput | string
  }

  export type memberCreateInput = {
    id: string
    role: string
    createdAt: Date | string
    organization: organizationCreateNestedOneWithoutMemberInput
    user: userCreateNestedOneWithoutMemberInput
  }

  export type memberUncheckedCreateInput = {
    id: string
    organizationId: string
    userId: string
    role: string
    createdAt: Date | string
  }

  export type memberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: organizationUpdateOneRequiredWithoutMemberNestedInput
    user?: userUpdateOneRequiredWithoutMemberNestedInput
  }

  export type memberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type memberCreateManyInput = {
    id: string
    organizationId: string
    userId: string
    role: string
    createdAt: Date | string
  }

  export type memberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type memberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenCreateInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    oauthApplication: oauthApplicationCreateNestedOneWithoutOauthAccessTokenInput
    user?: userCreateNestedOneWithoutOauthAccessTokenInput
  }

  export type oauthAccessTokenUncheckedCreateInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    clientId: string
    userId?: string | null
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthAccessTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthApplication?: oauthApplicationUpdateOneRequiredWithoutOauthAccessTokenNestedInput
    user?: userUpdateOneWithoutOauthAccessTokenNestedInput
  }

  export type oauthAccessTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenCreateManyInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    clientId: string
    userId?: string | null
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthAccessTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthApplicationCreateInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutOauthApplicationInput
    user?: userCreateNestedOneWithoutOauthApplicationInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationUncheckedCreateInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    userId?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutOauthApplicationInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutOauthApplicationNestedInput
    user?: userUpdateOneWithoutOauthApplicationNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationCreateManyInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    userId?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthConsentCreateInput = {
    id: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
    oauthApplication: oauthApplicationCreateNestedOneWithoutOauthConsentInput
    user: userCreateNestedOneWithoutOauthConsentInput
  }

  export type oauthConsentUncheckedCreateInput = {
    id: string
    clientId: string
    userId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type oauthConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
    oauthApplication?: oauthApplicationUpdateOneRequiredWithoutOauthConsentNestedInput
    user?: userUpdateOneRequiredWithoutOauthConsentNestedInput
  }

  export type oauthConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type oauthConsentCreateManyInput = {
    id: string
    clientId: string
    userId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type oauthConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type oauthConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type organizationCreateInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    invitation?: invitationCreateNestedManyWithoutOrganizationInput
    member?: memberCreateNestedManyWithoutOrganizationInput
  }

  export type organizationUncheckedCreateInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    invitation?: invitationUncheckedCreateNestedManyWithoutOrganizationInput
    member?: memberUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type organizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUpdateManyWithoutOrganizationNestedInput
    member?: memberUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUncheckedUpdateManyWithoutOrganizationNestedInput
    member?: memberUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationCreateManyInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
  }

  export type organizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type organizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type passkeyCreateInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
    user: userCreateNestedOneWithoutPasskeyInput
  }

  export type passkeyUncheckedCreateInput = {
    id: string
    name?: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
  }

  export type passkeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutPasskeyNestedInput
  }

  export type passkeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type passkeyCreateManyInput = {
    id: string
    name?: string | null
    publicKey: string
    userId: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
  }

  export type passkeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type passkeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twoFactorCreateInput = {
    id: string
    secret: string
    backupCodes: string
    user: userCreateNestedOneWithoutTwoFactorInput
  }

  export type twoFactorUncheckedCreateInput = {
    id: string
    secret: string
    backupCodes: string
    userId: string
  }

  export type twoFactorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutTwoFactorNestedInput
  }

  export type twoFactorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type twoFactorCreateManyInput = {
    id: string
    secret: string
    backupCodes: string
    userId: string
  }

  export type twoFactorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
  }

  export type twoFactorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type deviceCodeCreateInput = {
    id: string
    deviceCode: string
    userCode: string
    userId?: string | null
    expiresAt: Date | string
    status: string
    lastPolledAt?: Date | string | null
    pollingInterval?: number | null
    clientId?: string | null
    scope?: string | null
  }

  export type deviceCodeUncheckedCreateInput = {
    id: string
    deviceCode: string
    userCode: string
    userId?: string | null
    expiresAt: Date | string
    status: string
    lastPolledAt?: Date | string | null
    pollingInterval?: number | null
    clientId?: string | null
    scope?: string | null
  }

  export type deviceCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceCode?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    lastPolledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pollingInterval?: NullableIntFieldUpdateOperationsInput | number | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type deviceCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceCode?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    lastPolledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pollingInterval?: NullableIntFieldUpdateOperationsInput | number | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type deviceCodeCreateManyInput = {
    id: string
    deviceCode: string
    userCode: string
    userId?: string | null
    expiresAt: Date | string
    status: string
    lastPolledAt?: Date | string | null
    pollingInterval?: number | null
    clientId?: string | null
    scope?: string | null
  }

  export type deviceCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceCode?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    lastPolledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pollingInterval?: NullableIntFieldUpdateOperationsInput | number | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type deviceCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceCode?: StringFieldUpdateOperationsInput | string
    userCode?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    lastPolledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pollingInterval?: NullableIntFieldUpdateOperationsInput | number | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type jwksCreateInput = {
    id: string
    publicKey: string
    privateKey: string
    createdAt: Date | string
  }

  export type jwksUncheckedCreateInput = {
    id: string
    publicKey: string
    privateKey: string
    createdAt: Date | string
  }

  export type jwksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jwksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jwksCreateManyInput = {
    id: string
    publicKey: string
    privateKey: string
    createdAt: Date | string
  }

  export type jwksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type jwksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    privateKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type accountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type sessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    activeOrganizationId?: SortOrder
  }

  export type sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    activeOrganizationId?: SortOrder
  }

  export type sessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    activeOrganizationId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AccountListRelationFilter = {
    every?: accountWhereInput
    some?: accountWhereInput
    none?: accountWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: invitationWhereInput
    some?: invitationWhereInput
    none?: invitationWhereInput
  }

  export type MemberListRelationFilter = {
    every?: memberWhereInput
    some?: memberWhereInput
    none?: memberWhereInput
  }

  export type OauthAccessTokenListRelationFilter = {
    every?: oauthAccessTokenWhereInput
    some?: oauthAccessTokenWhereInput
    none?: oauthAccessTokenWhereInput
  }

  export type OauthApplicationListRelationFilter = {
    every?: oauthApplicationWhereInput
    some?: oauthApplicationWhereInput
    none?: oauthApplicationWhereInput
  }

  export type OauthConsentListRelationFilter = {
    every?: oauthConsentWhereInput
    some?: oauthConsentWhereInput
    none?: oauthConsentWhereInput
  }

  export type PasskeyListRelationFilter = {
    every?: passkeyWhereInput
    some?: passkeyWhereInput
    none?: passkeyWhereInput
  }

  export type SessionListRelationFilter = {
    every?: sessionWhereInput
    some?: sessionWhereInput
    none?: sessionWhereInput
  }

  export type TwoFactorListRelationFilter = {
    every?: twoFactorWhereInput
    some?: twoFactorWhereInput
    none?: twoFactorWhereInput
  }

  export type accountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type invitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type memberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type oauthAccessTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type oauthApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type oauthConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type passkeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type twoFactorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    displayName?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    displayName?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    displayName?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type verificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationScalarRelationFilter = {
    is?: organizationWhereInput
    isNot?: organizationWhereInput
  }

  export type invitationCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    inviterId?: SortOrder
  }

  export type invitationMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    inviterId?: SortOrder
  }

  export type invitationMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    email?: SortOrder
    role?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    inviterId?: SortOrder
  }

  export type memberCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type memberMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type memberMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type OauthApplicationScalarRelationFilter = {
    is?: oauthApplicationWhereInput
    isNot?: oauthApplicationWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: userWhereInput | null
    isNot?: userWhereInput | null
  }

  export type oauthAccessTokenCountOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthAccessTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthAccessTokenMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    metadata?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    redirectURLs?: SortOrder
    type?: SortOrder
    disabled?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    metadata?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    redirectURLs?: SortOrder
    type?: SortOrder
    disabled?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    metadata?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    redirectURLs?: SortOrder
    type?: SortOrder
    disabled?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type oauthConsentCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consentGiven?: SortOrder
  }

  export type oauthConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consentGiven?: SortOrder
  }

  export type oauthConsentMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consentGiven?: SortOrder
  }

  export type organizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    metadata?: SortOrder
  }

  export type organizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    metadata?: SortOrder
  }

  export type organizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    metadata?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type passkeyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
    aaguid?: SortOrder
  }

  export type passkeyAvgOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type passkeyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
    aaguid?: SortOrder
  }

  export type passkeyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    publicKey?: SortOrder
    userId?: SortOrder
    credentialID?: SortOrder
    counter?: SortOrder
    deviceType?: SortOrder
    backedUp?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
    aaguid?: SortOrder
  }

  export type passkeySumOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type twoFactorCountOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
    backupCodes?: SortOrder
    userId?: SortOrder
  }

  export type twoFactorMaxOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
    backupCodes?: SortOrder
    userId?: SortOrder
  }

  export type twoFactorMinOrderByAggregateInput = {
    id?: SortOrder
    secret?: SortOrder
    backupCodes?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type deviceCodeCountOrderByAggregateInput = {
    id?: SortOrder
    deviceCode?: SortOrder
    userCode?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastPolledAt?: SortOrder
    pollingInterval?: SortOrder
    clientId?: SortOrder
    scope?: SortOrder
  }

  export type deviceCodeAvgOrderByAggregateInput = {
    pollingInterval?: SortOrder
  }

  export type deviceCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceCode?: SortOrder
    userCode?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastPolledAt?: SortOrder
    pollingInterval?: SortOrder
    clientId?: SortOrder
    scope?: SortOrder
  }

  export type deviceCodeMinOrderByAggregateInput = {
    id?: SortOrder
    deviceCode?: SortOrder
    userCode?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastPolledAt?: SortOrder
    pollingInterval?: SortOrder
    clientId?: SortOrder
    scope?: SortOrder
  }

  export type deviceCodeSumOrderByAggregateInput = {
    pollingInterval?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type jwksCountOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    createdAt?: SortOrder
  }

  export type jwksMaxOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    createdAt?: SortOrder
  }

  export type jwksMinOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    privateKey?: SortOrder
    createdAt?: SortOrder
  }

  export type userCreateNestedOneWithoutAccountInput = {
    create?: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    connectOrCreate?: userCreateOrConnectWithoutAccountInput
    connect?: userWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type userUpdateOneRequiredWithoutAccountNestedInput = {
    create?: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    connectOrCreate?: userCreateOrConnectWithoutAccountInput
    upsert?: userUpsertWithoutAccountInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutAccountInput, userUpdateWithoutAccountInput>, userUncheckedUpdateWithoutAccountInput>
  }

  export type userCreateNestedOneWithoutSessionInput = {
    create?: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionInput
    upsert?: userUpsertWithoutSessionInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutSessionInput, userUpdateWithoutSessionInput>, userUncheckedUpdateWithoutSessionInput>
  }

  export type accountCreateNestedManyWithoutUserInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
  }

  export type invitationCreateNestedManyWithoutUserInput = {
    create?: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput> | invitationCreateWithoutUserInput[] | invitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutUserInput | invitationCreateOrConnectWithoutUserInput[]
    createMany?: invitationCreateManyUserInputEnvelope
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
  }

  export type memberCreateNestedManyWithoutUserInput = {
    create?: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput> | memberCreateWithoutUserInput[] | memberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: memberCreateOrConnectWithoutUserInput | memberCreateOrConnectWithoutUserInput[]
    createMany?: memberCreateManyUserInputEnvelope
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
  }

  export type oauthAccessTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput> | oauthAccessTokenCreateWithoutUserInput[] | oauthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutUserInput | oauthAccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: oauthAccessTokenCreateManyUserInputEnvelope
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
  }

  export type oauthApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput> | oauthApplicationCreateWithoutUserInput[] | oauthApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutUserInput | oauthApplicationCreateOrConnectWithoutUserInput[]
    createMany?: oauthApplicationCreateManyUserInputEnvelope
    connect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
  }

  export type oauthConsentCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput> | oauthConsentCreateWithoutUserInput[] | oauthConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutUserInput | oauthConsentCreateOrConnectWithoutUserInput[]
    createMany?: oauthConsentCreateManyUserInputEnvelope
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
  }

  export type passkeyCreateNestedManyWithoutUserInput = {
    create?: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput> | passkeyCreateWithoutUserInput[] | passkeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: passkeyCreateOrConnectWithoutUserInput | passkeyCreateOrConnectWithoutUserInput[]
    createMany?: passkeyCreateManyUserInputEnvelope
    connect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
  }

  export type sessionCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
  }

  export type twoFactorCreateNestedManyWithoutUserInput = {
    create?: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput> | twoFactorCreateWithoutUserInput[] | twoFactorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: twoFactorCreateOrConnectWithoutUserInput | twoFactorCreateOrConnectWithoutUserInput[]
    createMany?: twoFactorCreateManyUserInputEnvelope
    connect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
  }

  export type accountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
  }

  export type invitationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput> | invitationCreateWithoutUserInput[] | invitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutUserInput | invitationCreateOrConnectWithoutUserInput[]
    createMany?: invitationCreateManyUserInputEnvelope
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
  }

  export type memberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput> | memberCreateWithoutUserInput[] | memberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: memberCreateOrConnectWithoutUserInput | memberCreateOrConnectWithoutUserInput[]
    createMany?: memberCreateManyUserInputEnvelope
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
  }

  export type oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput> | oauthAccessTokenCreateWithoutUserInput[] | oauthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutUserInput | oauthAccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: oauthAccessTokenCreateManyUserInputEnvelope
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
  }

  export type oauthApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput> | oauthApplicationCreateWithoutUserInput[] | oauthApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutUserInput | oauthApplicationCreateOrConnectWithoutUserInput[]
    createMany?: oauthApplicationCreateManyUserInputEnvelope
    connect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
  }

  export type oauthConsentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput> | oauthConsentCreateWithoutUserInput[] | oauthConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutUserInput | oauthConsentCreateOrConnectWithoutUserInput[]
    createMany?: oauthConsentCreateManyUserInputEnvelope
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
  }

  export type passkeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput> | passkeyCreateWithoutUserInput[] | passkeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: passkeyCreateOrConnectWithoutUserInput | passkeyCreateOrConnectWithoutUserInput[]
    createMany?: passkeyCreateManyUserInputEnvelope
    connect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
  }

  export type sessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
  }

  export type twoFactorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput> | twoFactorCreateWithoutUserInput[] | twoFactorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: twoFactorCreateOrConnectWithoutUserInput | twoFactorCreateOrConnectWithoutUserInput[]
    createMany?: twoFactorCreateManyUserInputEnvelope
    connect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type accountUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    upsert?: accountUpsertWithWhereUniqueWithoutUserInput | accountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    set?: accountWhereUniqueInput | accountWhereUniqueInput[]
    disconnect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    delete?: accountWhereUniqueInput | accountWhereUniqueInput[]
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    update?: accountUpdateWithWhereUniqueWithoutUserInput | accountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountUpdateManyWithWhereWithoutUserInput | accountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountScalarWhereInput | accountScalarWhereInput[]
  }

  export type invitationUpdateManyWithoutUserNestedInput = {
    create?: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput> | invitationCreateWithoutUserInput[] | invitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutUserInput | invitationCreateOrConnectWithoutUserInput[]
    upsert?: invitationUpsertWithWhereUniqueWithoutUserInput | invitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: invitationCreateManyUserInputEnvelope
    set?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    disconnect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    delete?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    update?: invitationUpdateWithWhereUniqueWithoutUserInput | invitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: invitationUpdateManyWithWhereWithoutUserInput | invitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: invitationScalarWhereInput | invitationScalarWhereInput[]
  }

  export type memberUpdateManyWithoutUserNestedInput = {
    create?: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput> | memberCreateWithoutUserInput[] | memberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: memberCreateOrConnectWithoutUserInput | memberCreateOrConnectWithoutUserInput[]
    upsert?: memberUpsertWithWhereUniqueWithoutUserInput | memberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: memberCreateManyUserInputEnvelope
    set?: memberWhereUniqueInput | memberWhereUniqueInput[]
    disconnect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    delete?: memberWhereUniqueInput | memberWhereUniqueInput[]
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    update?: memberUpdateWithWhereUniqueWithoutUserInput | memberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: memberUpdateManyWithWhereWithoutUserInput | memberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: memberScalarWhereInput | memberScalarWhereInput[]
  }

  export type oauthAccessTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput> | oauthAccessTokenCreateWithoutUserInput[] | oauthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutUserInput | oauthAccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: oauthAccessTokenUpsertWithWhereUniqueWithoutUserInput | oauthAccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthAccessTokenCreateManyUserInputEnvelope
    set?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    disconnect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    delete?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    update?: oauthAccessTokenUpdateWithWhereUniqueWithoutUserInput | oauthAccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthAccessTokenUpdateManyWithWhereWithoutUserInput | oauthAccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
  }

  export type oauthApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput> | oauthApplicationCreateWithoutUserInput[] | oauthApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutUserInput | oauthApplicationCreateOrConnectWithoutUserInput[]
    upsert?: oauthApplicationUpsertWithWhereUniqueWithoutUserInput | oauthApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthApplicationCreateManyUserInputEnvelope
    set?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    disconnect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    delete?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    connect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    update?: oauthApplicationUpdateWithWhereUniqueWithoutUserInput | oauthApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthApplicationUpdateManyWithWhereWithoutUserInput | oauthApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthApplicationScalarWhereInput | oauthApplicationScalarWhereInput[]
  }

  export type oauthConsentUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput> | oauthConsentCreateWithoutUserInput[] | oauthConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutUserInput | oauthConsentCreateOrConnectWithoutUserInput[]
    upsert?: oauthConsentUpsertWithWhereUniqueWithoutUserInput | oauthConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthConsentCreateManyUserInputEnvelope
    set?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    disconnect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    delete?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    update?: oauthConsentUpdateWithWhereUniqueWithoutUserInput | oauthConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthConsentUpdateManyWithWhereWithoutUserInput | oauthConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
  }

  export type passkeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput> | passkeyCreateWithoutUserInput[] | passkeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: passkeyCreateOrConnectWithoutUserInput | passkeyCreateOrConnectWithoutUserInput[]
    upsert?: passkeyUpsertWithWhereUniqueWithoutUserInput | passkeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: passkeyCreateManyUserInputEnvelope
    set?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    disconnect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    delete?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    connect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    update?: passkeyUpdateWithWhereUniqueWithoutUserInput | passkeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: passkeyUpdateManyWithWhereWithoutUserInput | passkeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: passkeyScalarWhereInput | passkeyScalarWhereInput[]
  }

  export type sessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    upsert?: sessionUpsertWithWhereUniqueWithoutUserInput | sessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    set?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    disconnect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    delete?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    update?: sessionUpdateWithWhereUniqueWithoutUserInput | sessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionUpdateManyWithWhereWithoutUserInput | sessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionScalarWhereInput | sessionScalarWhereInput[]
  }

  export type twoFactorUpdateManyWithoutUserNestedInput = {
    create?: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput> | twoFactorCreateWithoutUserInput[] | twoFactorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: twoFactorCreateOrConnectWithoutUserInput | twoFactorCreateOrConnectWithoutUserInput[]
    upsert?: twoFactorUpsertWithWhereUniqueWithoutUserInput | twoFactorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: twoFactorCreateManyUserInputEnvelope
    set?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    disconnect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    delete?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    connect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    update?: twoFactorUpdateWithWhereUniqueWithoutUserInput | twoFactorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: twoFactorUpdateManyWithWhereWithoutUserInput | twoFactorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: twoFactorScalarWhereInput | twoFactorScalarWhereInput[]
  }

  export type accountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    upsert?: accountUpsertWithWhereUniqueWithoutUserInput | accountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    set?: accountWhereUniqueInput | accountWhereUniqueInput[]
    disconnect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    delete?: accountWhereUniqueInput | accountWhereUniqueInput[]
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    update?: accountUpdateWithWhereUniqueWithoutUserInput | accountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountUpdateManyWithWhereWithoutUserInput | accountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountScalarWhereInput | accountScalarWhereInput[]
  }

  export type invitationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput> | invitationCreateWithoutUserInput[] | invitationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutUserInput | invitationCreateOrConnectWithoutUserInput[]
    upsert?: invitationUpsertWithWhereUniqueWithoutUserInput | invitationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: invitationCreateManyUserInputEnvelope
    set?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    disconnect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    delete?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    update?: invitationUpdateWithWhereUniqueWithoutUserInput | invitationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: invitationUpdateManyWithWhereWithoutUserInput | invitationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: invitationScalarWhereInput | invitationScalarWhereInput[]
  }

  export type memberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput> | memberCreateWithoutUserInput[] | memberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: memberCreateOrConnectWithoutUserInput | memberCreateOrConnectWithoutUserInput[]
    upsert?: memberUpsertWithWhereUniqueWithoutUserInput | memberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: memberCreateManyUserInputEnvelope
    set?: memberWhereUniqueInput | memberWhereUniqueInput[]
    disconnect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    delete?: memberWhereUniqueInput | memberWhereUniqueInput[]
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    update?: memberUpdateWithWhereUniqueWithoutUserInput | memberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: memberUpdateManyWithWhereWithoutUserInput | memberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: memberScalarWhereInput | memberScalarWhereInput[]
  }

  export type oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput> | oauthAccessTokenCreateWithoutUserInput[] | oauthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutUserInput | oauthAccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: oauthAccessTokenUpsertWithWhereUniqueWithoutUserInput | oauthAccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthAccessTokenCreateManyUserInputEnvelope
    set?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    disconnect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    delete?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    update?: oauthAccessTokenUpdateWithWhereUniqueWithoutUserInput | oauthAccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthAccessTokenUpdateManyWithWhereWithoutUserInput | oauthAccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
  }

  export type oauthApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput> | oauthApplicationCreateWithoutUserInput[] | oauthApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutUserInput | oauthApplicationCreateOrConnectWithoutUserInput[]
    upsert?: oauthApplicationUpsertWithWhereUniqueWithoutUserInput | oauthApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthApplicationCreateManyUserInputEnvelope
    set?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    disconnect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    delete?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    connect?: oauthApplicationWhereUniqueInput | oauthApplicationWhereUniqueInput[]
    update?: oauthApplicationUpdateWithWhereUniqueWithoutUserInput | oauthApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthApplicationUpdateManyWithWhereWithoutUserInput | oauthApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthApplicationScalarWhereInput | oauthApplicationScalarWhereInput[]
  }

  export type oauthConsentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput> | oauthConsentCreateWithoutUserInput[] | oauthConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutUserInput | oauthConsentCreateOrConnectWithoutUserInput[]
    upsert?: oauthConsentUpsertWithWhereUniqueWithoutUserInput | oauthConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauthConsentCreateManyUserInputEnvelope
    set?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    disconnect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    delete?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    update?: oauthConsentUpdateWithWhereUniqueWithoutUserInput | oauthConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauthConsentUpdateManyWithWhereWithoutUserInput | oauthConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
  }

  export type passkeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput> | passkeyCreateWithoutUserInput[] | passkeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: passkeyCreateOrConnectWithoutUserInput | passkeyCreateOrConnectWithoutUserInput[]
    upsert?: passkeyUpsertWithWhereUniqueWithoutUserInput | passkeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: passkeyCreateManyUserInputEnvelope
    set?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    disconnect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    delete?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    connect?: passkeyWhereUniqueInput | passkeyWhereUniqueInput[]
    update?: passkeyUpdateWithWhereUniqueWithoutUserInput | passkeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: passkeyUpdateManyWithWhereWithoutUserInput | passkeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: passkeyScalarWhereInput | passkeyScalarWhereInput[]
  }

  export type sessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    upsert?: sessionUpsertWithWhereUniqueWithoutUserInput | sessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    set?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    disconnect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    delete?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    update?: sessionUpdateWithWhereUniqueWithoutUserInput | sessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionUpdateManyWithWhereWithoutUserInput | sessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionScalarWhereInput | sessionScalarWhereInput[]
  }

  export type twoFactorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput> | twoFactorCreateWithoutUserInput[] | twoFactorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: twoFactorCreateOrConnectWithoutUserInput | twoFactorCreateOrConnectWithoutUserInput[]
    upsert?: twoFactorUpsertWithWhereUniqueWithoutUserInput | twoFactorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: twoFactorCreateManyUserInputEnvelope
    set?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    disconnect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    delete?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    connect?: twoFactorWhereUniqueInput | twoFactorWhereUniqueInput[]
    update?: twoFactorUpdateWithWhereUniqueWithoutUserInput | twoFactorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: twoFactorUpdateManyWithWhereWithoutUserInput | twoFactorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: twoFactorScalarWhereInput | twoFactorScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutInvitationInput = {
    create?: XOR<userCreateWithoutInvitationInput, userUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: userCreateOrConnectWithoutInvitationInput
    connect?: userWhereUniqueInput
  }

  export type organizationCreateNestedOneWithoutInvitationInput = {
    create?: XOR<organizationCreateWithoutInvitationInput, organizationUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: organizationCreateOrConnectWithoutInvitationInput
    connect?: organizationWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutInvitationNestedInput = {
    create?: XOR<userCreateWithoutInvitationInput, userUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: userCreateOrConnectWithoutInvitationInput
    upsert?: userUpsertWithoutInvitationInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutInvitationInput, userUpdateWithoutInvitationInput>, userUncheckedUpdateWithoutInvitationInput>
  }

  export type organizationUpdateOneRequiredWithoutInvitationNestedInput = {
    create?: XOR<organizationCreateWithoutInvitationInput, organizationUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: organizationCreateOrConnectWithoutInvitationInput
    upsert?: organizationUpsertWithoutInvitationInput
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutInvitationInput, organizationUpdateWithoutInvitationInput>, organizationUncheckedUpdateWithoutInvitationInput>
  }

  export type organizationCreateNestedOneWithoutMemberInput = {
    create?: XOR<organizationCreateWithoutMemberInput, organizationUncheckedCreateWithoutMemberInput>
    connectOrCreate?: organizationCreateOrConnectWithoutMemberInput
    connect?: organizationWhereUniqueInput
  }

  export type userCreateNestedOneWithoutMemberInput = {
    create?: XOR<userCreateWithoutMemberInput, userUncheckedCreateWithoutMemberInput>
    connectOrCreate?: userCreateOrConnectWithoutMemberInput
    connect?: userWhereUniqueInput
  }

  export type organizationUpdateOneRequiredWithoutMemberNestedInput = {
    create?: XOR<organizationCreateWithoutMemberInput, organizationUncheckedCreateWithoutMemberInput>
    connectOrCreate?: organizationCreateOrConnectWithoutMemberInput
    upsert?: organizationUpsertWithoutMemberInput
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutMemberInput, organizationUpdateWithoutMemberInput>, organizationUncheckedUpdateWithoutMemberInput>
  }

  export type userUpdateOneRequiredWithoutMemberNestedInput = {
    create?: XOR<userCreateWithoutMemberInput, userUncheckedCreateWithoutMemberInput>
    connectOrCreate?: userCreateOrConnectWithoutMemberInput
    upsert?: userUpsertWithoutMemberInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutMemberInput, userUpdateWithoutMemberInput>, userUncheckedUpdateWithoutMemberInput>
  }

  export type oauthApplicationCreateNestedOneWithoutOauthAccessTokenInput = {
    create?: XOR<oauthApplicationCreateWithoutOauthAccessTokenInput, oauthApplicationUncheckedCreateWithoutOauthAccessTokenInput>
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutOauthAccessTokenInput
    connect?: oauthApplicationWhereUniqueInput
  }

  export type userCreateNestedOneWithoutOauthAccessTokenInput = {
    create?: XOR<userCreateWithoutOauthAccessTokenInput, userUncheckedCreateWithoutOauthAccessTokenInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthAccessTokenInput
    connect?: userWhereUniqueInput
  }

  export type oauthApplicationUpdateOneRequiredWithoutOauthAccessTokenNestedInput = {
    create?: XOR<oauthApplicationCreateWithoutOauthAccessTokenInput, oauthApplicationUncheckedCreateWithoutOauthAccessTokenInput>
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutOauthAccessTokenInput
    upsert?: oauthApplicationUpsertWithoutOauthAccessTokenInput
    connect?: oauthApplicationWhereUniqueInput
    update?: XOR<XOR<oauthApplicationUpdateToOneWithWhereWithoutOauthAccessTokenInput, oauthApplicationUpdateWithoutOauthAccessTokenInput>, oauthApplicationUncheckedUpdateWithoutOauthAccessTokenInput>
  }

  export type userUpdateOneWithoutOauthAccessTokenNestedInput = {
    create?: XOR<userCreateWithoutOauthAccessTokenInput, userUncheckedCreateWithoutOauthAccessTokenInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthAccessTokenInput
    upsert?: userUpsertWithoutOauthAccessTokenInput
    disconnect?: userWhereInput | boolean
    delete?: userWhereInput | boolean
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutOauthAccessTokenInput, userUpdateWithoutOauthAccessTokenInput>, userUncheckedUpdateWithoutOauthAccessTokenInput>
  }

  export type oauthAccessTokenCreateNestedManyWithoutOauthApplicationInput = {
    create?: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput> | oauthAccessTokenCreateWithoutOauthApplicationInput[] | oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput | oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput[]
    createMany?: oauthAccessTokenCreateManyOauthApplicationInputEnvelope
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
  }

  export type userCreateNestedOneWithoutOauthApplicationInput = {
    create?: XOR<userCreateWithoutOauthApplicationInput, userUncheckedCreateWithoutOauthApplicationInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthApplicationInput
    connect?: userWhereUniqueInput
  }

  export type oauthConsentCreateNestedManyWithoutOauthApplicationInput = {
    create?: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput> | oauthConsentCreateWithoutOauthApplicationInput[] | oauthConsentUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutOauthApplicationInput | oauthConsentCreateOrConnectWithoutOauthApplicationInput[]
    createMany?: oauthConsentCreateManyOauthApplicationInputEnvelope
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
  }

  export type oauthAccessTokenUncheckedCreateNestedManyWithoutOauthApplicationInput = {
    create?: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput> | oauthAccessTokenCreateWithoutOauthApplicationInput[] | oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput | oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput[]
    createMany?: oauthAccessTokenCreateManyOauthApplicationInputEnvelope
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
  }

  export type oauthConsentUncheckedCreateNestedManyWithoutOauthApplicationInput = {
    create?: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput> | oauthConsentCreateWithoutOauthApplicationInput[] | oauthConsentUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutOauthApplicationInput | oauthConsentCreateOrConnectWithoutOauthApplicationInput[]
    createMany?: oauthConsentCreateManyOauthApplicationInputEnvelope
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
  }

  export type oauthAccessTokenUpdateManyWithoutOauthApplicationNestedInput = {
    create?: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput> | oauthAccessTokenCreateWithoutOauthApplicationInput[] | oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput | oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput[]
    upsert?: oauthAccessTokenUpsertWithWhereUniqueWithoutOauthApplicationInput | oauthAccessTokenUpsertWithWhereUniqueWithoutOauthApplicationInput[]
    createMany?: oauthAccessTokenCreateManyOauthApplicationInputEnvelope
    set?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    disconnect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    delete?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    update?: oauthAccessTokenUpdateWithWhereUniqueWithoutOauthApplicationInput | oauthAccessTokenUpdateWithWhereUniqueWithoutOauthApplicationInput[]
    updateMany?: oauthAccessTokenUpdateManyWithWhereWithoutOauthApplicationInput | oauthAccessTokenUpdateManyWithWhereWithoutOauthApplicationInput[]
    deleteMany?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
  }

  export type userUpdateOneWithoutOauthApplicationNestedInput = {
    create?: XOR<userCreateWithoutOauthApplicationInput, userUncheckedCreateWithoutOauthApplicationInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthApplicationInput
    upsert?: userUpsertWithoutOauthApplicationInput
    disconnect?: userWhereInput | boolean
    delete?: userWhereInput | boolean
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutOauthApplicationInput, userUpdateWithoutOauthApplicationInput>, userUncheckedUpdateWithoutOauthApplicationInput>
  }

  export type oauthConsentUpdateManyWithoutOauthApplicationNestedInput = {
    create?: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput> | oauthConsentCreateWithoutOauthApplicationInput[] | oauthConsentUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutOauthApplicationInput | oauthConsentCreateOrConnectWithoutOauthApplicationInput[]
    upsert?: oauthConsentUpsertWithWhereUniqueWithoutOauthApplicationInput | oauthConsentUpsertWithWhereUniqueWithoutOauthApplicationInput[]
    createMany?: oauthConsentCreateManyOauthApplicationInputEnvelope
    set?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    disconnect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    delete?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    update?: oauthConsentUpdateWithWhereUniqueWithoutOauthApplicationInput | oauthConsentUpdateWithWhereUniqueWithoutOauthApplicationInput[]
    updateMany?: oauthConsentUpdateManyWithWhereWithoutOauthApplicationInput | oauthConsentUpdateManyWithWhereWithoutOauthApplicationInput[]
    deleteMany?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
  }

  export type oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationNestedInput = {
    create?: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput> | oauthAccessTokenCreateWithoutOauthApplicationInput[] | oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput | oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput[]
    upsert?: oauthAccessTokenUpsertWithWhereUniqueWithoutOauthApplicationInput | oauthAccessTokenUpsertWithWhereUniqueWithoutOauthApplicationInput[]
    createMany?: oauthAccessTokenCreateManyOauthApplicationInputEnvelope
    set?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    disconnect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    delete?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    connect?: oauthAccessTokenWhereUniqueInput | oauthAccessTokenWhereUniqueInput[]
    update?: oauthAccessTokenUpdateWithWhereUniqueWithoutOauthApplicationInput | oauthAccessTokenUpdateWithWhereUniqueWithoutOauthApplicationInput[]
    updateMany?: oauthAccessTokenUpdateManyWithWhereWithoutOauthApplicationInput | oauthAccessTokenUpdateManyWithWhereWithoutOauthApplicationInput[]
    deleteMany?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
  }

  export type oauthConsentUncheckedUpdateManyWithoutOauthApplicationNestedInput = {
    create?: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput> | oauthConsentCreateWithoutOauthApplicationInput[] | oauthConsentUncheckedCreateWithoutOauthApplicationInput[]
    connectOrCreate?: oauthConsentCreateOrConnectWithoutOauthApplicationInput | oauthConsentCreateOrConnectWithoutOauthApplicationInput[]
    upsert?: oauthConsentUpsertWithWhereUniqueWithoutOauthApplicationInput | oauthConsentUpsertWithWhereUniqueWithoutOauthApplicationInput[]
    createMany?: oauthConsentCreateManyOauthApplicationInputEnvelope
    set?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    disconnect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    delete?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    connect?: oauthConsentWhereUniqueInput | oauthConsentWhereUniqueInput[]
    update?: oauthConsentUpdateWithWhereUniqueWithoutOauthApplicationInput | oauthConsentUpdateWithWhereUniqueWithoutOauthApplicationInput[]
    updateMany?: oauthConsentUpdateManyWithWhereWithoutOauthApplicationInput | oauthConsentUpdateManyWithWhereWithoutOauthApplicationInput[]
    deleteMany?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
  }

  export type oauthApplicationCreateNestedOneWithoutOauthConsentInput = {
    create?: XOR<oauthApplicationCreateWithoutOauthConsentInput, oauthApplicationUncheckedCreateWithoutOauthConsentInput>
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutOauthConsentInput
    connect?: oauthApplicationWhereUniqueInput
  }

  export type userCreateNestedOneWithoutOauthConsentInput = {
    create?: XOR<userCreateWithoutOauthConsentInput, userUncheckedCreateWithoutOauthConsentInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthConsentInput
    connect?: userWhereUniqueInput
  }

  export type oauthApplicationUpdateOneRequiredWithoutOauthConsentNestedInput = {
    create?: XOR<oauthApplicationCreateWithoutOauthConsentInput, oauthApplicationUncheckedCreateWithoutOauthConsentInput>
    connectOrCreate?: oauthApplicationCreateOrConnectWithoutOauthConsentInput
    upsert?: oauthApplicationUpsertWithoutOauthConsentInput
    connect?: oauthApplicationWhereUniqueInput
    update?: XOR<XOR<oauthApplicationUpdateToOneWithWhereWithoutOauthConsentInput, oauthApplicationUpdateWithoutOauthConsentInput>, oauthApplicationUncheckedUpdateWithoutOauthConsentInput>
  }

  export type userUpdateOneRequiredWithoutOauthConsentNestedInput = {
    create?: XOR<userCreateWithoutOauthConsentInput, userUncheckedCreateWithoutOauthConsentInput>
    connectOrCreate?: userCreateOrConnectWithoutOauthConsentInput
    upsert?: userUpsertWithoutOauthConsentInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutOauthConsentInput, userUpdateWithoutOauthConsentInput>, userUncheckedUpdateWithoutOauthConsentInput>
  }

  export type invitationCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput> | invitationCreateWithoutOrganizationInput[] | invitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutOrganizationInput | invitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: invitationCreateManyOrganizationInputEnvelope
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
  }

  export type memberCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput> | memberCreateWithoutOrganizationInput[] | memberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: memberCreateOrConnectWithoutOrganizationInput | memberCreateOrConnectWithoutOrganizationInput[]
    createMany?: memberCreateManyOrganizationInputEnvelope
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
  }

  export type invitationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput> | invitationCreateWithoutOrganizationInput[] | invitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutOrganizationInput | invitationCreateOrConnectWithoutOrganizationInput[]
    createMany?: invitationCreateManyOrganizationInputEnvelope
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
  }

  export type memberUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput> | memberCreateWithoutOrganizationInput[] | memberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: memberCreateOrConnectWithoutOrganizationInput | memberCreateOrConnectWithoutOrganizationInput[]
    createMany?: memberCreateManyOrganizationInputEnvelope
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
  }

  export type invitationUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput> | invitationCreateWithoutOrganizationInput[] | invitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutOrganizationInput | invitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: invitationUpsertWithWhereUniqueWithoutOrganizationInput | invitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: invitationCreateManyOrganizationInputEnvelope
    set?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    disconnect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    delete?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    update?: invitationUpdateWithWhereUniqueWithoutOrganizationInput | invitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: invitationUpdateManyWithWhereWithoutOrganizationInput | invitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: invitationScalarWhereInput | invitationScalarWhereInput[]
  }

  export type memberUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput> | memberCreateWithoutOrganizationInput[] | memberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: memberCreateOrConnectWithoutOrganizationInput | memberCreateOrConnectWithoutOrganizationInput[]
    upsert?: memberUpsertWithWhereUniqueWithoutOrganizationInput | memberUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: memberCreateManyOrganizationInputEnvelope
    set?: memberWhereUniqueInput | memberWhereUniqueInput[]
    disconnect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    delete?: memberWhereUniqueInput | memberWhereUniqueInput[]
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    update?: memberUpdateWithWhereUniqueWithoutOrganizationInput | memberUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: memberUpdateManyWithWhereWithoutOrganizationInput | memberUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: memberScalarWhereInput | memberScalarWhereInput[]
  }

  export type invitationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput> | invitationCreateWithoutOrganizationInput[] | invitationUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: invitationCreateOrConnectWithoutOrganizationInput | invitationCreateOrConnectWithoutOrganizationInput[]
    upsert?: invitationUpsertWithWhereUniqueWithoutOrganizationInput | invitationUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: invitationCreateManyOrganizationInputEnvelope
    set?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    disconnect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    delete?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    connect?: invitationWhereUniqueInput | invitationWhereUniqueInput[]
    update?: invitationUpdateWithWhereUniqueWithoutOrganizationInput | invitationUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: invitationUpdateManyWithWhereWithoutOrganizationInput | invitationUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: invitationScalarWhereInput | invitationScalarWhereInput[]
  }

  export type memberUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput> | memberCreateWithoutOrganizationInput[] | memberUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: memberCreateOrConnectWithoutOrganizationInput | memberCreateOrConnectWithoutOrganizationInput[]
    upsert?: memberUpsertWithWhereUniqueWithoutOrganizationInput | memberUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: memberCreateManyOrganizationInputEnvelope
    set?: memberWhereUniqueInput | memberWhereUniqueInput[]
    disconnect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    delete?: memberWhereUniqueInput | memberWhereUniqueInput[]
    connect?: memberWhereUniqueInput | memberWhereUniqueInput[]
    update?: memberUpdateWithWhereUniqueWithoutOrganizationInput | memberUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: memberUpdateManyWithWhereWithoutOrganizationInput | memberUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: memberScalarWhereInput | memberScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutPasskeyInput = {
    create?: XOR<userCreateWithoutPasskeyInput, userUncheckedCreateWithoutPasskeyInput>
    connectOrCreate?: userCreateOrConnectWithoutPasskeyInput
    connect?: userWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type userUpdateOneRequiredWithoutPasskeyNestedInput = {
    create?: XOR<userCreateWithoutPasskeyInput, userUncheckedCreateWithoutPasskeyInput>
    connectOrCreate?: userCreateOrConnectWithoutPasskeyInput
    upsert?: userUpsertWithoutPasskeyInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutPasskeyInput, userUpdateWithoutPasskeyInput>, userUncheckedUpdateWithoutPasskeyInput>
  }

  export type userCreateNestedOneWithoutTwoFactorInput = {
    create?: XOR<userCreateWithoutTwoFactorInput, userUncheckedCreateWithoutTwoFactorInput>
    connectOrCreate?: userCreateOrConnectWithoutTwoFactorInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutTwoFactorNestedInput = {
    create?: XOR<userCreateWithoutTwoFactorInput, userUncheckedCreateWithoutTwoFactorInput>
    connectOrCreate?: userCreateOrConnectWithoutTwoFactorInput
    upsert?: userUpsertWithoutTwoFactorInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutTwoFactorInput, userUpdateWithoutTwoFactorInput>, userUncheckedUpdateWithoutTwoFactorInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type userCreateWithoutAccountInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutAccountInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutAccountInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
  }

  export type userUpsertWithoutAccountInput = {
    update: XOR<userUpdateWithoutAccountInput, userUncheckedUpdateWithoutAccountInput>
    create: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutAccountInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutAccountInput, userUncheckedUpdateWithoutAccountInput>
  }

  export type userUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateWithoutSessionInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutSessionInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutSessionInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
  }

  export type userUpsertWithoutSessionInput = {
    update: XOR<userUpdateWithoutSessionInput, userUncheckedUpdateWithoutSessionInput>
    create: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutSessionInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutSessionInput, userUncheckedUpdateWithoutSessionInput>
  }

  export type userUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type accountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type accountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type accountCreateOrConnectWithoutUserInput = {
    where: accountWhereUniqueInput
    create: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput>
  }

  export type accountCreateManyUserInputEnvelope = {
    data: accountCreateManyUserInput | accountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type invitationCreateWithoutUserInput = {
    id: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    organization: organizationCreateNestedOneWithoutInvitationInput
  }

  export type invitationUncheckedCreateWithoutUserInput = {
    id: string
    organizationId: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
  }

  export type invitationCreateOrConnectWithoutUserInput = {
    where: invitationWhereUniqueInput
    create: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput>
  }

  export type invitationCreateManyUserInputEnvelope = {
    data: invitationCreateManyUserInput | invitationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type memberCreateWithoutUserInput = {
    id: string
    role: string
    createdAt: Date | string
    organization: organizationCreateNestedOneWithoutMemberInput
  }

  export type memberUncheckedCreateWithoutUserInput = {
    id: string
    organizationId: string
    role: string
    createdAt: Date | string
  }

  export type memberCreateOrConnectWithoutUserInput = {
    where: memberWhereUniqueInput
    create: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput>
  }

  export type memberCreateManyUserInputEnvelope = {
    data: memberCreateManyUserInput | memberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type oauthAccessTokenCreateWithoutUserInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    oauthApplication: oauthApplicationCreateNestedOneWithoutOauthAccessTokenInput
  }

  export type oauthAccessTokenUncheckedCreateWithoutUserInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    clientId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthAccessTokenCreateOrConnectWithoutUserInput = {
    where: oauthAccessTokenWhereUniqueInput
    create: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput>
  }

  export type oauthAccessTokenCreateManyUserInputEnvelope = {
    data: oauthAccessTokenCreateManyUserInput | oauthAccessTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type oauthApplicationCreateWithoutUserInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutOauthApplicationInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutOauthApplicationInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationCreateOrConnectWithoutUserInput = {
    where: oauthApplicationWhereUniqueInput
    create: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput>
  }

  export type oauthApplicationCreateManyUserInputEnvelope = {
    data: oauthApplicationCreateManyUserInput | oauthApplicationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type oauthConsentCreateWithoutUserInput = {
    id: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
    oauthApplication: oauthApplicationCreateNestedOneWithoutOauthConsentInput
  }

  export type oauthConsentUncheckedCreateWithoutUserInput = {
    id: string
    clientId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type oauthConsentCreateOrConnectWithoutUserInput = {
    where: oauthConsentWhereUniqueInput
    create: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput>
  }

  export type oauthConsentCreateManyUserInputEnvelope = {
    data: oauthConsentCreateManyUserInput | oauthConsentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type passkeyCreateWithoutUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
  }

  export type passkeyUncheckedCreateWithoutUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
  }

  export type passkeyCreateOrConnectWithoutUserInput = {
    where: passkeyWhereUniqueInput
    create: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput>
  }

  export type passkeyCreateManyUserInputEnvelope = {
    data: passkeyCreateManyUserInput | passkeyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type sessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    activeOrganizationId?: string | null
  }

  export type sessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    activeOrganizationId?: string | null
  }

  export type sessionCreateOrConnectWithoutUserInput = {
    where: sessionWhereUniqueInput
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionCreateManyUserInputEnvelope = {
    data: sessionCreateManyUserInput | sessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type twoFactorCreateWithoutUserInput = {
    id: string
    secret: string
    backupCodes: string
  }

  export type twoFactorUncheckedCreateWithoutUserInput = {
    id: string
    secret: string
    backupCodes: string
  }

  export type twoFactorCreateOrConnectWithoutUserInput = {
    where: twoFactorWhereUniqueInput
    create: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput>
  }

  export type twoFactorCreateManyUserInputEnvelope = {
    data: twoFactorCreateManyUserInput | twoFactorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type accountUpsertWithWhereUniqueWithoutUserInput = {
    where: accountWhereUniqueInput
    update: XOR<accountUpdateWithoutUserInput, accountUncheckedUpdateWithoutUserInput>
    create: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput>
  }

  export type accountUpdateWithWhereUniqueWithoutUserInput = {
    where: accountWhereUniqueInput
    data: XOR<accountUpdateWithoutUserInput, accountUncheckedUpdateWithoutUserInput>
  }

  export type accountUpdateManyWithWhereWithoutUserInput = {
    where: accountScalarWhereInput
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyWithoutUserInput>
  }

  export type accountScalarWhereInput = {
    AND?: accountScalarWhereInput | accountScalarWhereInput[]
    OR?: accountScalarWhereInput[]
    NOT?: accountScalarWhereInput | accountScalarWhereInput[]
    id?: StringFilter<"account"> | string
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: StringFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
  }

  export type invitationUpsertWithWhereUniqueWithoutUserInput = {
    where: invitationWhereUniqueInput
    update: XOR<invitationUpdateWithoutUserInput, invitationUncheckedUpdateWithoutUserInput>
    create: XOR<invitationCreateWithoutUserInput, invitationUncheckedCreateWithoutUserInput>
  }

  export type invitationUpdateWithWhereUniqueWithoutUserInput = {
    where: invitationWhereUniqueInput
    data: XOR<invitationUpdateWithoutUserInput, invitationUncheckedUpdateWithoutUserInput>
  }

  export type invitationUpdateManyWithWhereWithoutUserInput = {
    where: invitationScalarWhereInput
    data: XOR<invitationUpdateManyMutationInput, invitationUncheckedUpdateManyWithoutUserInput>
  }

  export type invitationScalarWhereInput = {
    AND?: invitationScalarWhereInput | invitationScalarWhereInput[]
    OR?: invitationScalarWhereInput[]
    NOT?: invitationScalarWhereInput | invitationScalarWhereInput[]
    id?: StringFilter<"invitation"> | string
    organizationId?: StringFilter<"invitation"> | string
    email?: StringFilter<"invitation"> | string
    role?: StringNullableFilter<"invitation"> | string | null
    status?: StringFilter<"invitation"> | string
    expiresAt?: DateTimeFilter<"invitation"> | Date | string
    inviterId?: StringFilter<"invitation"> | string
  }

  export type memberUpsertWithWhereUniqueWithoutUserInput = {
    where: memberWhereUniqueInput
    update: XOR<memberUpdateWithoutUserInput, memberUncheckedUpdateWithoutUserInput>
    create: XOR<memberCreateWithoutUserInput, memberUncheckedCreateWithoutUserInput>
  }

  export type memberUpdateWithWhereUniqueWithoutUserInput = {
    where: memberWhereUniqueInput
    data: XOR<memberUpdateWithoutUserInput, memberUncheckedUpdateWithoutUserInput>
  }

  export type memberUpdateManyWithWhereWithoutUserInput = {
    where: memberScalarWhereInput
    data: XOR<memberUpdateManyMutationInput, memberUncheckedUpdateManyWithoutUserInput>
  }

  export type memberScalarWhereInput = {
    AND?: memberScalarWhereInput | memberScalarWhereInput[]
    OR?: memberScalarWhereInput[]
    NOT?: memberScalarWhereInput | memberScalarWhereInput[]
    id?: StringFilter<"member"> | string
    organizationId?: StringFilter<"member"> | string
    userId?: StringFilter<"member"> | string
    role?: StringFilter<"member"> | string
    createdAt?: DateTimeFilter<"member"> | Date | string
  }

  export type oauthAccessTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: oauthAccessTokenWhereUniqueInput
    update: XOR<oauthAccessTokenUpdateWithoutUserInput, oauthAccessTokenUncheckedUpdateWithoutUserInput>
    create: XOR<oauthAccessTokenCreateWithoutUserInput, oauthAccessTokenUncheckedCreateWithoutUserInput>
  }

  export type oauthAccessTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: oauthAccessTokenWhereUniqueInput
    data: XOR<oauthAccessTokenUpdateWithoutUserInput, oauthAccessTokenUncheckedUpdateWithoutUserInput>
  }

  export type oauthAccessTokenUpdateManyWithWhereWithoutUserInput = {
    where: oauthAccessTokenScalarWhereInput
    data: XOR<oauthAccessTokenUpdateManyMutationInput, oauthAccessTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type oauthAccessTokenScalarWhereInput = {
    AND?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
    OR?: oauthAccessTokenScalarWhereInput[]
    NOT?: oauthAccessTokenScalarWhereInput | oauthAccessTokenScalarWhereInput[]
    id?: StringFilter<"oauthAccessToken"> | string
    accessToken?: StringFilter<"oauthAccessToken"> | string
    refreshToken?: StringFilter<"oauthAccessToken"> | string
    accessTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    refreshTokenExpiresAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    clientId?: StringFilter<"oauthAccessToken"> | string
    userId?: StringNullableFilter<"oauthAccessToken"> | string | null
    scopes?: StringFilter<"oauthAccessToken"> | string
    createdAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"oauthAccessToken"> | Date | string
  }

  export type oauthApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: oauthApplicationWhereUniqueInput
    update: XOR<oauthApplicationUpdateWithoutUserInput, oauthApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<oauthApplicationCreateWithoutUserInput, oauthApplicationUncheckedCreateWithoutUserInput>
  }

  export type oauthApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: oauthApplicationWhereUniqueInput
    data: XOR<oauthApplicationUpdateWithoutUserInput, oauthApplicationUncheckedUpdateWithoutUserInput>
  }

  export type oauthApplicationUpdateManyWithWhereWithoutUserInput = {
    where: oauthApplicationScalarWhereInput
    data: XOR<oauthApplicationUpdateManyMutationInput, oauthApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type oauthApplicationScalarWhereInput = {
    AND?: oauthApplicationScalarWhereInput | oauthApplicationScalarWhereInput[]
    OR?: oauthApplicationScalarWhereInput[]
    NOT?: oauthApplicationScalarWhereInput | oauthApplicationScalarWhereInput[]
    id?: StringFilter<"oauthApplication"> | string
    name?: StringFilter<"oauthApplication"> | string
    icon?: StringNullableFilter<"oauthApplication"> | string | null
    metadata?: StringNullableFilter<"oauthApplication"> | string | null
    clientId?: StringFilter<"oauthApplication"> | string
    clientSecret?: StringNullableFilter<"oauthApplication"> | string | null
    redirectURLs?: StringFilter<"oauthApplication"> | string
    type?: StringFilter<"oauthApplication"> | string
    disabled?: BoolNullableFilter<"oauthApplication"> | boolean | null
    userId?: StringNullableFilter<"oauthApplication"> | string | null
    createdAt?: DateTimeFilter<"oauthApplication"> | Date | string
    updatedAt?: DateTimeFilter<"oauthApplication"> | Date | string
  }

  export type oauthConsentUpsertWithWhereUniqueWithoutUserInput = {
    where: oauthConsentWhereUniqueInput
    update: XOR<oauthConsentUpdateWithoutUserInput, oauthConsentUncheckedUpdateWithoutUserInput>
    create: XOR<oauthConsentCreateWithoutUserInput, oauthConsentUncheckedCreateWithoutUserInput>
  }

  export type oauthConsentUpdateWithWhereUniqueWithoutUserInput = {
    where: oauthConsentWhereUniqueInput
    data: XOR<oauthConsentUpdateWithoutUserInput, oauthConsentUncheckedUpdateWithoutUserInput>
  }

  export type oauthConsentUpdateManyWithWhereWithoutUserInput = {
    where: oauthConsentScalarWhereInput
    data: XOR<oauthConsentUpdateManyMutationInput, oauthConsentUncheckedUpdateManyWithoutUserInput>
  }

  export type oauthConsentScalarWhereInput = {
    AND?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
    OR?: oauthConsentScalarWhereInput[]
    NOT?: oauthConsentScalarWhereInput | oauthConsentScalarWhereInput[]
    id?: StringFilter<"oauthConsent"> | string
    clientId?: StringFilter<"oauthConsent"> | string
    userId?: StringFilter<"oauthConsent"> | string
    scopes?: StringFilter<"oauthConsent"> | string
    createdAt?: DateTimeFilter<"oauthConsent"> | Date | string
    updatedAt?: DateTimeFilter<"oauthConsent"> | Date | string
    consentGiven?: BoolFilter<"oauthConsent"> | boolean
  }

  export type passkeyUpsertWithWhereUniqueWithoutUserInput = {
    where: passkeyWhereUniqueInput
    update: XOR<passkeyUpdateWithoutUserInput, passkeyUncheckedUpdateWithoutUserInput>
    create: XOR<passkeyCreateWithoutUserInput, passkeyUncheckedCreateWithoutUserInput>
  }

  export type passkeyUpdateWithWhereUniqueWithoutUserInput = {
    where: passkeyWhereUniqueInput
    data: XOR<passkeyUpdateWithoutUserInput, passkeyUncheckedUpdateWithoutUserInput>
  }

  export type passkeyUpdateManyWithWhereWithoutUserInput = {
    where: passkeyScalarWhereInput
    data: XOR<passkeyUpdateManyMutationInput, passkeyUncheckedUpdateManyWithoutUserInput>
  }

  export type passkeyScalarWhereInput = {
    AND?: passkeyScalarWhereInput | passkeyScalarWhereInput[]
    OR?: passkeyScalarWhereInput[]
    NOT?: passkeyScalarWhereInput | passkeyScalarWhereInput[]
    id?: StringFilter<"passkey"> | string
    name?: StringNullableFilter<"passkey"> | string | null
    publicKey?: StringFilter<"passkey"> | string
    userId?: StringFilter<"passkey"> | string
    credentialID?: StringFilter<"passkey"> | string
    counter?: IntFilter<"passkey"> | number
    deviceType?: StringFilter<"passkey"> | string
    backedUp?: BoolFilter<"passkey"> | boolean
    transports?: StringNullableFilter<"passkey"> | string | null
    createdAt?: DateTimeNullableFilter<"passkey"> | Date | string | null
    aaguid?: StringNullableFilter<"passkey"> | string | null
  }

  export type sessionUpsertWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    update: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionUpdateWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    data: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
  }

  export type sessionUpdateManyWithWhereWithoutUserInput = {
    where: sessionScalarWhereInput
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyWithoutUserInput>
  }

  export type sessionScalarWhereInput = {
    AND?: sessionScalarWhereInput | sessionScalarWhereInput[]
    OR?: sessionScalarWhereInput[]
    NOT?: sessionScalarWhereInput | sessionScalarWhereInput[]
    id?: StringFilter<"session"> | string
    expiresAt?: DateTimeFilter<"session"> | Date | string
    token?: StringFilter<"session"> | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: StringFilter<"session"> | string
    activeOrganizationId?: StringNullableFilter<"session"> | string | null
  }

  export type twoFactorUpsertWithWhereUniqueWithoutUserInput = {
    where: twoFactorWhereUniqueInput
    update: XOR<twoFactorUpdateWithoutUserInput, twoFactorUncheckedUpdateWithoutUserInput>
    create: XOR<twoFactorCreateWithoutUserInput, twoFactorUncheckedCreateWithoutUserInput>
  }

  export type twoFactorUpdateWithWhereUniqueWithoutUserInput = {
    where: twoFactorWhereUniqueInput
    data: XOR<twoFactorUpdateWithoutUserInput, twoFactorUncheckedUpdateWithoutUserInput>
  }

  export type twoFactorUpdateManyWithWhereWithoutUserInput = {
    where: twoFactorScalarWhereInput
    data: XOR<twoFactorUpdateManyMutationInput, twoFactorUncheckedUpdateManyWithoutUserInput>
  }

  export type twoFactorScalarWhereInput = {
    AND?: twoFactorScalarWhereInput | twoFactorScalarWhereInput[]
    OR?: twoFactorScalarWhereInput[]
    NOT?: twoFactorScalarWhereInput | twoFactorScalarWhereInput[]
    id?: StringFilter<"twoFactor"> | string
    secret?: StringFilter<"twoFactor"> | string
    backupCodes?: StringFilter<"twoFactor"> | string
    userId?: StringFilter<"twoFactor"> | string
  }

  export type userCreateWithoutInvitationInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutInvitationInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutInvitationInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutInvitationInput, userUncheckedCreateWithoutInvitationInput>
  }

  export type organizationCreateWithoutInvitationInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    member?: memberCreateNestedManyWithoutOrganizationInput
  }

  export type organizationUncheckedCreateWithoutInvitationInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    member?: memberUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type organizationCreateOrConnectWithoutInvitationInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutInvitationInput, organizationUncheckedCreateWithoutInvitationInput>
  }

  export type userUpsertWithoutInvitationInput = {
    update: XOR<userUpdateWithoutInvitationInput, userUncheckedUpdateWithoutInvitationInput>
    create: XOR<userCreateWithoutInvitationInput, userUncheckedCreateWithoutInvitationInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutInvitationInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutInvitationInput, userUncheckedUpdateWithoutInvitationInput>
  }

  export type userUpdateWithoutInvitationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutInvitationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type organizationUpsertWithoutInvitationInput = {
    update: XOR<organizationUpdateWithoutInvitationInput, organizationUncheckedUpdateWithoutInvitationInput>
    create: XOR<organizationCreateWithoutInvitationInput, organizationUncheckedCreateWithoutInvitationInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutInvitationInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutInvitationInput, organizationUncheckedUpdateWithoutInvitationInput>
  }

  export type organizationUpdateWithoutInvitationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    member?: memberUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutInvitationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    member?: memberUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationCreateWithoutMemberInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    invitation?: invitationCreateNestedManyWithoutOrganizationInput
  }

  export type organizationUncheckedCreateWithoutMemberInput = {
    id: string
    name: string
    slug: string
    logo?: string | null
    createdAt: Date | string
    metadata?: string | null
    invitation?: invitationUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type organizationCreateOrConnectWithoutMemberInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutMemberInput, organizationUncheckedCreateWithoutMemberInput>
  }

  export type userCreateWithoutMemberInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutMemberInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutMemberInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutMemberInput, userUncheckedCreateWithoutMemberInput>
  }

  export type organizationUpsertWithoutMemberInput = {
    update: XOR<organizationUpdateWithoutMemberInput, organizationUncheckedUpdateWithoutMemberInput>
    create: XOR<organizationCreateWithoutMemberInput, organizationUncheckedCreateWithoutMemberInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutMemberInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutMemberInput, organizationUncheckedUpdateWithoutMemberInput>
  }

  export type organizationUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    invitation?: invitationUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type userUpsertWithoutMemberInput = {
    update: XOR<userUpdateWithoutMemberInput, userUncheckedUpdateWithoutMemberInput>
    create: XOR<userCreateWithoutMemberInput, userUncheckedCreateWithoutMemberInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutMemberInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutMemberInput, userUncheckedUpdateWithoutMemberInput>
  }

  export type userUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type oauthApplicationCreateWithoutOauthAccessTokenInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
    user?: userCreateNestedOneWithoutOauthApplicationInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationUncheckedCreateWithoutOauthAccessTokenInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    userId?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationCreateOrConnectWithoutOauthAccessTokenInput = {
    where: oauthApplicationWhereUniqueInput
    create: XOR<oauthApplicationCreateWithoutOauthAccessTokenInput, oauthApplicationUncheckedCreateWithoutOauthAccessTokenInput>
  }

  export type userCreateWithoutOauthAccessTokenInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutOauthAccessTokenInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutOauthAccessTokenInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutOauthAccessTokenInput, userUncheckedCreateWithoutOauthAccessTokenInput>
  }

  export type oauthApplicationUpsertWithoutOauthAccessTokenInput = {
    update: XOR<oauthApplicationUpdateWithoutOauthAccessTokenInput, oauthApplicationUncheckedUpdateWithoutOauthAccessTokenInput>
    create: XOR<oauthApplicationCreateWithoutOauthAccessTokenInput, oauthApplicationUncheckedCreateWithoutOauthAccessTokenInput>
    where?: oauthApplicationWhereInput
  }

  export type oauthApplicationUpdateToOneWithWhereWithoutOauthAccessTokenInput = {
    where?: oauthApplicationWhereInput
    data: XOR<oauthApplicationUpdateWithoutOauthAccessTokenInput, oauthApplicationUncheckedUpdateWithoutOauthAccessTokenInput>
  }

  export type oauthApplicationUpdateWithoutOauthAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneWithoutOauthApplicationNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationUncheckedUpdateWithoutOauthAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutOauthApplicationNestedInput
  }

  export type userUpsertWithoutOauthAccessTokenInput = {
    update: XOR<userUpdateWithoutOauthAccessTokenInput, userUncheckedUpdateWithoutOauthAccessTokenInput>
    create: XOR<userCreateWithoutOauthAccessTokenInput, userUncheckedCreateWithoutOauthAccessTokenInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutOauthAccessTokenInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutOauthAccessTokenInput, userUncheckedUpdateWithoutOauthAccessTokenInput>
  }

  export type userUpdateWithoutOauthAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutOauthAccessTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type oauthAccessTokenCreateWithoutOauthApplicationInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    user?: userCreateNestedOneWithoutOauthAccessTokenInput
  }

  export type oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    userId?: string | null
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthAccessTokenCreateOrConnectWithoutOauthApplicationInput = {
    where: oauthAccessTokenWhereUniqueInput
    create: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput>
  }

  export type oauthAccessTokenCreateManyOauthApplicationInputEnvelope = {
    data: oauthAccessTokenCreateManyOauthApplicationInput | oauthAccessTokenCreateManyOauthApplicationInput[]
    skipDuplicates?: boolean
  }

  export type userCreateWithoutOauthApplicationInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutOauthApplicationInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutOauthApplicationInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutOauthApplicationInput, userUncheckedCreateWithoutOauthApplicationInput>
  }

  export type oauthConsentCreateWithoutOauthApplicationInput = {
    id: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
    user: userCreateNestedOneWithoutOauthConsentInput
  }

  export type oauthConsentUncheckedCreateWithoutOauthApplicationInput = {
    id: string
    userId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type oauthConsentCreateOrConnectWithoutOauthApplicationInput = {
    where: oauthConsentWhereUniqueInput
    create: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput>
  }

  export type oauthConsentCreateManyOauthApplicationInputEnvelope = {
    data: oauthConsentCreateManyOauthApplicationInput | oauthConsentCreateManyOauthApplicationInput[]
    skipDuplicates?: boolean
  }

  export type oauthAccessTokenUpsertWithWhereUniqueWithoutOauthApplicationInput = {
    where: oauthAccessTokenWhereUniqueInput
    update: XOR<oauthAccessTokenUpdateWithoutOauthApplicationInput, oauthAccessTokenUncheckedUpdateWithoutOauthApplicationInput>
    create: XOR<oauthAccessTokenCreateWithoutOauthApplicationInput, oauthAccessTokenUncheckedCreateWithoutOauthApplicationInput>
  }

  export type oauthAccessTokenUpdateWithWhereUniqueWithoutOauthApplicationInput = {
    where: oauthAccessTokenWhereUniqueInput
    data: XOR<oauthAccessTokenUpdateWithoutOauthApplicationInput, oauthAccessTokenUncheckedUpdateWithoutOauthApplicationInput>
  }

  export type oauthAccessTokenUpdateManyWithWhereWithoutOauthApplicationInput = {
    where: oauthAccessTokenScalarWhereInput
    data: XOR<oauthAccessTokenUpdateManyMutationInput, oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationInput>
  }

  export type userUpsertWithoutOauthApplicationInput = {
    update: XOR<userUpdateWithoutOauthApplicationInput, userUncheckedUpdateWithoutOauthApplicationInput>
    create: XOR<userCreateWithoutOauthApplicationInput, userUncheckedCreateWithoutOauthApplicationInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutOauthApplicationInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutOauthApplicationInput, userUncheckedUpdateWithoutOauthApplicationInput>
  }

  export type userUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type oauthConsentUpsertWithWhereUniqueWithoutOauthApplicationInput = {
    where: oauthConsentWhereUniqueInput
    update: XOR<oauthConsentUpdateWithoutOauthApplicationInput, oauthConsentUncheckedUpdateWithoutOauthApplicationInput>
    create: XOR<oauthConsentCreateWithoutOauthApplicationInput, oauthConsentUncheckedCreateWithoutOauthApplicationInput>
  }

  export type oauthConsentUpdateWithWhereUniqueWithoutOauthApplicationInput = {
    where: oauthConsentWhereUniqueInput
    data: XOR<oauthConsentUpdateWithoutOauthApplicationInput, oauthConsentUncheckedUpdateWithoutOauthApplicationInput>
  }

  export type oauthConsentUpdateManyWithWhereWithoutOauthApplicationInput = {
    where: oauthConsentScalarWhereInput
    data: XOR<oauthConsentUpdateManyMutationInput, oauthConsentUncheckedUpdateManyWithoutOauthApplicationInput>
  }

  export type oauthApplicationCreateWithoutOauthConsentInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutOauthApplicationInput
    user?: userCreateNestedOneWithoutOauthApplicationInput
  }

  export type oauthApplicationUncheckedCreateWithoutOauthConsentInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    userId?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutOauthApplicationInput
  }

  export type oauthApplicationCreateOrConnectWithoutOauthConsentInput = {
    where: oauthApplicationWhereUniqueInput
    create: XOR<oauthApplicationCreateWithoutOauthConsentInput, oauthApplicationUncheckedCreateWithoutOauthConsentInput>
  }

  export type userCreateWithoutOauthConsentInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutOauthConsentInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutOauthConsentInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutOauthConsentInput, userUncheckedCreateWithoutOauthConsentInput>
  }

  export type oauthApplicationUpsertWithoutOauthConsentInput = {
    update: XOR<oauthApplicationUpdateWithoutOauthConsentInput, oauthApplicationUncheckedUpdateWithoutOauthConsentInput>
    create: XOR<oauthApplicationCreateWithoutOauthConsentInput, oauthApplicationUncheckedCreateWithoutOauthConsentInput>
    where?: oauthApplicationWhereInput
  }

  export type oauthApplicationUpdateToOneWithWhereWithoutOauthConsentInput = {
    where?: oauthApplicationWhereInput
    data: XOR<oauthApplicationUpdateWithoutOauthConsentInput, oauthApplicationUncheckedUpdateWithoutOauthConsentInput>
  }

  export type oauthApplicationUpdateWithoutOauthConsentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutOauthApplicationNestedInput
    user?: userUpdateOneWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationUncheckedUpdateWithoutOauthConsentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationNestedInput
  }

  export type userUpsertWithoutOauthConsentInput = {
    update: XOR<userUpdateWithoutOauthConsentInput, userUncheckedUpdateWithoutOauthConsentInput>
    create: XOR<userCreateWithoutOauthConsentInput, userUncheckedCreateWithoutOauthConsentInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutOauthConsentInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutOauthConsentInput, userUncheckedUpdateWithoutOauthConsentInput>
  }

  export type userUpdateWithoutOauthConsentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutOauthConsentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type invitationCreateWithoutOrganizationInput = {
    id: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    user: userCreateNestedOneWithoutInvitationInput
  }

  export type invitationUncheckedCreateWithoutOrganizationInput = {
    id: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    inviterId: string
  }

  export type invitationCreateOrConnectWithoutOrganizationInput = {
    where: invitationWhereUniqueInput
    create: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput>
  }

  export type invitationCreateManyOrganizationInputEnvelope = {
    data: invitationCreateManyOrganizationInput | invitationCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type memberCreateWithoutOrganizationInput = {
    id: string
    role: string
    createdAt: Date | string
    user: userCreateNestedOneWithoutMemberInput
  }

  export type memberUncheckedCreateWithoutOrganizationInput = {
    id: string
    userId: string
    role: string
    createdAt: Date | string
  }

  export type memberCreateOrConnectWithoutOrganizationInput = {
    where: memberWhereUniqueInput
    create: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput>
  }

  export type memberCreateManyOrganizationInputEnvelope = {
    data: memberCreateManyOrganizationInput | memberCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type invitationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: invitationWhereUniqueInput
    update: XOR<invitationUpdateWithoutOrganizationInput, invitationUncheckedUpdateWithoutOrganizationInput>
    create: XOR<invitationCreateWithoutOrganizationInput, invitationUncheckedCreateWithoutOrganizationInput>
  }

  export type invitationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: invitationWhereUniqueInput
    data: XOR<invitationUpdateWithoutOrganizationInput, invitationUncheckedUpdateWithoutOrganizationInput>
  }

  export type invitationUpdateManyWithWhereWithoutOrganizationInput = {
    where: invitationScalarWhereInput
    data: XOR<invitationUpdateManyMutationInput, invitationUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type memberUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: memberWhereUniqueInput
    update: XOR<memberUpdateWithoutOrganizationInput, memberUncheckedUpdateWithoutOrganizationInput>
    create: XOR<memberCreateWithoutOrganizationInput, memberUncheckedCreateWithoutOrganizationInput>
  }

  export type memberUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: memberWhereUniqueInput
    data: XOR<memberUpdateWithoutOrganizationInput, memberUncheckedUpdateWithoutOrganizationInput>
  }

  export type memberUpdateManyWithWhereWithoutOrganizationInput = {
    where: memberScalarWhereInput
    data: XOR<memberUpdateManyMutationInput, memberUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type userCreateWithoutPasskeyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutPasskeyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    twoFactor?: twoFactorUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutPasskeyInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPasskeyInput, userUncheckedCreateWithoutPasskeyInput>
  }

  export type userUpsertWithoutPasskeyInput = {
    update: XOR<userUpdateWithoutPasskeyInput, userUncheckedUpdateWithoutPasskeyInput>
    create: XOR<userCreateWithoutPasskeyInput, userUncheckedCreateWithoutPasskeyInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutPasskeyInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutPasskeyInput, userUncheckedUpdateWithoutPasskeyInput>
  }

  export type userUpdateWithoutPasskeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutPasskeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    twoFactor?: twoFactorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateWithoutTwoFactorInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountCreateNestedManyWithoutUserInput
    invitation?: invitationCreateNestedManyWithoutUserInput
    member?: memberCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentCreateNestedManyWithoutUserInput
    passkey?: passkeyCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutTwoFactorInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    twoFactorEnabled?: boolean | null
    displayName?: string | null
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    invitation?: invitationUncheckedCreateNestedManyWithoutUserInput
    member?: memberUncheckedCreateNestedManyWithoutUserInput
    oauthAccessToken?: oauthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauthApplication?: oauthApplicationUncheckedCreateNestedManyWithoutUserInput
    oauthConsent?: oauthConsentUncheckedCreateNestedManyWithoutUserInput
    passkey?: passkeyUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutTwoFactorInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutTwoFactorInput, userUncheckedCreateWithoutTwoFactorInput>
  }

  export type userUpsertWithoutTwoFactorInput = {
    update: XOR<userUpdateWithoutTwoFactorInput, userUncheckedUpdateWithoutTwoFactorInput>
    create: XOR<userCreateWithoutTwoFactorInput, userUncheckedCreateWithoutTwoFactorInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutTwoFactorInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutTwoFactorInput, userUncheckedUpdateWithoutTwoFactorInput>
  }

  export type userUpdateWithoutTwoFactorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUpdateManyWithoutUserNestedInput
    invitation?: invitationUpdateManyWithoutUserNestedInput
    member?: memberUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutUserNestedInput
    passkey?: passkeyUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutTwoFactorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    twoFactorEnabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    invitation?: invitationUncheckedUpdateManyWithoutUserNestedInput
    member?: memberUncheckedUpdateManyWithoutUserNestedInput
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthApplication?: oauthApplicationUncheckedUpdateManyWithoutUserNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutUserNestedInput
    passkey?: passkeyUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type accountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type invitationCreateManyUserInput = {
    id: string
    organizationId: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
  }

  export type memberCreateManyUserInput = {
    id: string
    organizationId: string
    role: string
    createdAt: Date | string
  }

  export type oauthAccessTokenCreateManyUserInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    clientId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthApplicationCreateManyUserInput = {
    id: string
    name: string
    icon?: string | null
    metadata?: string | null
    clientId: string
    clientSecret?: string | null
    redirectURLs: string
    type: string
    disabled?: boolean | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthConsentCreateManyUserInput = {
    id: string
    clientId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type passkeyCreateManyUserInput = {
    id: string
    name?: string | null
    publicKey: string
    credentialID: string
    counter: number
    deviceType: string
    backedUp: boolean
    transports?: string | null
    createdAt?: Date | string | null
    aaguid?: string | null
  }

  export type sessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    activeOrganizationId?: string | null
  }

  export type twoFactorCreateManyUserInput = {
    id: string
    secret: string
    backupCodes: string
  }

  export type accountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type invitationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: organizationUpdateOneRequiredWithoutInvitationNestedInput
  }

  export type invitationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type invitationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type memberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: organizationUpdateOneRequiredWithoutMemberNestedInput
  }

  export type memberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type memberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthApplication?: oauthApplicationUpdateOneRequiredWithoutOauthAccessTokenNestedInput
  }

  export type oauthAccessTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthApplicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUpdateManyWithoutOauthApplicationNestedInput
    oauthConsent?: oauthConsentUpdateManyWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthAccessToken?: oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationNestedInput
    oauthConsent?: oauthConsentUncheckedUpdateManyWithoutOauthApplicationNestedInput
  }

  export type oauthApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    redirectURLs?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthConsentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
    oauthApplication?: oauthApplicationUpdateOneRequiredWithoutOauthConsentNestedInput
  }

  export type oauthConsentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type oauthConsentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type passkeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type passkeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type passkeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    publicKey?: StringFieldUpdateOperationsInput | string
    credentialID?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    deviceType?: StringFieldUpdateOperationsInput | string
    backedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aaguid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    activeOrganizationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type twoFactorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
  }

  export type twoFactorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
  }

  export type twoFactorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    backupCodes?: StringFieldUpdateOperationsInput | string
  }

  export type oauthAccessTokenCreateManyOauthApplicationInput = {
    id: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: Date | string
    refreshTokenExpiresAt: Date | string
    userId?: string | null
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type oauthConsentCreateManyOauthApplicationInput = {
    id: string
    userId: string
    scopes: string
    createdAt: Date | string
    updatedAt: Date | string
    consentGiven: boolean
  }

  export type oauthAccessTokenUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneWithoutOauthAccessTokenNestedInput
  }

  export type oauthAccessTokenUncheckedUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthAccessTokenUncheckedUpdateManyWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokenExpiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauthConsentUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
    user?: userUpdateOneRequiredWithoutOauthConsentNestedInput
  }

  export type oauthConsentUncheckedUpdateWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type oauthConsentUncheckedUpdateManyWithoutOauthApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consentGiven?: BoolFieldUpdateOperationsInput | boolean
  }

  export type invitationCreateManyOrganizationInput = {
    id: string
    email: string
    role?: string | null
    status: string
    expiresAt: Date | string
    inviterId: string
  }

  export type memberCreateManyOrganizationInput = {
    id: string
    userId: string
    role: string
    createdAt: Date | string
  }

  export type invitationUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutInvitationNestedInput
  }

  export type invitationUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviterId?: StringFieldUpdateOperationsInput | string
  }

  export type invitationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inviterId?: StringFieldUpdateOperationsInput | string
  }

  export type memberUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutMemberNestedInput
  }

  export type memberUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type memberUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}