import {
  signInWithGooglePopup,
  createUserProfileDocument,
  createUserdocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    //
    const { user } = await signInWithGooglePopup();
    // createUserdocumentFromAut gets called via the user object in the response document
    createUserdocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
