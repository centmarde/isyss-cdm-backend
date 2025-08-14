import { PrismaClient, SignatureStatus, DeviceStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  //  Create Admin User
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@example.com',
      username: 'adminuser',
      password: hashedPassword,
      salt,
      firstName: 'Admin',
      lastName: 'User',
      contactNumber: '09123456789',
      address: { street: 'Main St', city: 'Metro City' },
      avatar: { url: '/avatars/admin.png' },
      createdBy: { system: 'seed' },
    },
  });

  // 👤 Create Applicant User
  const applicant = await prisma.applicantUser.create({
    data: {
      email: 'applicant@example.com',
      username: 'applicantuser',
      password: hashedPassword,
      salt,
      firstName: 'Applicant',
      lastName: 'User',
      contactNumber: '09987654321',
      address: { street: 'Side St', city: 'Metro Town' },
      avatar: { url: '/avatars/applicant.png' },
      company: { name: 'Acme Corp', position: 'Engineer' },
      createdBy: { system: 'seed' },
    },
  });

  //  Settings
  await prisma.userSetting.createMany({
    data: [
      {
        key: 'theme',
        value: { mode: 'dark' },
        effectiveFrom: '2025-01-01',
        effectiveTo: '2030-01-01',
        createdBy: { system: 'seed' },
        adminId: admin.id,
        applicantId: applicant.id,
      },
    ],
  });

  //  Signatures
  await prisma.userSignature.createMany({
    data: [
      {
        signatureType: 'digital',
        fileUrl: '/signatures/admin-sign.png',
        mimeType: 'image/png',
        fileHash: 'abc123',
        widthPx: 300,
        heightPx: 100,
        fileSize: 12.5,
        isDefault: true,
        status: SignatureStatus.active,
        createdBy: { system: 'seed' },
        adminId: admin.id,
        applicantId: applicant.id,
      },
    ],
  });

  //  Devices
  await prisma.userDevice.createMany({
    data: [
      {
        deviceType: 'mobile',
        os: 'iOS',
        osVersion: '16.0',
        manufacturer: 'Apple',
        model: 'iPhone',
        modelVersion: '13 Pro',
        uuid: 'uuid-admin-001',
        ipAddress: '192.168.1.10',
        source: 'web',
        browser: 'Safari',
        status: DeviceStatus.active,
        verified: true,
        adminId: admin.id,
        applicantId: applicant.id,
      },
    ],
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
