import type { ReactNode } from "react";

export interface ChatMessageType {
  message: string | ReactNode;
  sender: "user" | "robot";
  id: string;
  time: string;
}