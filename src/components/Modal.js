import {
  signInWithGooglePopup,
  signInUserWithEmail,
  createNewUserWithEmail,
} from "../utils/firebaseUtils";

const Modal = ({ props }) => {
  const { isRegistered, setIsRegistered, isHidden, setIsHidden } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (isRegistered) {
      signInUserWithEmail(email, password);
    } else {
      const confirmPassword = e.target[2].value;
      if (password === confirmPassword) {
        createNewUserWithEmail(email, password);
        e.target[2].value = "";
      } else {
        alert("Passwords do not match!");
        e.target[2].value = "";
      }
    }

    e.target[0].value = "";
    e.target[1].value = "";
  };

  const closeModal = () => setIsHidden(true);

  const toggleRegistered = () => setIsRegistered(!isRegistered);

  return (
    <>
      <div className={`modal ${isHidden && "hidden"}`}>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {!isRegistered && (
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm your password"
            />
          )}
          <button className="blue-btn" type="submit">
            {isRegistered ? "Sign In" : "Sign Up"}
          </button>
          {isRegistered && (
            <button
              type="button"
              className="btn google-btn"
              onClick={signInWithGooglePopup}
            >
              Sign In with Google
            </button>
          )}
          {isRegistered ? (
            <p className="toggle-paragraph">
              Not registered?
              <span className="toggle-span" onClick={toggleRegistered}>
                Sign Up
              </span>
            </p>
          ) : (
            <p className="toggle-paragraph">
              Registered?
              <span className="toggle-span" onClick={toggleRegistered}>
                Sign In
              </span>
            </p>
          )}
        </form>
        <span className="times" onClick={closeModal}>
          &#215;
        </span>
      </div>
      <div className={`overlay ${isHidden && "hidden"}`} />
    </>
  );
};

export default Modal;
