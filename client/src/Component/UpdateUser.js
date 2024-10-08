import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = ({ state }) => {
  const { contract } = state;
  const { uid } = useParams(); // Get 'uid' from URL parameters
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    age: '',
  });

  const [status, setStatus] = useState(0);
  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    // Fetch the existing user data from the contract by uid
    const fetchUser = async () => {
      try {
        const userData = await contract.getUser(uid);
        setUser({
          name: userData.name,
          age: parseInt(userData.age), // Make sure 'age' is a number
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUser();
  }, [uid, contract]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.updateUser(user.name, user.age, uid); // Update the user
      setStatus(1);
      toast.warning('Wait for transaction to be mined...');

      const receipts = await tx.wait(); // Wait for the transaction to be mined
      setReceipt(receipts);
      
      setStatus(2);
      toast.success('User updated successfully!');
      
    } catch (error) {
      toast.error('Update failed, please try again');
      setStatus(0);
    }
  };

  return (
    <div className="container">
      <div>
        <h3 className="my-5 text-center">Update User - Decentralized Application using Blockchain</h3>
        <div className="w-50 m-auto">
          <form className="my-5">
            <div className="mb-3">
              <label htmlFor="nameinput" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameinput"
                onChange={handleInput}
                name="name"
                value={user.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ageinput" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="ageinput"
                onChange={handleInput}
                name="age"
                value={user.age}
              />
            </div>

            <button type="submit" className="btn btn-primary" onClick={updateUser}>
              Submit
            </button>

            <div className="pt-5">
              {status === 1 && (
                <>
                  <p className="text-success">Transaction in progress... you can leave this page</p>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
                </>
              )}
              {status === 2 && (
                <>
                  <p className="text-success">Transaction Hash: {receipt?.blockHash}</p>
                </>
              )}
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

export default UpdateUser;
