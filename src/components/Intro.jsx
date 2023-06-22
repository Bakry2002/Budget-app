
//? react router 
import { useFetcher } from "react-router-dom"

//? icons 
import { UserPlusIcon } from "@heroicons/react/24/solid"

//? assets
import illustration from "../assets/illustration.jpg"

const Intro = () => {
    const fetcher = useFetcher(); // to track the status of the request and to provide a method to make the request
    const isSubmitting = fetcher.state === "submitting"
    return (
        <div className="intro">
            <div>
                <h1>Take Control of <span className="accent">Your Money</span></h1>
                <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
                <fetcher.Form method="POST">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Your Username" 
                        required
                        aria-label="Your Username"
                        autoComplete="given-name" // this is a hint to the browser to autofill the input field with the user's name.
                    />
                    <input type="hidden" name="_action" value="newUser"/>
                    <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? (
                            <span>Logging...</span>
                        ) : 
                        (
                            <>
                                <span>Create Account</span>
                                <UserPlusIcon width={20}/>
                            </>
                        )
                    }
                </button>
                </fetcher.Form>
            </div>
            <img src={illustration} alt="Person with money" width={600}/>
        </div>
    )
}

export default Intro

