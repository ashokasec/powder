"use server";

import { createServerAction } from "zsa";
import { getChatsDB } from "../db/data-access/chat";

export const getChats = createServerAction().handler(async () => {
  return getChatsDB();
});
