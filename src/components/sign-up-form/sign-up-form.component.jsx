<<<<<<< HEAD
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
=======
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
<<<<<<< HEAD
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
=======
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
<<<<<<< HEAD
      alert('passwords do not match');
=======
      alert("passwords do not match");
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
<<<<<<< HEAD
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
=======
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
<<<<<<< HEAD
    <div className="sign-up-container">
=======
    <SignUpContainer>
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
<<<<<<< HEAD
    </div>
=======
    </SignUpContainer>
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
  );
};

export default SignUpForm;
