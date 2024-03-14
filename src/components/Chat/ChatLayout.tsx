"use client";

import { useChatStore } from "@/app/zustand/ChatStore";
import ChatInput from "./ChatInput";
import ChatLine from "./ChatLine";
import { useEffect, useRef } from "react";

export default function ChatLayout() {
  const { history } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef, history]);

  return (
    <div className="max-w-4xl h-screen m-auto bg-white">
      <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto flex flex-col gap-10 pr-4 pb-8"
        >
          {history.map((hist, i) => (
            <ChatLine key={i} role={hist.role} content={hist.content} />
          ))}
        </div>
        <div className="">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
