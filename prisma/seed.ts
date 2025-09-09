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
