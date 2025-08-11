"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.email || "Usuário")
      } else {
        setUserName("")
      }
    });

    return () => unsubscribe();
  }, [])

  const handleSingOut = async () => {
    try {
      await signOut(auth);

      await fetch("/api/logout", { method: "POST" });
      router.push("/")
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao deslogar:", error.message);
      } else {
        console.error("Erro desconhecido", error)
      }
    }
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <SidebarTrigger />
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm">{userName || "Carregando..."}</p>
            <p className="text-xs font-medium text-muted-foreground">Product Manager</p>
          </div>
        </div>
        <ModeToggle />
        <Button
          className="cursor-pointer"
          onClick={handleSingOut}
          variant={"ghost"}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  )
}
