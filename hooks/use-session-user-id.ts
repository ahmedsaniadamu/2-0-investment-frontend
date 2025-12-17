'use client'
import { useEffect, useState } from "react";

export function useSessionUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id || null);
      } catch (error) {
        console.error("Failed to parse user from sessionStorage:", error);
      }
    }
  }, []);

  return userId;
}
