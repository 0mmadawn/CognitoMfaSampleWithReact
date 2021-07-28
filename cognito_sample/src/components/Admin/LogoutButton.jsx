import { useHistory } from 'react-router-dom';
import AuthUtils from '~/components/Utils/AuthUtils';

const LogoutButton = (props) => {
  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    const userPool = AuthUtils.getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      console.log('logout success');
      cognitoUser.signOut();
    }
    history.push('/login');
  };

  return (
    <div className={'field'}>
      <button
        className={'button is-success'}
        onClick={(event) => handleLogout(event)}
      >
        Logout
      </button>
    </div>
  );
};
export default LogoutButton;
