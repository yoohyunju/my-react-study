import './ExpenseItem.css'

function ExpenseItem() {
  const expenseDate = new Date(2021, 6, 16); // month 필드는 0부터 시작
  const expenseTitle = 'Car Insurance';
  const expenseAmount = 294.67;

  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString()}</div> {/* Date 객체는 문자열로 변환 해주어야 출력 가능 */}
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
