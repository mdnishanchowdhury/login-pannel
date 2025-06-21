import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase.init';
function Login() {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    //view password
    const [showPassword, setShowPassword] = useState(false);
    console.log(showPassword)
    const emailRef = useRef();

    //login form
    const handleLoginForm = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        setErrorMessage('')
        setSuccess(false);

        //sign in
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                if (!result.user.emailVerified) {
                    console.log("please valid email")
                    setErrorMessage("please valid email address.")
                }
                else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
                setErrorMessage(errorMessage)
            })

    }

    //forget password

    const handleForgotPassword = () => {
        const email = (emailRef.current.value)
        sendPasswordResetEmail(auth, email)
            .then(result => {
                setErrorMessage('check email address')
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Login Account</h1>
                </header>

                <form onSubmit={handleLoginForm} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control relative">
                        <label htmlFor="password" className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="********"
                            className="input input-bordered w-full"
                            required
                        />
                        <button onClick={() => { setShowPassword(!showPassword) }} className='absolute right-4 mt-3'>{showPassword ? <FaEye /> : <IoEyeOff />}</button>
                    </div>


                    <label onClick={handleForgotPassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <footer className="text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <a className="text-primary hover:underline">
                        <Link to="/signup">Sign up</Link>
                    </a>
                </footer>
                {
                    success && <h3 className='text-green-400 font-medium'>user login success</h3>
                }
                {
                    errorMessage && <h3 className='text-red-600 font-medium'>{errorMessage}</h3>
                }
            </div>
        </section>
    )
}

export default Login