//? react router 
import { Form, NavLink } from "react-router-dom"

//? lIBRARY 
import { TrashIcon } from "@heroicons/react/24/solid"

//? assets
import logoMark from "../assets/logomark.svg" 

export const Nav = ({ username }) => {
    return (
        <nav>
            <NavLink to="/" aria-label="Go to home">
                <img src={logoMark} alt="Logo" height={30}/>
                <span>Home Budget</span>
            </NavLink>
            {
                username && (
                    <Form
                        method="POST"
                        action="logout"
                        onSubmit={(e) => {
                            if (!confirm("Delete user and all data?")) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <button type="submit" className="btn btn--warning">
                            <span>Delete User</span>
                            <TrashIcon width={20}/>
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}
