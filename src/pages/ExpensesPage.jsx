//? React Router
import { useLoaderData } from "react-router-dom"

//? Helper functions
import { fetchData } from "../helper"
import Table from "../components/Table"

export const expensesLoader = () => {
    const expenses = fetchData("expenses") 
    return { expenses }
}

const ExpensesPage = () => {
    const { expenses } = useLoaderData()
    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length}{" "}total)</small></h2>
                        <Table expanses={expenses}/>
                    </div>
                ) : (
                    <p>You have no expenses yet.</p>
                )
            }
        </div>
    )
}

export default ExpensesPage