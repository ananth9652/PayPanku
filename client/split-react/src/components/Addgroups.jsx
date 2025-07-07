import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddGroups() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  async function createGroup() {
    const res = await axios.post('http://localhost:3000/groups', { name });
    alert("Group created successfully!")
    navigate(`/groups/${res.data.id}/members`);
  }

  return (
    <div className="container">
      <h2>Create Group</h2>
      <input placeholder="Enter group name" onChange={e => setName(e.target.value)} />
      <button onClick={createGroup}>Create</button>
    </div>
  );
}

export default AddGroups;
