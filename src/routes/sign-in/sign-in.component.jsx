import {
  signInWithGooglePopup,
  createUserProfileDocument,
  createUserdocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  //  whenever you make a call to some database, this is going to be asynchronous.
  const logGoogleUser = async () => {
    // So we want to get the value here.By awaiting calling or signing with Google pop up.
    const { user } = await signInWithGooglePopup();
    // createUserdocumentFromAut gets called via the user object in the response document from the signIn
    createUserdocumentFromAuth(user);

    const userDocRef = await createUserdocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      {/* we're going to set the on click method so that it uses our log Google user method. */}
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
