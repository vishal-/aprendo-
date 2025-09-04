/*
  Warnings:

  - The values [ADMIN,PARENT,TUTOR,STUDENT,MODERATOR,ACADEMY] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `UserDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `UserDetails` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneVerified` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAccepted` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAcceptedAt` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - The required column `uid` was added to the `UserDetails` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRole_new" AS ENUM ('admin', 'parent', 'tutor', 'student', 'moderator', 'academy');
ALTER TABLE "public"."UserDetails" ALTER COLUMN "role" TYPE "public"."UserRole_new" USING ("role"::text::"public"."UserRole_new");
ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
ALTER TYPE "public"."UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."UserDetails" DROP CONSTRAINT "UserDetails_pkey",
DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "firstName",
DROP COLUMN "id",
DROP COLUMN "lastName",
DROP COLUMN "photoURL",
DROP COLUMN "postalCode",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("uid");
