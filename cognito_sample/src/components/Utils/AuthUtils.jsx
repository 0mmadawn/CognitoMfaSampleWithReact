import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const AuthUtils = {
  getUserPool: () => {
    const poolData = {
      UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
      Storage: sessionStorage,
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    return userPool;
  },
  // get auth status and jwt token
  // TODO: bad method name
  isAuthenticated: async () => {
    const userPool = AuthUtils.getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser == null) return [false, ''];

    const session_result = await (() =>
      new Promise((resolve) => {
        cognitoUser.getSession((err, session) => {
          if (err) resolve([false, '']);
          const jwt_token = session.getIdToken().getJwtToken();
          if (!jwt_token) resolve([false, '']);
          console.log('auth ok');
          return resolve([true, jwt_token]);
        });
      }))();
    return session_result;
  },
};
export default AuthUtils;
