/* eslint-disable react/prop-types */
import { calculateTotalSpentByBudget, formatCurrency, formatPercentage } from "../helper";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
const BudgetCard = ({ budget }) => {
    const { id, name, amount, color } = budget; 
    const totalSpent = calculateTotalSpentByBudget(id); 

    const styleColor = {
        "--accent": color
    }
    return (
        <div className="budget" style={styleColor}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={totalSpent}>
                {formatPercentage(totalSpent/amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(totalSpent)} spent</small>
                <small>{formatCurrency(amount - totalSpent)} remaining</small>
            </div>
            <div className="completed-flag" style={styleColor} hidden={totalSpent !== amount}>
                <CheckCircleIcon width={40} className="completed-flag-icon"/>
            </div>
        </div>
    )
}

export default BudgetCard