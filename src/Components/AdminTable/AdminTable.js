import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTable.css";
import Add from "../AddUser/Add";
import Navbar from "../Navbar/Navbar";
import Update from "../UpdateUser/Update";

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdate, setUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUserFullname, setSelectedUserFullname] = useState(null);
  const [deletedMessage, setDeleteMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
   const[updateMessage,setUpdateMessage]=useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (jwtToken) {
      axios
        .get("http://localhost:8080/api/auth/users", {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      console.log("lsfjhdgjshgah")
    }
  },[]);

  const handleUpdate = (userId, userEmail, userFullNmae) => {
    setSelectedUserId(userId);
    setSelectedUserEmail(userEmail);
    setSelectedUserFullname(userFullNmae);
    setUpdate(true);
  };

  const handleRemove = (userId) => {
    const jwtToken = localStorage.getItem("jwt");

    axios
      .delete(`http://localhost:8080/api/auth/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(`User with ID ${userId} removed successfully`);
        setDeleteMessage(true);
        setTimeout(() => {
          setDeleteMessage(false);
          
        }, 2000);

        // Update the users list after removal
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error(`Error removing user with ID ${userId}:`, error);
      });
  };

  const handleAddUser = () => {
    setShowAddUser(true);
  };
  { updateMessage &&  setTimeout(()=>{setUpdateMessage(false)},2000)}

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bar">
      <Navbar />
      {showAddUser ? (
        <Add set={setShowAddUser}/>
      ) : showUpdate ? (
        <Update Id={selectedUserId} Email={selectedUserEmail} Fullname={selectedUserFullname} up={setUpdateMessage} down={setUpdate} />
      ) : (
        
        <div className="adminTable">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          <h1>USERS LIST</h1>
          <div className="adduserbtn">
            <button onClick={handleAddUser}>ADD</button>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearchInputChange} />
          </div>
          <br></br>
          {deletedMessage && <div className="delete-succses">Deleted Successfully</div>}
          {updateMessage && <div className="delete-succses">Updated successfully</div> }

          <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {users
                .filter((user) => user.role !== "ADMIN" && user.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button style={{ marginLeft: '10px' }}onClick={() => handleUpdate(user.id, user.email, user.fullName)}>Update</button>
                      <button style={{ marginLeft: '10px' }} onClick={() => handleRemove(user.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {users.filter((user) => user.role !== "ADMIN" && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <div className="no-user-message">No user Exists</div>
        )}
        </div>
      )}
    </div>
  );
};

export default AdminTable;


