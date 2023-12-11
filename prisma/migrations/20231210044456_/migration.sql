/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cardholderName" TEXT NOT NULL,
    "numberCard" TEXT NOT NULL,
    "cvc" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);
INSERT INTO "new_User" ("cardholderName", "cpf", "cvc", "email", "id", "numberCard", "password") SELECT "cardholderName", "cpf", "cvc", "email", "id", "numberCard", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
