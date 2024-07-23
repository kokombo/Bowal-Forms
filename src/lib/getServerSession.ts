import { getServerSession as getSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getServerSession = async () => {
  const session = await getSession(authOptions);
  return session;
};
