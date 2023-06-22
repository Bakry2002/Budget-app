/* eslint-disable react/prop-types */

import ExpenseCard from "./ExpenseCard"

const Table = ({ expanses }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            [ "Name", "Amount", "Date", "Budget", "" ].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expanses.map((expense) => (
                            <tr key={expense.id}>
                                <ExpenseCard expense={expense} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table