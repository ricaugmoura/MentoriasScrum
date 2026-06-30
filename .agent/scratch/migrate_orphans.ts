import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handleOrphans() {
  console.log("🔍 Iniciando diagnóstico de eventos sem loja...");

  const orphanEvents = await prisma.event.findMany({
    where: {
      lodge_id: null
    }
  });

  console.log(`📊 Total de eventos órfãos encontrados: ${orphanEvents.length}`);

  if (orphanEvents.length === 0) {
    console.log("✅ Nenhum evento órfão encontrado. O schema pode ser atualizado com segurança.");
    return;
  }

  for (const event of orphanEvents) {
    console.log(`\n📦 Processando: "${event.title}" (ID: ${event.id})`);
    
    // Tentar encontrar uma loja no Profile do organizador
    const profile = await (prisma as any).profile.findUnique({
      where: { id: event.organizer_id },
      select: { lodge_id: true }
    });

    let fallbackLodgeId = profile?.lodge_id;

    if (!fallbackLodgeId) {
      // Tentar encontrar qualquer loja onde ele seja dono
      const ownedLodge = await (prisma as any).lodge.findFirst({
        where: { owner_id: event.organizer_id },
        orderBy: { created_at: 'desc' }
      });
      fallbackLodgeId = ownedLodge?.id;
    }

    if (fallbackLodgeId) {
      console.log(`   ✨ Vinculando à loja fallback: ${fallbackLodgeId}`);
      // await prisma.event.update({
      //   where: { id: event.id },
      //   data: { lodge_id: fallbackLodgeId }
      // });
    } else {
      console.log(`   ❌ Nenhuma loja encontrada para o organizador ${event.organizer_id}!`);
      console.log(`   ⚠️ AÇÃO MANUAL NECESSÁRIA para este evento.`);
    }
  }
  
  console.log("\n⚠️ O script acima apenas SIMULOU as alterações. Descomente a linha de update para aplicar.");
}

handleOrphans()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
