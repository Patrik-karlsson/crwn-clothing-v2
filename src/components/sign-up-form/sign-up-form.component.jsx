import { useState } from 'react';
import FormInput from '../form_input/form-input.component';
import {
  createAuthUserWithEmailAndPassword,
  createUserdocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// tracking inputs can be done with either several individual useState values or by grouping them into one object. all with empty strings.
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // takes in defaultFormFields as a document  and setFormFields as data
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring the values of formFields to be referensed later in the component
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  // resets Form gets initated after user has been created
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  // initiated by submitEventHandler
  // takes in event
  const handleSubmit = async (event) => {
    // prevent any automatic behaviour of the form
    event.preventDefault();
    // does password match with confirm password?
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    // create user document from the returns
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserdocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      // is the user authenticated?
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  // takes in an input whenever the text of any of the inputs changes
  // by structuring or ("tying ") (event) to "name" and "value"
  // And inside input
  const handleChange = (event) => {
    const { name, value } = event.target;
    // all we need to do now is just say set form fields and what we're going to set it is an object because we're only going to be updating one input.
    // So this will spread all of the fields and then we're just going to update the appropriate field by using these square brackets inside of our object notation.

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="Sign-up-container">
      <h2>Don't hav an account?</h2>
      <span>Sign up with email and password</span>
      {/* form componenet gives special form features like input and label which guide and constrain users.  */}
      {/* type ="" (designated attributes of a field like email, text or number)
      required (has to be filled in by the user)*/}
      {/* form also comes with a bound event handler called onSubmit which runs a callback. activated when the button with type="submit" is clicked*/}
      <form onSubmit={handleSubmit}>
        {/* to bring functionality to the form we need to track the actual input inside of these INPUTS into our form component. with useState */}

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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
