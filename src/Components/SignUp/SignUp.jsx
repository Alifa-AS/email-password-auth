import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.init';


const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPass, setShowPass] = useState(false)


    const handleSignUp = (e) =>{
        e.preventDefault();
        const email = (e.target.email.value);
        const password = (e.target.password.value);
        const name = (e.target.name.value);
        const photo = (e.target.photo.value);
        const terms = (e.target.terms.checked)
        console.log(email, password, name, photo, terms);

        // reset error status
        setErrorMessage('');
        setSuccess(false);

        if(!terms){
            setErrorMessage('please accept our terms and conditions!');
            return;
        }

        if(password.length < 6){
            setErrorMessage('Password should be at least 6 characters or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(!passwordRegex.test(password)){
            setErrorMessage('At least one uppercase, one lowercase, one number, one special character')
            return;
        }


        // create user 
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
            setSuccess(true);

            // send verification email address
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('verification email sent!')
        });

           //update profile name and photo
        const profile = {
            displayName : name,
            photoURL : photo
        }

        updateProfile(auth.currentUser, profile)
            .then(()=> {
                console.log('profile updated!')
            })
            .catch(error => {
                console.log('user Profile update error!')
            })

        })
        
        .catch(error =>{
            setErrorMessage(error.message)
            setSuccess(false);
        })
    }
    return (
             
            <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-10">             
            <h3 className="text-3xl ml-4 font-bold">Sign UP now!</h3>
                <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" placeholder="photo url" name='photo' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPass ? 'text' : 'password'} 
                    placeholder="password" 
                    name='password' 
                    className="input input-bordered" required />
                    <button 
                    onClick={() => setShowPass(!showPass)}
                    className='btn btn-xs absolute right-4 top-12'>
                        {
                            showPass ? <FaEyeSlash/> : <FaEye />
                        }
                        </button>

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text ml-2">Accept our terms and conditions</span>
                        </label>
                        </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-warning">Sign Up</button>
                    </div>
                </form>
                {
                    errorMessage && <p className='text-red-600'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-500 pl-5'>Sign Up Successfully!</p>
                }

                <p>Already have an account! <Link className='text-green-500 underline' to="/login">Login</Link></p>
            </div>
    );
};

export default SignUp;