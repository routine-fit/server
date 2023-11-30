import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

import data from '../data';
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
    console.log('\x1b[36m', padMessage('-----------------------', ' '));
    console.log('\x1b[36m', padMessage('| Board configuration |'));
    console.log('\x1b[36m', padMessage('-----------------------', ' '));

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

    console.log();

    await seedFirebaseDatabase();

    console.log();

    console.log('\x1b[36m', padMessage('⚡️ Adding new data to database'));

    await prisma.exercise.createMany({ data: data.exercises });
    console.log('\x1b[37m', padMessage('🚀 Exercises added'));
    const exercises = await prisma.exercise.findMany({});
    await prisma.exerciseLink.createMany({ data: data.generateExerciseLinks(exercises) });
    console.log('\x1b[37m', padMessage('🚀 Exercise links added'));

    console.log('\x1b[37m', padMessage('🚀 New data added'));

    console.log();
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.log('\n \x1b[0m 🛑', error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
