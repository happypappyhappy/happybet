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
  console.log("forceRoll");
};

const setRandomSeed = async () => {
  console.log("set random seed");
};

export async function main() {
  const betOneBtn = document.getElementById("bet1Btn");
  betOneBtn.onclick = () => {
    betOne()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(`error in betOne: ${JSON.stringify(error)}`);
      });
  };

  const betTwoBtn = document.getElementById("bet2Btn");
  betTwoBtn.onclick = () => {
    betTwo()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(`error in betTwoBtn: ${JSON.stringify(error)}`);
      });
  };

  const forceRollBtn = document.getElementById("forceRollBtn");
  forceRollBtn.onclick = () => {
    forceRoll()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(`error in forceRollBtn: ${JSON.stringify(error)}`);
      });
  };

  const setRandomSeedBtn = document.getElementById("setRandomSeedBtn");
  setRandomSeedBtn.onclick = () => {
    setRandomSeed()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(`error in setRandomSeedBtn: ${JSON.stringify(error)}`);
      });
  };

  await connectWallet();
}
