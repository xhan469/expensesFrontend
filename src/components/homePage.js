

import ExpenseForm from './expenseForm';
import ExpensesList from './expensesList';


const HomePage = () =>(
    <div style={{width :'60%', margin :'auto',paddingTop: '3rem'}}>
    <h3>New Expense</h3>
    <ExpenseForm/>
    <hr style={{border: '1px solid grey'}}></hr>
    <h3>Your Expenses</h3>
    <ExpensesList/>
  </div>
)

export default HomePage;