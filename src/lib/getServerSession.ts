import { getServerSession as getSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getServerSession = async () => {
  return await getSession(authOptions);
};
