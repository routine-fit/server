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
    console.log('\x1b[36m', padMessage('⚡️ Removing data from database'));
    await prisma.exerciseLink.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Exercise links removed'));
    await prisma.exercise.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Exercises removed'));
    await prisma.userInfo.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Users info removed'));
    await prisma.growthRecord.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Growth records removed'));
    await prisma.trainingPreference.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Training preferences removed'));
    await prisma.routine.deleteMany({});
    console.log('\x1b[36m', padMessage('🚀 Routines removed'));

    await seedFirebaseDatabase();

    // Disconnect from prisma
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
