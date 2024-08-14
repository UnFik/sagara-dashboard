import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const students = Array.from({ length: 50 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("###########"),
    instance: faker.company.name(),
    password: faker.internet.password(),
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
  }));

  await prisma.student.createMany({
    data: students,
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
