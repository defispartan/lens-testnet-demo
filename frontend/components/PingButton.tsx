import { pingAbi } from "@/utils/pingAbi";
import { Button } from "./ui/button";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { lensTestnet } from "@/utils/lensTestnet";

export function PingButton() {
  const { address, chainId: activeChainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending } = useWriteContract();

  const lensTestnetId = lensTestnet.id;

  const isCorrectNetwork = activeChainId === lensTestnetId;

  if (!address) {
    return <></>;
  }

  return (
    <>
      {!isCorrectNetwork ? (
        <Button
          variant="default"
          size="default"
          className="mt-4"
          onClick={() => {
            if (switchChain) {
              switchChain({ chainId: lensTestnetId });
            } else {
              alert("Network switching is not supported in your wallet.");
            }
          }}
        >
          Switch Network
        </Button>
      ) : (
        <Button
          variant="default"
          size="default"
          className="mt-4"
          onClick={() =>
            writeContract({
              address: "0xb7462EaCd5487514b6b789CF1Fca3081020F4e21",
              abi: pingAbi,
              functionName: "ping",
            })
          }
        >
          Send Ping
        </Button>
      )}
      {!!isPending && <div className="mt-4">Pending...</div>}
      {!!hash && (
        <div className="mt-4">
          <a href={lensTestnet.blockExplorers![0] + "/tx/" + hash}>
            View Transaction
          </a>
        </div>
      )}
    </>
  );
}
