"use client";

import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface UserMenuProps {
  session: Session | null;
}

export default function UserMenu() {
  const router = useRouter();

  const tHeader = useTranslations("Header");
  const tUserMenu = useTranslations("UserMenu");

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="rounded-full size-8 bg-accent animate-pulse"></div>;
  }

  if (!session) {
    return (
      <Link href={'/login'}>
        <Button>{tHeader('signin_btn')}</Button>
      </Link>
    );
  }

  const { user } = session;
  const userName = user.name || tUserMenu("fallback_name");
  const userEmail = user.email || "";
  const userImage = user.image || "";

  const avatarFallback = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/login");
        },
        onError: (error) => {
          console.error("Sign out error:", error);
          alert("Failed to sign out. Please try again.");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          variant="destructive"
          className="cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>{tUserMenu("logout_label")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
