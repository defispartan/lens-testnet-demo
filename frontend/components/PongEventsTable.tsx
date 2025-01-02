"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Pong {
  sender: string;
  txHash: string;
}

function abbreviateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function PongEventsTable() {
  const [pongs, setPongs] = useState<Pong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPongs = async () => {
      try {
        const response = await fetch(
          "https://lens-testnet-demo-production.up.railway.app/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              query AllPings {
                allPongs {
                  nodes {
                    sender
                    txHash
                  }
                }
              }
            `,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPongs(data.data.allPongs.nodes);
      } catch (err) {
        setError("Failed to fetch pong events");
        console.error("Error fetching pong events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPongs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Ping Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Transaction Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pongs.map((pong, index) => (
              <TableRow key={index}>
                <TableCell>
                  <a
                    href={`https://block-explorer.testnet.lens.dev/address/${pong.sender}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {abbreviateAddress(pong.sender)}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://block-explorer.testnet.lens.dev/tx/${pong.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {abbreviateAddress(pong.txHash)}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
