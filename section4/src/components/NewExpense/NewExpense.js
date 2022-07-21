import React from "react";
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  // 자식에서 새로 추가되는 expenseData를 받는 핸들러
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString() // unique id는 아님
    };
    props.onAddExpense(expenseData);
    // console.log(expenseData);
  };

  return <div className="new-expense">
    {/* 함수 자체가 자식에게 포인터로 전달 됨 */}
    <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/> 
  </div>
}

export default NewExpense;