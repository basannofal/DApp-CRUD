import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUser = ({ state }) => {
  const navigate = useNavigate();
  const { contract } = state;
  const [user, setUser] = useState({
    name: '',
    age: '',
  });

  const [status, setStatus] = useState(0);
  const [receipt, setReceipt] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.createUser(user.name, user.age);
      setStatus(1);
      toast.warning('Wait for transaction to be mined...');

      const receipts = await tx.wait();
      setReceipt(receipts);
      
      setStatus(2);
      toast.success('Transaction Successful');

    } catch (error) {
      toast.error('Please Try Again');
      setStatus(0);
    }
  };

  return (
    <div className="container">
      <div>
        <h3 className="my-5 text-center ">Add User - Decentralized Application by using Blockchain Technology</h3>
        <div className="w-50 m-auto">
          <form className="my-5">
            <div class="mb-3">
              <label for="nameinput" class="form-label">
                Full Name
              </label>
              <input
                type="text"
                class="form-control"
                id="nameinput"
                onChange={handleInput}
                name="name"
                value={user.name}
              />
            </div>
            <div class="mb-3">
              <label for="ageinput" class="form-label">
                Age
              </label>
              <input
                type="number"
                class="form-control"
                id="ageinput"
                onChange={handleInput}
                name="age"
                value={user.age}
              />
            </div>

            <button type="submit" class="btn btn-primary" onClick={addUser}>
              Submit
            </button>

            <div className='pt-5'>
              {
                status == 1 && 
                <>
                <p className='text-success'>Transaction in progress... you can leave this page</p>
                <button className='btn btn-primary' onclick={() => navigate('/')}>Go Home</button>
                </>
              }
              {
                status == 2 &&
                <> 
                  <p className='text-success'>Transaction Hash: {receipt?.blockHash}</p>
                </>
              }
            </div>
          </form>
        </div>
      </div>
      <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
          <div className="d-flex justify-content-between">
            <span class="text-muted">www.codinghelps.com </span>

            <span class="text-muted">Nofal Basan</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AddUser;
