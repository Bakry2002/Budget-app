/* eslint-disable react/prop-types */
import { formatCurrency, formatDate, getAllMatchingItems } from "../helper"

const ExpenseCard = ({ expense }) => {
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })
    console.log("🚀 ~ file: ExpenseCard.jsx:10 ~ ExpenseCard ~ budget:", budget)
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDate(expense.createdAt)}</td>
            <td>{formatDate(expense.createdAt)}</td>
        </>
    )
}

export default ExpenseCard