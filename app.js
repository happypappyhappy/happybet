// app.js
import { ethers } from "./ethers.esm.min.js";

const connectWallet = async () => {
  console.log("connect wallet");
};

const betOne = async () => {
  console.log("bet one");
};

const betTwo = async () => {
  console.log("bet two");
};

const forceRoll = async () => {
  console.log("bet forceRoll");
};

const setRandomSeed = async () => {
  console.log("set random seed");
};

export async function main() {
  const betOneBtn = document.getElementById("bet1Btn");
  betOneBtn.onclick = await betOne();

  const betTwoBtn = document.getElementById("bet2Btn");
  betTwoBtn.onclick = await betTwo();

  const forceRollBtn = document.getElementById("forceRollBtn");
  forceRollBtn.onclick = await forceRoll();

  const setRandomSeedBtn = document.getElementById("setRandomSeedBtn");
  setRandomSeedBtn.onclick = await setRandomSeed();

  await connectWallet();
}
