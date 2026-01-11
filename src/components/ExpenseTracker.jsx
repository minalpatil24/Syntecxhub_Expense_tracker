import { useState, useEffect, useCallback, useMemo } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BalanceSummary from "./BalanceSummary";

const API_URL = "https://6963d3cb2d146d9f58d47db5.mockapi.io/expenses";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

  //  FETCH EXPENSES
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log("API RESPONSE:", data);
        setExpenses(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.log("FETCH ERROR:", err);
        setExpenses([]);
      });
  }, []);

  //  ADD EXPENSE
  const addExpense = useCallback((expense) => {
    setExpenses(prev =>
      Array.isArray(prev) ? [...prev, expense] : [expense]
    );
  }, []);

  //  DELETE EXPENSE
  const deleteExpense = useCallback((id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setExpenses(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.log("DELETE ERROR:", err));
  }, []);

  //  TOTAL AMOUNT
  const total = useMemo(() => {
    if (!Array.isArray(expenses)) return 0;

    return expenses.reduce((sum, item) => {
      return sum + Number(item.amount || 0);
    }, 0);
  }, [expenses]);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <BalanceSummary total={total} />
      <ExpenseForm onAdd={addExpense} apiUrl={API_URL} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  );
}

export default ExpenseTracker;
