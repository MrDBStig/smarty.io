import { signInWithGooglePopup, signOutUser } from "./utils/firebaseUtils";

const HomePage = () => {
  const handleSubmit = () => {};

  const signOut = () => signOutUser();

  return (
    <main>
      <h1>This is a homepage</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
        <button type="button" onClick={signInWithGooglePopup}>
          Sign Up with Google
        </button>
      </form>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </main>
  );
};

export default HomePage;
