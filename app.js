// app.js
import { ethers } from "./ethers.esm.min.js";

export async function main() {
  const wallet = await ethers.Wallet.createRandom();
  console.log(`wallet address: ${await wallet.getAddress()}`);
}
