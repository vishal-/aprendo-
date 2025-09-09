import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const grades = [
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
    ];

    const subjects = ["Mathematics", "English", "Hindi", "Science", "GK"];

    const problemTypes = [
        {
            code: "mcq_single",
            title: "Multiple Choice (Single Correct)",
            description: "One correct option out of many. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "true_false",
            title: "True / False",
            description: "Binary yes/no type question. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "fill_blank",
            title: "Fill in the Blank",
            description: "Student types missing word/number. Auto-gradable with exact match.",
            offlineOnly: false
        },
        {
            code: "question_answer",
            title: "Question Answer",
            description: "Requires answer in text format. Needs manual grading. This is offline only.",
            offlineOnly: true
        },
        {
            code: "numerical",
            title: "Numerical Answer",
            description: "Student enters a number. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "mcq_multiple",
            title: "Multiple Choice (Multiple Correct)",
            description: "Multiple correct options. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "match",
            title: "Match the Following",
            description: "Column A ↔ Column B matching. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "order",
            title: "Ordering / Sequencing",
            description: "Arrange items in correct order. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "cloze",
            title: "Cloze Test (Paragraph with Blanks)",
            description: "Fill multiple blanks in a passage. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "hotspot",
            title: "Hotspot / Image-based Question",
            description: "Click/tap a region of an image. Auto-gradable.",
            offlineOnly: false
        },
        {
            code: "essay",
            title: "Essay / Long Answer",
            description: "Requires detailed descriptive writing. Manual grading needed.",
            offlineOnly: true
        },
        {
            code: "case_study",
            title: "Case Study (Scenario-based)",
            description: "Complex scenario with descriptive responses. Manual grading required.",
            offlineOnly: true
        },
        {
            code: "diagram",
            title: "Diagram (Draw/Label)",
            description: "Student draws or labels diagrams. Needs manual evaluation.",
            offlineOnly: true
        },
        {
            code: "coding",
            title: "Coding / Practical",
            description: "Requires code writing or execution. Typically manual unless compiler integrated.",
            offlineOnly: true
        },
        {
            code: "project",
            title: "Project / Assignment Upload",
            description: "File uploads (PDF, docs, images). Needs manual grading.",
            offlineOnly: true
        }
    ];

    const adminOwnerId = "admin"; // Placeholder owner ID for seed data

    // Ensure the admin user exists
    const adminUser = await prisma.userInfo.upsert({
        where: { uid: adminOwnerId },
        update: {},
        create: {
            uid: adminOwnerId,
            email: "admin@example.com",
            profilePicture: "",
            phone: "",
            phoneVerified: true,
            termsAccepted: true,
            termsAcceptedAt: new Date(),
            createdAt: new Date(),
            displayName: "Admin",
            role: "admin",
        },
    });

    for (const grade of grades) {
        // Find existing course by name (assuming name is not unique)
        let createdGrade = await prisma.course.findFirst({
            where: { name: grade },
        });

        if (!createdGrade) {
            createdGrade = await prisma.course.create({
                data: {
                    name: grade,
                    isBase: true,
                    ownerId: adminUser.uid,
                },
            });
        }

        for (const subject of subjects) {
            // Find if subject already exists for this course
            const existingSubject = await prisma.subject.findFirst({
                where: {
                    name: subject,
                    courseId: createdGrade.id
                }
            });

            if (!existingSubject) {
                await prisma.subject.create({
                    data: {
                        name: subject,
                        isBase: true,
                        ownerId: adminUser.uid,
                        courseId: createdGrade.id,
                    },
                });
            }
        }
    }

    // Seed ProblemTypes
    for (const problemType of problemTypes) {
        await prisma.problemType.upsert({
            where: { code: problemType.code },
            update: {},
            create: problemType
        });
    }

    console.log("Database has been seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
