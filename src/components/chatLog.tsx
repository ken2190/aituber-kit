import { useEffect, useRef } from "react";
import { Message } from "@/features/messages/messages";
import Image from "next/image";

type Props = {
  messages: Message[];
  characterName: string;
};

export const ChatLog = ({ messages, characterName }: Props) => {
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }, []);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [messages]);

  return (
    <div className="absolute w-col-span-7 max-w-full h-[100svh] pb-64">
      <div className="max-h-full px-16 pt-104 pb-64 overflow-y-auto scroll-hidden">
        {messages.map((msg, i) => {
          return (
            <div key={i} ref={messages.length - 1 === i ? chatScrollRef : null}>
              {typeof msg.content === "string" ? (
                <Chat role={msg.role} message={msg.content} characterName={characterName} />
              ) : (
                <>
                  <Chat role={msg.role} message={msg.content[0].text} characterName={characterName} />
                  <ChatImage role={msg.role} imageUrl={msg.content[1].image_url.url} characterName={characterName} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Chat = ({ role, message, characterName }: { role: string; message: string; characterName: string; }) => {
  const roleColor = role !== "user" ? "bg-secondary text-white " : "bg-base text-primary";
  const roleText = role !== "user" ? "text-secondary" : "text-primary";
  const offsetX = role === "user" ? "pl-40" : "pr-40";

  return (
    <div className={`mx-auto max-w-[32rem] my-16 ${offsetX}`}>
      {role === "code" ? (
        <pre className="whitespace-pre-wrap break-words bg-[#1F2937] text-white p-16 rounded-8">
          <code className="font-mono text-sm">{message}</code>
        </pre>
      ) : (
        <>
        <div
          className={`px-24 py-8 rounded-t-8 font-bold tracking-wider ${roleColor}`}
        >
          {role !== "user" ? (characterName || "CHARACTER") : "YOU"}
        </div>
        <div className="px-24 py-16 bg-white rounded-b-8">
            <div className={`typography-16 font-bold ${roleText}`}>{message}</div>
          </div>
        </>
      )}
    </div>
  );
};

const ChatImage = ({ role, imageUrl, characterName }: { role: string; imageUrl: string; characterName: string; }) => {
  const offsetX = role === "user" ? "pl-40" : "pr-40";

  return (
    <div className={`mx-auto max-w-[32rem] my-16 ${offsetX}`}>
      <Image src={imageUrl} alt="Generated Image" className="rounded-8" width={512} height={512} />
    </div>
  );
};