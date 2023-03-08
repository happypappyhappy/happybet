// app.js
import { ethers } from "./ethers.esm.min.js";
import { getAbi } from "./contract.js";

const chainId = 0xa33;
const contractAddress = "0xd71EC16C2f7FA606f218B393EDbf2018FE15991F";

let provider = {};
let signer = {};
let walletAddress = "";

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Requires wallet to play!!!");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  if (window.ethereum.chainId !== chainId) {
    try {
      await switchNetwork();
    } catch (error) {
      await addNetwork();
    }
  }
  signer = provider.getSigner();
  walletAddress = await signer.getAddress();
  console.log(walletAddress);
};

const switchNetwork = async () => {
  await provider.send("wallet_switchEthereumChain", [
    {
      chainId: "0xa33",
    },
  ]);
};

const addNetwork = async () => {
  await provider.send("wallet_addEthereumChain", [
    {
      chainId: "0xa33",
      rpcUrls: ["https://dataseed2.redlightscan.finance"],
      chainName: "Redlight Finance Mainnet",
      nativeCurrency: {
        name: "REDLC",
        symbol: "REDLC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://redlightscan.finance/"],
    },
  ]);
};

const betOne = async () => {
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  const txResp = await contract.makeBet({
    value: ethers.utils.parseUnits("1.0"),
    gasLimit: "2500000",
  });
  console.log(JSON.stringify(txResp));
};

const betTwo = async () => {
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  const txResp = await contract.makeBet({
    value: ethers.utils.parseUnits("2.0"),
    gasLimit: "2500000",
  });
  console.log(JSON.stringify(txResp));
};

const forceRoll = async () => {
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  const txResp = await contract.roll({
    value: ethers.utils.parseUnits("1.0"),
    gasLimit: "2500000",
  });
  console.log(JSON.stringify(txResp));
};

const setRandomSeed = async () => {
  const random = Math.random().toString().slice(2, 22);
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  const txResp = await contract.setRandomSeed(random, {
    value: ethers.utils.parseUnits("2.0"),
    gasLimit: "500000",
  });
  console.log(JSON.stringify(txResp));
};

const fetchBalance = async () => {
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  const balance = await contract.getBalance(walletAddress);
  alert(`Your balance: ${ethers.utils.formatEther(balance.toString())} REDLC`);
};

const withdraw = async () => {
  const contract = new ethers.Contract(contractAddress, getAbi(), signer);
  await contract.withdraw();
};

export async function main() {
  const betOneBtn = document.getElementById("bet1Btn");
  betOneBtn.onclick = () => {
    betOne()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        if (
          error?.data?.message &&
          error?.data?.message === "Upfront cost exceeds account balance"
        ) {
          alert("Error: Not enough REDLC (requires 1 REDLC)");
        } else {
          alert("Unknown error! Check console for more detail");
          console.error(JSON.stringify(error));
        }
      });
  };

  const betTwoBtn = document.getElementById("bet2Btn");
  betTwoBtn.onclick = () => {
    betTwo()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        if (
          error?.data?.message &&
          error?.data?.message === "Upfront cost exceeds account balance"
        ) {
          alert("Error: Not enough REDLC (requires 2 REDLC)");
        } else {
          alert("Unknown error! Check console for more detail");
          console.error(JSON.stringify(error));
        }
      });
  };

  const forceRollBtn = document.getElementById("forceRollBtn");
  forceRollBtn.onclick = () => {
    forceRoll()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        if (
          error?.data?.message &&
          error?.data?.message === "Upfront cost exceeds account balance"
        ) {
          alert("Error: Not enough REDLC (requires 1 REDLC)");
        } else {
          alert("Unknown error! Check console for more detail");
          console.error(JSON.stringify(error));
        }
      });
  };

  const setRandomSeedBtn = document.getElementById("setRandomSeedBtn");
  setRandomSeedBtn.onclick = () => {
    setRandomSeed()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        if (
          error?.data?.message &&
          error?.data?.message === "Upfront cost exceeds account balance"
        ) {
          alert("Error: Not enough REDLC (requires 2 REDLC)");
        } else {
          alert("Unknown error! Check console for more detail");
          console.error(JSON.stringify(error));
        }
      });
  };

  const fetchBalanceBtnEle = document.getElementById("fetchBalanceBtn");
  fetchBalanceBtnEle.onclick = () => {
    fetchBalance()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        alert("Unknown error! Check console for more detail");
      });
  };

  const withdrawBtnEle = document.getElementById("withdrawBtn");
  withdrawBtnEle.onclick = () => {
    withdraw()
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        alert("Check balance - cannot withdraw with zero balance!");
      });
  };

  await connectWallet();
}
