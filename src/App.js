import React, {useEffect} from "react";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import { ethers } from "ethers";

export default function App() {
  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    let contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const {ethereum} = window;

    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      provider
    );

    const greeting = await contract.greet();
    console.log(greeting);
  }

  const sendGreetings = async () => {
    let contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const {ethereum} = window;

    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      signer
    );

    await contract.setGreeting('Hello Smart Contracts NEW!!')
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return <div>
    <button onClick={() => fetchGreetings()}>READ</button>
    <button onClick={() => sendGreetings()}>SAVE</button>
  </div>;
}