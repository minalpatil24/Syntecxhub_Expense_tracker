import { useState, useRef } from "react";

function ExpenseForm({ onAdd, apiUrl }) {
  const titleRef = useRef();
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      title: titleRef.current.value,
      amount: amount
    };

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense)
    })
      .then(res => res.json())
      .then(data => {
        onAdd(data);
        titleRef.current.value = "";
        setAmount("");
      });
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input ref={titleRef} placeholder="Expense title" required />
      <input
        type="number"
        placeholder="Enter your Amount, expenses(-ve) income(+ve)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button>Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
