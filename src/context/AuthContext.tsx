import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  role: 'user' | 'oracle' | 'admin';
  points: number;
  tier: 'Standard' | 'Elite' | 'Oracle';
  bio?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setUser(firebaseUser);
        
        if (firebaseUser) {
          // Fetch or create profile
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            const isDefaultAdmin = firebaseUser.email === 'gopidhanush615@gmail.com';
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              avatarUrl: firebaseUser.photoURL,
              role: isDefaultAdmin ? 'admin' : 'user',
              points: 0,
              tier: 'Standard'
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          } else {
            const data = userDoc.data() as UserProfile;
            // Admin patch if needed
            if (firebaseUser.email === 'gopidhanush615@gmail.com' && data.role !== 'admin') {
              await setDoc(userDocRef, { role: 'admin' }, { merge: true });
            }
            setProfile(data);
          }

          // Live sync profile
          onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.data() as UserProfile);
            }
          });
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
