import React, { useEffect, useState } from 'react';
import ABIData from './contracts/crud.json';
import { ethers } from 'ethers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Component/Users';
import AddUser from './Component/AddUser';
import UpdateUser from './Component/UpdateUser';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState('None');

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0xb886881eef300B9171EA8180a48C797Ab345c18b';
      const contractABI = ABIData?.abi;

      try {
        const { ethereum } = window;
        console.log(ethereum)
        if (ethereum) {
          const accountData = await ethereum.request({ method: 'eth_requestAccounts' });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          })

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          })

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          
          const myContract = new ethers.Contract(contractAddress, ABIData?.abi, signer);
          console.log(myContract)
          setState({ provider, signer, contract: myContract });
          setAccount(accountData[0]);
        }else{
          alert('Please install metamask');
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users state={state}  />} />

        <Route path="/adduser" element={<AddUser state={state}  />} />

        <Route path="/updateuser/:uid" element={<UpdateUser state={state}  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
