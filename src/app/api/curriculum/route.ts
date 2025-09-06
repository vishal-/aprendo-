import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUidFromToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const uid = await getUidFromToken(request);
        if (!uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { type, data } = body;

        // Get user from database to check role
        const user = await prisma.userInfo.findUnique({
            where: { uid }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isAdmin = user.role === 'admin';
        let result;

        switch (type) {
            case "course":
                result = await prisma.course.create({
                    data: {
                        name: data.name,
                        isBase: isAdmin,
                        ownerId: uid // ownerId is required in the schema
                    }
                });
                break;
            case "subject":
                result = await prisma.subject.create({
                    data: {
                        name: data.name,
                        isBase: isAdmin,
                        ownerId: uid
                    }
                });
                break;
            case "topic":
                result = await prisma.topic.create({
                    data: {
                        name: data.name,
                        isBase: isAdmin,
                        ownerId: uid
                    }
                });
                break;
            case "subtopic":
                result = await prisma.subtopic.create({
                    data: {
                        name: data.name,
                        isBase: isAdmin,
                        ownerId: uid
                    }
                });
                break;
            case "relation":
                result = await prisma.curriculumRelation.create({ data });
                break;
            default:
                return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in POST /api/curriculum:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const uid = await getUidFromToken(request);
        if (!uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const courses = await prisma.course.findMany();
        const subjects = await prisma.subject.findMany();
        const topics = await prisma.topic.findMany();
        const subtopics = await prisma.subtopic.findMany();

        return NextResponse.json({ courses, subjects, topics, subtopics });
    } catch (error) {
        console.error('Error in GET /api/curriculum:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
