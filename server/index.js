const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/groups", async (req, res) => {
  const { name } = req.body;
  const group = await prisma.group.create({ data: { name } });
  res.json(group); 
});

app.post("/groups/:id/members", async (req, res) => {
  const groupId = parseInt(req.params.id);
  const name  = req.body.name;
  const user = await prisma.user.create({ data: { name } });
  const member = await prisma.groupMember.create({
    data: {
      userId: user.id,
      groupId,
    },
  });

  res.json({ user, member });
});

app.get("/groups/:id/members", async (req, res) => {
  const groupId = parseInt(req.params.id);
    const members = await prisma.groupMember.findMany({
      where: { groupId },
      include: { user: true }, 
    });

    res.json(members);
});

app.post("/groups/:id/expenses", async (req, res) => {
  const groupId = parseInt(req.params.id);
  const { amount, paidById, shares } = req.body;

  try {
    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        paidById: parseInt(paidById),
        groupId,
        shares: {
          create: shares.map(s => ({
            userId: parseInt(s.userId),
            share: parseFloat(s.share),
          })),
        },
      },
    });
    res.json(expense);
  } catch (error) {
    console.error("❌ Expense creation failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/groups/:id/settle", async (req, res) => {
  const groupId = parseInt(req.params.id);

  try {
    const members = await prisma.groupMember.findMany({
      where: { groupId }
    });

    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: { shares: true }
    });

    const balances = {};
    members.forEach(m => balances[m.userId] = 0);

    expenses.forEach(e => {
      balances[e.paidById] += e.amount;
      e.shares.forEach(s => {
        balances[s.userId] -= s.share;
      });
    });

    const creditors = [], debtors = [];
    for (let id in balances) {
      const amt = balances[id];
      if (amt > 0) creditors.push({ id, amount: amt });
      else if (amt < 0) debtors.push({ id, amount: -amt });
    }

    const transactions = [];
    while (creditors.length && debtors.length) {
      const cred = creditors[0];
      const debt = debtors[0];
      const amt = Math.min(cred.amount, debt.amount);

      transactions.push({
        from: parseInt(debt.id),
        to: parseInt(cred.id),
        amount: parseFloat(amt.toFixed(2)),
      });

      cred.amount -= amt;
      debt.amount -= amt;

      if (cred.amount === 0) creditors.shift();
      if (debt.amount === 0) debtors.shift();
    }

    res.json({ transactions });
  } catch (err) {
    console.error("SETTLE ERROR:", err);
    res.status(500).json({ error: "Settle failed" });
  }
});


app.listen(3000, () => {
    console.log("Server running on port 3000")
});
