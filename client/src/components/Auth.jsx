import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import styled from "styled-components";
// import signinImage from '../components/map.jpg';

const Container = styled.div`
.auth__form-container {
    min-height: 100vh;
   
    display: flex;
    flex-direction: row;
}
  
.auth__form-container_fields {
  
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background:  #61C0BF;
}
  
  .auth__form-container_image {
    flex: 3;
    display: flex;
    box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.05);
  }
  
  .auth__form-container_image img {
    width: 100%;
    height: 100%;
  }
  
  .auth__form-container_fields-content {
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  
    padding: 2rem;
    box-shadow: 0px 1px 5px rgb(0 0 0 / 10%);
    border-radius: 5px;
    transition: 0.8s ease;
    background: #fff;
  }
  
  .auth__form-container_fields-content p {
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #05245a;
    font-weight: 900;
  }
  
  .auth__form-container_fields-content_input {
    display: flex;
    flex-direction: column;
    position: relative;
  
    margin: 1rem 0rem;
  }
  
  .auth__form-container_fields-content_input label {
    margin-bottom: 0.45rem;
    color: rgb(61, 79, 88);
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.7px;
    line-height: 1.3;
  }
  
  .auth__form-container_fields-content_input input {
    padding: 0.55rem 0.4rem;
    border: 1px solid rgb(184, 196, 194);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: all 150ms ease-in-out 0s;
    width: 90%;
    background: #fff;
  }
  
  .auth__form-container_fields-content_input input::placeholder {
    color: #b1b1b1;
    width: 100%;
    font-weight: unset;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .auth__form-container_fields-content_input input:hover {
    border-color: #dcdddd;
  }
  
  .auth__form-container_fields-content_input input:focus,
  .auth__form-container_fields-content_input input:active {
    box-shadow: 0px 0px 0px 1.5px #005fff;
    border-color: #005fff;
  }
  
  .auth__form-container_fields-content_input-password {
    position: absolute;
    right: 13%;
    top: 50%;
    cursor: pointer;
  }
  
  .auth__form-container_fields-content_button {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
  }
  
  .auth__form-container_fields-content_button button {
    border-radius: 4px;
    background: #005fff;
    border: 1px solid #005fff;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    padding: 0.7rem 1.2rem;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
  }
  
  .auth__form-container_fields-content_button button:hover {
    background: #0066ff;
  }
  
  .auth__form-container_fields-account {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  
    margin-top: 0.2rem;
  }
  
  .auth__form-container_fields-account p {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
  
  .auth__form-container_fields-account span {
    color: #05245a;
    cursor: pointer;
    font-weight: 700;
  }
  
  @media screen and (max-width: 800px) {

    .auth__form-container_fields-content{
      width: 70vw;
    }
    .auth__form-container {
      flex-direction: column-reverse;
    }
  
    .auth__form-container_fields {
      justify-content: flex-start;
    }
  
    .auth__form-container_image {
      height: 100px;
      flex: none;
      box-shadow: none;
    }
  
    .auth__form-container_image img {
      object-fit: cover;
    }
  }
  
  @media screen and (max-width: 375px) {
    .auth__form-container_fields {
      padding: 2rem 0.5rem;
    }
  
    .auth__form-container_fields-content_input input {
      width: 95%;
    }
  
    .auth__form-container_fields-content_input-password {
      right: 3%;
    }
}
`;

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        const { fullName, username, password, avatarURL } = form;

        const URL = 'https://class-chat-server-22.vercel.app/auth';
        //'http://localhost:5000/auth';
        // const URL = 'https://medical-pager.herokuapp.com/auth';
        // 'https://clock-chat2.herokuapp.com/auth' || 


        const{ data: { token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, avatarURL});
        console.log(form);

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
 
        if(isSignup) {
          cookies.set('avatarURL', avatarURL);
          cookies.set('hashedPassword', hashedPassword);
        }
        window.location.reload();
      }

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <Container>
             <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL(Your name)</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            {/* <div className="auth__form-container_image"> */}
                {/* <img src={signinImage} alt="sign in" /> */}
            {/* </div> */}
        </div>
        </Container>
    )
}

export default Auth;