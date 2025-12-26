import { auth } from "../firebase/firebaseConfig.js";

export const getToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};
