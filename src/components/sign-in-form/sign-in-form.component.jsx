import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// tracking inputs can be done with either several individual useState values or by grouping them into one object. all with empty strings.
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // takes in defaultFormFields as a document  and setFormFields as data
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructuring the values of formFields to be referensed later in the component
  const { email, password } = formFields;
  console.log(formFields);

  // resets Form gets initated after user has been created
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //  whenever you make a call to some database, this is going to be asynchronous.

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // initiated by submitEventHandler
  // takes in event
  const handleSubmit = async (event) => {
    // prevent any automatic behaviour of the form
    event.preventDefault();

    try {
      resetFormFields();
    } catch (error) {}
  };

  // takes in an input whenever the text of any of the inputs changes
  // by structuring or ("tying ") (event) to "name" and "value"
  // And inside input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>

      <form onSubmit={handleSubmit}>
        {/* to bring functionality to the form we need to track the actual input inside of these INPUTS into our form component. with useState */}

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

        <Button type="submit">Sign In</Button>
        <Button buttonType="google" onClick={signInWithGoogle}>
          Google sign in
        </Button>
      </form>
    </div>
  );
};
export default SignInForm;
