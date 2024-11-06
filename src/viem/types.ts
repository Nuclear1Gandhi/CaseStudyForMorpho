import { MetamorphoVaultABI } from "@/abi/metamorphoVaultABI";
import { GetContractReturnType, PublicClient } from "viem";

export type MetamorphoVaultContractInstance = GetContractReturnType<typeof MetamorphoVaultABI, PublicClient>