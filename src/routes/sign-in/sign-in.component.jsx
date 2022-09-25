import {
  signInWithGooglePopup,
  createUserdocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  // So now what we're saying is that inside of this code. I want to run a news effect and I want to run this when this sign in component  mounts for the first time.

  //  whenever you make a call to some database, this is going to be asynchronous.
  const logGoogleUser = async () => {
    // So we want to get the value here.By awaiting calling or signing with Google pop up.
    const { user } = await signInWithGooglePopup();
    // createUserdocumentFromAut gets called via the user object in the response document from the signIn
    createUserdocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      {/* we're going to set the on click method so that it points to log Google user method. */}
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
