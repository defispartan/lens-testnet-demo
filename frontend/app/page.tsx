"use client";

import { PongEventsTable } from "@/components/PongEventsTable";
import { ConnectKitButton } from "connectkit";
import { Web3Provider } from "@/components/Web3Provider";
import { PingButton } from "@/components/PingButton";

export default function Page() {
  return (
    <Web3Provider>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">
            Lens Testnet - Ping Test Contract
          </h1>
          <div className="mt-5">
            <ConnectKitButton />
          </div>
          <PingButton />
        </div>
        <PongEventsTable />
      </div>
    </Web3Provider>
  );
}
