import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      organizer_id: true,
      lodge_id: true,
      status: true
    }
  });

  console.log('--- Events in DB ---');
  console.log(JSON.stringify(events, null, 2));
  
  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      full_name: true,
      role: true
    }
  });

  console.log('--- Profiles in DB ---');
  console.log(JSON.stringify(profiles, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
