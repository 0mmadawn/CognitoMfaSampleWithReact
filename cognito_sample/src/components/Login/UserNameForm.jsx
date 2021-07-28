import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserNameForm = (props) => {
  return (
    <div className={'field'}>
      <label htmlFor="userName" className={'label'}>
        User Name
      </label>
      <div className={'control has-icons-left'}>
        <input
          type="text"
          id="userName"
          name="userName"
          className={'input'}
          value={props.value}
          placeholder="User Name"
          required
          onChange={(event) => props.onChange(event.target.value)}
        />
        <span className={'icon is-small is-left'}>
          <FontAwesomeIcon icon={faUser} />
        </span>
      </div>
    </div>
  );
};
export default UserNameForm;
