-- CreateTable
CREATE TABLE "personalities" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP,

    CONSTRAINT "personalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option_personalities" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "optionId" INTEGER NOT NULL,
    "personalityId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP,

    CONSTRAINT "option_personalities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personalities_pubkey_key" ON "personalities"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "personalities_name_key" ON "personalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "questions_pubkey_key" ON "questions"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "options_pubkey_key" ON "options"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "option_personalities_pubkey_key" ON "option_personalities"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "option_personalities_optionId_personalityId_key" ON "option_personalities"("optionId", "personalityId");

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option_personalities" ADD CONSTRAINT "option_personalities_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
