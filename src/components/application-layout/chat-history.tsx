"use client";

import React, { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { geist_sans } from "@/lib/misc/fonts";
import { getAllChatsAction } from "@/lib/actions/chat";

const ChatHistory = () => {
  const [history, setHistory] = useState<
    {
      id: string;
      title: string;
      createdAt: Date;
    }[]
  >([]);

  const { execute, isPending, isSuccess, status } = useServerAction(
    getAllChatsAction,
    {
      onSuccess: ({ data }) => {
        setHistory(data);
      },
    }
  );

  useEffect(() => {
    execute();
  }, []);

  return (
    <ul className="p-4 max-w-full space-y-2">
      {isPending && <div>Loading...</div>}
      {isSuccess &&
        status === "success" &&
        history.map((item) => (
          <li key={item.id}>
            <Button className="w-full justify-start" size="sm" asChild>
              <Link
                href={`/chat/${item.id}`}
                className="!text-[15px] font-normal"
                style={geist_sans.style}
              >
                {item.title}
              </Link>
            </Button>
          </li>
        ))}
    </ul>
  );
};

export default ChatHistory;
