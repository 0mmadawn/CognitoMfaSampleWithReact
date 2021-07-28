import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LogoutButton from '~/components/Admin/LogoutButton';
import AuthUtils from '~/components/Utils/AuthUtils';

const Admin = () => {
  const [is_auth, setIsAuth] = useState(false);
  const [jwt_token, setJwtToken] = useState('');
  let history = useHistory();

  useEffect(() => {
    async function auth() {
      await AuthUtils.isAuthenticated().then((res) => {
        const tmp_is_auth = res[0];
        setIsAuth(tmp_is_auth);
        setJwtToken(res[1]);
        if (!tmp_is_auth) {
          alert('please login');
          history.push('/login');
          console.log('not authenticeted');
        } else {
          console.log('auth done');
        }
      });
    }
    auth();
    // if you forget `[]`, `useEffect` will loop ifinitely
    // and get scolded by AWS cognito
  }, []);

  if (is_auth) {
    return (
      <div>
        <section className={'section'}>
          <h2 className={'is-size-2'}>Auth OK!</h2>
          <span>your jwt_token:</span>
          <br />
          <span className={'is-size-7'}>{jwt_token}</span>
          <hr />
          <LogoutButton />
        </section>
      </div>
    );
  } else {
    return <p>back to login page...</p>;
  }
};

export default Admin;
