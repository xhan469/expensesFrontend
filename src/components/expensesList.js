import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { Button, Row, Col } from 'react-bootstrap';
//import {ExpenseForm} from './expenseForm'
import ExpenseForm from './expenseForm';


export default () =>{
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expensesSlice.expenses);

    useEffect(()=>{
        GetExpenses(dispatch);
    }, [])

    return expenses.map(e=>
        <div key={e.id} style={{marginBottom: '1rem'}}>
            <ListRow expense={e}/>
        </div>
        );
}

const ListRow = ({expense}) => {
    const [isEditing, setIsEditing] = useState(false);
    return isEditing
    ? <ExpenseForm expense = {expense} setIsEditing={setIsEditing}></ExpenseForm>
    :<div>
        <Row>
            <Col>{expense.description}</Col>
            <Col>${expense.amount}</Col>
            <Col><Button variant="warning" onClick={() => setIsEditing(true)}>Edit</Button></Col>
            
        </Row>
        <hr/>
    </div>
}