// react router is providing a loader capability to load the Dashboard component when the user navigates to the root path of the application.
// is best to use loader function to tell react router how to load the Dashboard component.

//? react router
import { Link, useLoaderData } from "react-router-dom"

//? helper functions
import { createBudget, createExpense, fetchData, waait } from "../helper"

//? components
import Intro from "../components/Intro"
import AddBudgetForm from "../components/AddBudgetForm"

//? Library
import { toast } from "react-toastify"
import AddExpensesForm from "../components/AddExpensesForm"
import BudgetCard from "../components/BudgetCard"
import Table from "../components/Table"

//? it is best to do this function on each page route component. 
export const dashboardLoader = () => {
    const username = fetchData("username") 
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses") 
    return { username, budgets, expenses }
}

//? action 
export const dashboardAction = async ({ request }) => {
    await waait(); 

    const data = await request.formData(); // this is a method that is available on the request object. It will parse the form data and return an object that contains the data that have a name attribute.
    const { _action, ...values } = Object.fromEntries(data)
    
    // New user submission 
    if (_action === "newUser") {
        try {
            localStorage.setItem("username", JSON.stringify(values.username))
            return toast.success(`Welcome ${values.username}`)
        } catch (error) {
            throw new Error("There was a problem creating your account. Please try again.")
        }
    }

    // Create new budget submission
    if (_action === "createBudget") {
        try {
            createBudget({
                    name: values.newBudget, 
                    amount: values.newBudgetAmount
            });
            return toast.success(`Your budget for "${values.newBudget}" has been created.`)
        } catch (error) {
            throw new Error("There was a problem creating your budget. Please try again.")
        }
    }

    // Create new expense submission
    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget,
            })
            return null; 
        } catch (error) {
            throw new Error("There was a problem creating your expense. Please try again.")
        }
    }

}

const Dashboard = () => {
    const { username, budgets, expenses } = useLoaderData()
    
    return (
        <>
            { 
                username ? (
                    <div className="dashboard">
                        <h1>Welcome Back, <span className="accent">{username}</span></h1>
                        <div className="grid-sm">
                            { budgets && budgets.length > 0 ? (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpensesForm  budgets={budgets}/>
                                    </div>
                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetCard key={budget.id} budget={budget} />
                                            ))
                                        }
                                    </div>
                                    {
                                        expenses && expenses.length > 0 && (
                                            <div className="grid-md">
                                                <h2>Recent Expenses</h2>
                                                <Table expanses={expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0, 8)}/>
                                                {
                                                    expenses.length > 8 && (
                                                        <Link to='expenses' className="btn btn--dark">
                                                            View All Expenses
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm />
                                </div>
                            )}
                        </div>
                    </div>
                ) : <Intro />
            }
        </>
    )
}

export default Dashboard