import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase.init';

const SignUp = () => {
    //password show
    const [showPassword, setShowpassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //submit pannel 
    const handleSignForm = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        // console.log("input file:", name, email, password);

        //reset error message
        setErrorMessage('');
        setSuccess(false)

        //terms condition accept info
        if (!terms) {
            setErrorMessage('Please accept our terms and condition.')
            return;
        }
        //password customise 
        // console.log(typeof password)
        if (password.length < 6) {
            setErrorMessage("password should be 6 character or logger")
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must be at least 6 characters and include at least one letter and one number.");
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log("create", result.user)
                setSuccess(true)

                //email verification
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("plase confirm your email address.")
                    })

                //update profile
                const profile = {
                    displayName: name
                }
                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log('your profile is updated')
                    })
                    .catch(error => {
                        console.log('User profile update error')
                    })
            })


            .catch(error => {
                setErrorMessage(error.message)
                setSuccess(false);

            })

    }
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Create Account</h1>
                </header>

                <form onSubmit={handleSignForm} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="name" className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name='email'
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
                            name='password'
                            placeholder="********"
                            className="input input-bordered w-full"
                            required
                        />
                        <button onClick={() => { setShowpassword(!showPassword) }} className='absolute right-4 mt-3'> {showPassword ? <FaEye /> : <IoEyeOff />}</button>
                    </div>

                    <div className="form-control mt-4">
                        <label className="label cursor-pointer">
                            <input type="checkbox" name="terms" className="checkbox" />
                            <span className="label-text">Accept our terms and condition</span>

                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <footer className="text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <a className="text-primary hover:underline">
                        <NavLink to="/login">Log in</NavLink>
                    </a>
                </footer>

                {
                    success && <p className='text-green-300 font-medium'>sign up is a success</p>
                }
                {
                    errorMessage && <p className='text-red-500 font-medium'>{errorMessage}</p>
                }
            </div>
        </section>
    );
};

export default SignUp;
