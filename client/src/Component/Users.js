import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const Users = ({ state }) => {
  const { contract } = state;
  const [users, setUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const totalUsers = await contract?.getUsers();
        setUsers(totalUsers);
      } catch (error) {
        toast.error("Error fetching users:");
      }
    };

    // Call getUsers to fetch and store user data
    contract && getUsers();
  }, [contract]);

  const DeleteUser = async (id) => {
    try {
      const tx = await contract?.deleteUser(id);
      toast.warning("Wait for Delete Transaction to be mined...");
      await tx.wait();
      toast.success("Deleted Successful");
    } catch (error) {
      toast.error("Error while deleting user");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="my-5 text-center ">
        Users - Decentralized Application by using Blockchain Technology{" "}
      </h3>

      <div className="d-flex justify-content-between mt-5 mb-3">
        <div>
          <h4>List of Users</h4>
          <div>
            <p>
              Show Deleted Users :{" "}
              <input
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </p>
          </div>
          <p>connected account: {state?.signer?.address}</p>
        </div>
        <NavLink to="/adduser">
          <button className="btn btn-primary ms-5">Add User</button>
        </NavLink>
      </div>
      <div>{/* <p>Account: {state.contract} </p> */}</div>

      <table class="table table-striped table-hover table-bordered border-primary">
        <thead>
          <tr>
            <th class="p-3" scope="col">
              #
            </th>
            <th class="p-3" scope="col">
              Name
            </th>
            <th class="p-3" scope="col">
              Age
            </th>
            <th class="p-3" scope="col">
              uId
            </th>
            <th class="p-3" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              if (isChecked || user.uid) {
                return (
                  <tr key={user.uid || index}>
                    <th className="p-3" scope="row">
                      {index + 1}
                    </th>
                    <td className="p-3">
                      {user.name ? user.name : "Deleted Data From Block"}
                    </td>
                    <td className="p-3">{user.age + ""}</td>
                    <td className="p-3">{user.uid + ""}</td>
                    <td className="p-3 w-25">
                      <NavLink to={`/updateuser/${user.uid}`}>
                        <button
                          className="btn btn-primary"
                          disabled={!user.uid}
                        >
                          Update
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => DeleteUser(user.uid)}
                        disabled={!user.uid}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
              return null; // Ensure that map always returns a value
            })}
        </tbody>
      </table>
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

export default Users;
