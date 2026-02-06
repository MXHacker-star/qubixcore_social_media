import bcrypt from "bcryptjs";
import { PrismaClient, ContentStatus, ApprovalStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Qubixcore2026!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@qubixcore.com" },
    update: {},
    create: {
      name: "Mia Rahman",
      email: "admin@qubixcore.com",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const client = await prisma.client.upsert({
    where: { name: "Lume Interiors" },
    update: {},
    create: {
      name: "Lume Interiors",
      brandColor: "#C77A45",
      platforms: "Instagram, LinkedIn, Facebook, X",
    },
  });

  await prisma.socialAccount.createMany({
    data: [
      {
        clientId: client.id,
        platformName: "Instagram",
        pageName: "@lume.studio",
        pageUrl: "https://instagram.com/lume.studio",
        status: "Active",
      },
      {
        clientId: client.id,
        platformName: "LinkedIn",
        pageName: "QubixCore Agency",
        pageUrl: "https://linkedin.com/company/qubixcore",
        status: "Active",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.contentItem.createMany({
    data: [
      {
        clientId: client.id,
        date: new Date("2026-02-10"),
        platform: "Instagram",
        postType: "Carousel",
        caption: "Studio reveals: textures, light, and form.",
        hashtags: "#interiordesign #studio #lume",
        status: ContentStatus.DRAFTED,
        ownerId: admin.id,
      },
      {
        clientId: client.id,
        date: new Date("2026-02-12"),
        platform: "LinkedIn",
        postType: "Video",
        caption: "Founder story spotlight.",
        hashtags: "#founder #story #agency",
        status: ContentStatus.SCHEDULED,
        ownerId: admin.id,
      },
      {
        clientId: client.id,
        date: new Date("2026-02-13"),
        platform: "Facebook",
        postType: "Image",
        caption: "Behind the scenes moodboard.",
        hashtags: "#design #moodboard",
        status: ContentStatus.IDEA,
        ownerId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.idea.createMany({
    data: [
      {
        clientId: client.id,
        title: "Founder story spotlight",
        description: "Short-form founder narrative with studio visuals.",
        suggestedPlatform: "LinkedIn",
        priority: "High",
      },
      {
        clientId: client.id,
        title: "Studio moodboard reveal",
        description: "Carousel highlighting upcoming collection.",
        suggestedPlatform: "Instagram",
        priority: "Medium",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.workflowTask.createMany({
    data: [
      {
        title: "Approve LinkedIn video cut",
        notes: "Review final audio mix and CTA overlay.",
        approvalStatus: ApprovalStatus.NEEDS_REVIEW,
        assigneeId: admin.id,
        dueDate: new Date("2026-02-11"),
      },
      {
        title: "Finalize Instagram carousel copy",
        notes: "Ensure caption aligns with brand tone.",
        approvalStatus: ApprovalStatus.APPROVED,
        assigneeId: admin.id,
        dueDate: new Date("2026-02-09"),
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
