import type { ReactNode } from "react";

export interface ChatMessageType {
  message: string | ReactNode; // can be text or JSX like <img />
  sender: "user" | "robot";
  id: string;
}