import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with specific database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test Connection Helper
export async function testFirebaseConnection() {
  try {
    // Try to get a non-existent doc to check connectivity
    await getDocFromServer(doc(db, 'system', 'connection-test'));
    console.log("Firebase Connection: Active");
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase Connection: Offline. Check configuration.");
    }
    return false;
  }
}

// Error Handler for Firestore
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Security/Generic Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
