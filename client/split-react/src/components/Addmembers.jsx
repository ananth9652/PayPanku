import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddMembers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [added, setAdded] = useState([]);

  function addMember() {
    axios.post(`http://localhost:3000/groups/${id}/members`, { name }).then(res => {
      setAdded(prev => [...prev, res.data.user.name]);
      setName('');
    });
  }

  return (
    <div className="container">
      <h1>Add Members</h1>
      <input placeholder="Enter member name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addMember}>Add</button>
      <ul>
        {added.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
      <button onClick={() => navigate(`/groups/${id}/expenses`)}>Next ➡</button>
    </div>
  );
}

export default AddMembers;
