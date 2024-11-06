import { MetamorphoVaultABI } from "@/abi/metamorphoVaultABI";
import { Address, getContract } from "viem";
import { createPublicClient, createWalletClient } from "./client";

type CreateVaultContractProps = {
  address: string,
}

export const createVaultContract = ({ address }: CreateVaultContractProps) => getContract({
  address: address as Address,
  abi: MetamorphoVaultABI,
  client: { public: createPublicClient(), wallet: createWalletClient() },
})