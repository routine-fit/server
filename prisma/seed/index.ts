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

const ENV = process.env['ENV'];
const FIREBASE_AUTH_EMULATOR_HOST = process.env['FIREBASE_AUTH_EMULATOR_HOST'];

(async () => {
  try {
    console.log();
    console.log('\x1b[36m', padMessage('-----------------------', ' '));
    console.log('\x1b[36m', padMessage('| Board configuration |'));
    console.log('\x1b[36m', padMessage('-----------------------', ' '));
    console.log('\x1b[36m'.padStart(10), 'Seeding env:', `\x1b[37m${ENV}\n`);
    console.log(
      '\x1b[36m'.padStart(10),
      'Connected to emulators:',
      `\x1b[36m${FIREBASE_AUTH_EMULATOR_HOST ? '✅' : '🛑'}\n`,
    );
    console.log('\x1b[36m', padMessage('-----------------------', '-').replace(/\s/gi, '-'), '\n');

    console.log('\x1b[36m', padMessage('⚡️ Removing data from database'));

    await prisma.exerciseLink.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Exercise links removed'));
    await prisma.exercise.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Exercises removed'));
    await prisma.userInfo.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Users info removed'));
    await prisma.growthRecord.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Growth records removed'));
    await prisma.trainingPreference.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Training preferences removed'));
    await prisma.routine.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Routines removed'));

    console.log();

    await seedFirebaseDatabase();

    console.log();

    console.log('\x1b[36m', padMessage('⚡️ Adding new data to database'));

    await prisma.userInfo.createMany({ data: data.usersInfo });
    console.log('\x1b[37m', padMessage('🚀 Users info added'));
    await prisma.growthRecord.createMany({ data: data.growthRecords });
    console.log('\x1b[37m', padMessage('🚀 Growth records added'));
    await prisma.exercise.createMany({ data: data.exercises });
    console.log('\x1b[37m', padMessage('🚀 Exercises added'));
    const exercises = await prisma.exercise.findMany({});
    await prisma.exerciseLink.createMany({ data: data.generateExerciseLinks(exercises) });
    console.log('\x1b[37m', padMessage('🚀 Exercise links added'));

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.log('\n \x1b[0m 🛑', error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
