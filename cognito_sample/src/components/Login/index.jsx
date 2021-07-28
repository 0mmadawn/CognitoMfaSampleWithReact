import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserNameForm from '~/components/Login/UserNameForm';
import PasswordForm from '~/components/Login/PasswordForm';
import SignInButton from '~/components/Login/SignInButton';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AuthUtils from '~/components/Utils/AuthUtils';

import 'bulma/css/bulma.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  let history = useHistory();

  const userPool = AuthUtils.getUserPool();

  const canSubmit = () => {
    const isValidUserName = !!userName;
    const isValidPassword = !!password;
    const isValidEmailMessage = userNameMessage === '';
    const isValidPasswordMessage = passwordMessage === '';
    return (
      isValidUserName &&
      isValidPassword &&
      isValidEmailMessage &&
      isValidPasswordMessage &&
      !loading
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // just required check
    // this is not necessary. required attribute of input tag will do the job
    if (!userName) setUserNameMessage('input user name');
    if (!password) setPasswordMessage('input password');

    // do auth
    const userData = {
      Username: userName,
      Pool: userPool,
      Storage: sessionStorage,
    };
    // define user
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // add pw
    const authenticationData = { Username: userName, Password: password };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    // authentication
    // TODO: if you don't need MFA, delete `mfaRequired` block and modify cognito setting
    cognitoUser.authenticateUser(authenticationDetails, {
      // event when one-time password is required
      mfaRequired: function (secretCode) {
        console.log('try　mfa');
        const mfaCode = prompt('input PIN code');
        if (!mfaCode) {
          alert('retry login');
          return;
        }
        console.log('mfa success');
        // `this` means calllback of `authenticateUser()`
        cognitoUser.sendMFACode(mfaCode, this);
      },
      // signin success, transition to next page
      onSuccess: (result) => {
        console.log('success');
        history.push('/');
      },
      // signin failure, show error message
      onFailure: (err) => {
        console.log(err);
        setAuthErrorMessage(err.message);
      },
    });
    setLoading(false);
  };

  return (
    <div className={'hero is-primary is-fullheight'}>
      <div id="signin" className={'hero-body'}>
        <div className={'container'}>
          <div className={'columns is-centered'}>
            <form
              name="form-signin"
              className={'box'}
              onSubmit={(e) => e.preventDefault()}
            >
              <UserNameForm value={userName} onChange={(e) => setUserName(e)} />
              <PasswordForm value={password} onChange={(e) => setPassword(e)} />
              <SignInButton disabled={!canSubmit()} onClick={handleSubmit} />
              <ul>
                {userNameMessage && (
                  <li className={'has-text-danger'}>{userNameMessage}</li>
                )}
                {passwordMessage && (
                  <li className={'has-text-danger'}>{passwordMessage}</li>
                )}
                {authErrorMessage && (
                  <li className={'has-text-danger'}>{authErrorMessage}</li>
                )}
              </ul>
            </form>
          </div>
        </div>
        {/* div.container */}
      </div>
      {/* div#signin */}
    </div> // div.hero
  );
};

export default Login;
