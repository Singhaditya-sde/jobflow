import { Bell, RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { SidebarTrigger } from "@/components/ui/sidebar";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background px-6">
      {/* Left part  */}
      <div className="flex items-center gap-4">
        {/* <SidebarTrigger /> */}

        {/* <div className="hidden md:flex items-center gap-2 rounded-lg border px-3">
          <Search className="h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search jobs..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 w-72"
          />
        </div> */}
      </div>

      {/* Right part */}
      <div className="flex items-center gap-3">
        {/* <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button> */}

        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <Avatar className="h-9 w-9">
          <AvatarFallback className="font-semibold">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}