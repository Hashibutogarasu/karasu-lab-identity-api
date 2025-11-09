alter table "session" add column "activeOrganizationId" text;

create table "oauthApplication" ("id" text not null primary key, "name" text not null, "icon" text, "metadata" text, "clientId" text not null unique, "clientSecret" text, "redirectURLs" text not null, "type" text not null, "disabled" boolean, "userId" text references "user" ("id") on delete cascade, "createdAt" timestamptz not null, "updatedAt" timestamptz not null);

create table "oauthAccessToken" ("id" text not null primary key, "accessToken" text not null unique, "refreshToken" text not null unique, "accessTokenExpiresAt" timestamptz not null, "refreshTokenExpiresAt" timestamptz not null, "clientId" text not null references "oauthApplication" ("clientId") on delete cascade, "userId" text references "user" ("id") on delete cascade, "scopes" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null);

create table "oauthConsent" ("id" text not null primary key, "clientId" text not null references "oauthApplication" ("clientId") on delete cascade, "userId" text not null references "user" ("id") on delete cascade, "scopes" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, "consentGiven" boolean not null);

create table "passkey" ("id" text not null primary key, "name" text, "publicKey" text not null, "userId" text not null references "user" ("id") on delete cascade, "credentialID" text not null, "counter" integer not null, "deviceType" text not null, "backedUp" boolean not null, "transports" text, "createdAt" timestamptz, "aaguid" text);

create table "organization" ("id" text not null primary key, "name" text not null, "slug" text not null unique, "logo" text, "createdAt" timestamptz not null, "metadata" text);

create table "member" ("id" text not null primary key, "organizationId" text not null references "organization" ("id") on delete cascade, "userId" text not null references "user" ("id") on delete cascade, "role" text not null, "createdAt" timestamptz not null);

create table "invitation" ("id" text not null primary key, "organizationId" text not null references "organization" ("id") on delete cascade, "email" text not null, "role" text, "status" text not null, "expiresAt" timestamptz not null, "inviterId" text not null references "user" ("id") on delete cascade);