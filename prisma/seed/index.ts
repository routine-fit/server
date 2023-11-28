import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

import { seedFirebaseDatabase } from './firebase';
import { padMessage } from './utils';

const prisma = new PrismaClient();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

(async () => {
  try {
    await seedFirebaseDatabase();
    console.log('\x1b[36m', padMessage('⚡️ Removing data from database'));

    // Disconnect from prisma
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
