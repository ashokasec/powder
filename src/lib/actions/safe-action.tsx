import { createServerActionProcedure } from "zsa";
import { auth } from "../auth/auth";

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const session = await auth();
    if (!session) {
      console.log("user not logged in");
      throw new Error("User not authenticated");
    }
    return session;
  }
);

export const authenticatedActionWithoutError =
  createServerActionProcedure().handler(async () => {
    const session = await auth();
    return session;
  });
