import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddExpenses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paidById, setPaidById] = useState('');
  const [members, setMembers] = useState([]);
  const [shares, setShares] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/groups/${id}/members`).then(res => {
      setMembers(res.data);
      const initialShares = {};
      res.data.forEach(m => {
        initialShares[m.userId] = '';
      });
      setShares(initialShares);
    });
  }, [id]);

  const handleShareChange = (userId, value) => {
    setShares(prev => ({
      ...prev,
      [userId]: value
    }));
  };

  async function addExpense() {
    const shareArray = Object.entries(shares).filter(([_, val]) => val !== '').map(([userId, share]) => ({
      userId: parseInt(userId),
      share: parseFloat(share)
    }));

    await axios.post(`http://localhost:3000/groups/${id}/expenses`, {
      amount: parseFloat(amount),
      paidById: parseInt(paidById),
      shares: shareArray
    });

    setAmount('');
    setPaidById('');
    setShares({});
  }

  return (
    <div className="container">
      <h2>Add Custom Expense</h2>

      <input
        type="number"
        placeholder="Total Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <select onChange={e => setPaidById(e.target.value)} value={paidById}>
        <option value="">Select who paid</option>
        {members.map(m => (
          <option key={m.userId} value={m.userId}>{m.user.name}</option>
        ))}
      </select>

      <h4>Custom shares per user:</h4>
      {members.map(m => (
        <div key={m.userId}>
          <label>{m.user.name}</label>
          <input
            type="number"
            placeholder="Amount they owe"
            value={shares[m.userId] || ''}
            onChange={e => handleShareChange(m.userId, e.target.value)}
          />
        </div>
      ))}

      <button onClick={addExpense}>Add Expense</button>
      <button onClick={() => navigate(`/groups/${id}/settle`)}>Settle 💰</button>
    </div>
  );
}

export default AddExpenses;
