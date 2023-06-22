/* eslint-disable react/prop-types */
//? react 
import { useEffect, useRef } from "react"

//? react router
import { useFetcher } from "react-router-dom"

//? Library
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { calculateTotalSpentByBudget } from "../helper"
const AddExpensesForm = ({ budgets }) => {
    const fetcher = useFetcher(); // to track the status of the request and to provide a method to make the request
    const isSubmitting = fetcher.state === "submitting"
    
    const formRef = useRef(); // to access the form element
    const focusRef = useRef(); // to focus on the first input element

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset(); // reset the form
            focusRef.current.focus();  // focus on the first input element
        }
    }, [isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add new <span className="accent">
                {
                    budgets.length === 1 && `${budgets.map((budget) => budget.name)}`
                }
                </span> Expense</h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expenses Name</label>
                        <input 
                            type="text" 
                            name="newExpense" 
                            id="newExpense"
                            placeholder="e.g. Coffee"
                            required
                            ref={focusRef}
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input 
                            type="number" 
                            name="newExpenseAmount" 
                            id="newExpenseAmount"
                            placeholder="e.g. $3.50"
                            required
                            step="0.01" 
                            inputMode="decimal"
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={ budgets.length === 1 }>
                        <label htmlFor="newExpenseBudget">Budget Category</label>
                        <select name="newExpenseBudget" id="newExpenseBudget" required>
                            {
                                budgets.sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        
                                        <option disabled={calculateTotalSpentByBudget(budget.id) === budget.amount } key={budget.id} value={budget.id}>{budget.name}</option>  
                                    )
                                })
                            }
                        </select>
                    </div>
                <input type="hidden" name="_action" value="createExpense"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? (
                            <span>Submitting...</span>
                        ) : 
                        (
                            <>
                                <span>Add Expenses</span>
                                <PlusCircleIcon width={20}/>
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpensesForm