import type { ChatMessageType } from "../types/chat";
import dayjs from "dayjs";

export const createMessage = (
  message: string | React.ReactNode,
  sender: "user" | "robot",
  time?: string
): ChatMessageType => ({
  message,
  sender,
  id: crypto.randomUUID(),
  time: time || dayjs().format("h:mm A"),
});

export const createUserMessage = (message: string): ChatMessageType =>
  createMessage(message, "user");

export const createRobotMessage = (message: string | React.ReactNode): ChatMessageType =>
  createMessage(message, "robot");