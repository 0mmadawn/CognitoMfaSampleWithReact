const SignInButton = (props) => {
  return (
    <div className={'field'}>
      <button
        className={'button is-success'}
        disabled={props.disabled}
        onClick={(event) => props.onClick(event)}
      >
        SignIn
      </button>
    </div>
  );
};
export default SignInButton;
