import { Address, erc20Abi, getContract } from "viem";
import { createPublicClient } from "./client";

export type CreateErc20ContractProps = {
  assetAddress: string
}

export const createErc20Contract = ({ assetAddress }: CreateErc20ContractProps) => getContract({
  address: assetAddress as Address,
  abi: erc20Abi,
  client: { public: createPublicClient() }
})