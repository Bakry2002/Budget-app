//? react 
import { useEffect, useRef } from "react"

//? react router
import { useFetcher } from "react-router-dom"

//? Library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {
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
            <h2 className="h3">Create budget</h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input 
                        type="text" 
                        name="newBudget" 
                        id="newBudget"
                        placeholder="e.g. Groceries, Rent, etc."
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input 
                        type="number" 
                        name="newBudgetAmount" 
                        id="newBudgetAmount"
                        placeholder="e.g. $350"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? (
                            <span>Submitting...</span>
                        ) : 
                        (
                            <>
                                <span>Create Budget</span>
                                <CurrencyDollarIcon width={20}/>
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm