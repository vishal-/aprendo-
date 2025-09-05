-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'parent', 'tutor', 'student', 'moderator', 'academy');

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subtopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurriculumRelation" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER,
    "subjectId" INTEGER,
    "topicId" INTEGER,
    "subtopicId" INTEGER,
    "ownerId" TEXT,
    "order" INTEGER,

    CONSTRAINT "CurriculumRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserInfo" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneVerified" BOOLEAN NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL,
    "termsAcceptedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_email_key" ON "public"."UserInfo"("email");

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."UserInfo"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subject" ADD CONSTRAINT "Subject_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."UserInfo"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Topic" ADD CONSTRAINT "Topic_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."UserInfo"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subtopic" ADD CONSTRAINT "Subtopic_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."UserInfo"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculumRelation" ADD CONSTRAINT "CurriculumRelation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculumRelation" ADD CONSTRAINT "CurriculumRelation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculumRelation" ADD CONSTRAINT "CurriculumRelation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculumRelation" ADD CONSTRAINT "CurriculumRelation_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "public"."Subtopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculumRelation" ADD CONSTRAINT "CurriculumRelation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."UserInfo"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
