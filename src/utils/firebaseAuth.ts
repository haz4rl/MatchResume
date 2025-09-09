import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send email verification
    await sendEmailVerification(userCredential.user);

    return { success: true, user: userCredential.user };
  } catch (error: any) {
    // Handle duplicate email error
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, message: 'This email is already registered.' };
    }
    return { success: false, message: error.message };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Optionally, check if email is verified
    if (!userCredential.user.emailVerified) {
      return { success: false, message: 'Please verify your email before logging in.' };
    }

    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
