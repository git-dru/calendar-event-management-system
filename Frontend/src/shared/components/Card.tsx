import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="event-card">
      <div className="event-card card">{children}</div>
    </div>
  );
}
