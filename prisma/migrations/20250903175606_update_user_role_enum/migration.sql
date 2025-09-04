/*
  Warnings:

  - Changed the type of `role` on the `UserDetails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'PARENT', 'TUTOR', 'STUDENT', 'MODERATOR', 'ACADEMY');

-- AlterTable
ALTER TABLE "public"."UserDetails" DROP COLUMN "role",
ADD COLUMN     "role" "public"."UserRole" NOT NULL;

-- DropEnum
DROP TYPE "public"."Role";
