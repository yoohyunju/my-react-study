import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // 방법 1.
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // 방법 2.
  // const [userInput, serUserInput] = useState ({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: ""
  // })

  const titleChangeHandler = (event) => {
    // 방법 1-1.
    setEnteredTitle(event.target.value);

    // 방법 2-1.
    // serUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value // 오버라이딩
    // });

    // 방법 2-2.
    /* 리액트는 상태 업데이트 스케줄을 갖고있어서 바로 실행하지 않음
    이 방법이 더 안전함 */
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // })
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData); // 부모에게 받은 데이터 추가 함수

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
