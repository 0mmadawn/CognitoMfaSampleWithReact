import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const PasswordForm = (props) => {
  return (
    <div className={'field'}>
      <label htmlFor="password" className={'label'}>
        Password
      </label>
      <div className={'control has-icons-left'}>
        <input
          type="password"
          id="password"
          name="password"
          className={'input'}
          value={props.value}
          required
          onChange={(event) => props.onChange(event.target.value)}
          placeholder="Password"
        />
        <span className={'icon is-small is-left'}>
          <FontAwesomeIcon icon={faLock} />
        </span>
      </div>
    </div>
  );
};
export default PasswordForm;
