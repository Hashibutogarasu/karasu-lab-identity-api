-- AlterTable
ALTER TABLE "session" ADD COLUMN     "activeOrganizationId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "twoFactorEnabled" BOOLEAN;

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauthAccessToken" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpiresAt" TIMESTAMPTZ(6) NOT NULL,
    "refreshTokenExpiresAt" TIMESTAMPTZ(6) NOT NULL,
    "clientId" TEXT NOT NULL,
    "userId" TEXT,
    "scopes" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "oauthAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauthApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "metadata" TEXT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT,
    "redirectURLs" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "disabled" BOOLEAN,
    "userId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "oauthApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauthConsent" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scopes" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "consentGiven" BOOLEAN NOT NULL,

    CONSTRAINT "oauthConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passkey" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "publicKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "backedUp" BOOLEAN NOT NULL,
    "transports" TEXT,
    "createdAt" TIMESTAMPTZ(6),
    "aaguid" TEXT,

    CONSTRAINT "passkey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "twoFactor" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "backupCodes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "twoFactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oauthAccessToken_accessToken_key" ON "oauthAccessToken"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "oauthAccessToken_refreshToken_key" ON "oauthAccessToken"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "oauthApplication_clientId_key" ON "oauthApplication"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oauthAccessToken" ADD CONSTRAINT "oauthAccessToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "oauthApplication"("clientId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oauthAccessToken" ADD CONSTRAINT "oauthAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oauthApplication" ADD CONSTRAINT "oauthApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oauthConsent" ADD CONSTRAINT "oauthConsent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "oauthApplication"("clientId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oauthConsent" ADD CONSTRAINT "oauthConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "twoFactor" ADD CONSTRAINT "twoFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
