// Optional Firebase Auth hook (disabled by default)
// Enable by providing VITE_FIREBASE_* env vars and uncommenting initialization.

export function useAuth() {
  // Example shape:
  // const app = initializeApp({
  //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
  // })
  // const auth = getAuth(app)
  // const user = useAuthState(auth)
  // return { user, signIn, signOut }
  return { user: null as null | { uid: string; email?: string }, signIn: async () => {}, signOut: async () => {} }
}
