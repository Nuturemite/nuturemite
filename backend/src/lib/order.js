import mongoose from 'mongoose';

const sessionContext = {};

export async function initializeSession() {
  const session = await mongoose.startSession();
  session.startTransaction({maxTimeMS:120000});
  sessionContext.currentSession = session;
}

export function getOrderSession() {
  return sessionContext.currentSession;
}
