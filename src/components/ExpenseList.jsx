function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      {expenses.map(item => (
        <div className="expense" key={item.id}>
          <span>{item.title}</span>

          <div className="right">
            <span>₹{item.amount}</span>
            <button onClick={() => onDelete(item.id)}> x </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;

