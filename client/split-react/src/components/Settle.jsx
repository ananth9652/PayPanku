import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Settle() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/groups/${id}/settle`).then(res => {
      setTransactions(res.data.transactions);
    });

    axios.get(`http://localhost:3000/groups/${id}/members`).then(res => {
      const map = {};
      res.data.forEach(member => {
        map[member.userId] = member.user.name;
      });
      setUserMap(map);
    });
  }, [id]);

  return (
    <div className="container">
      <h2>Settlement</h2>
      {transactions.length === 0 ? (
        <p>All settled! ✅</p>
      ) : (
        <ul>
          {transactions.map((t, i) => (
            <li key={i}>
              {userMap[t.from] || `User #${t.from}`} should pay {userMap[t.to] || `User #${t.to}`}: ₹{t.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Settle;
