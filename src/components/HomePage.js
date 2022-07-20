import { signInWithGooglePopup, signOutUser } from "../utils/firebaseUtils";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const HomePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const signOut = () => signOutUser();

  return (
    <main>
      <section>
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
          <button type="submit">Sign In</button>
          <button type="button" onClick={signInWithGooglePopup}>
            Sign In with Google
          </button>
        </form>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </section>
      <div>
        <TaskForm />
      </div>
      <div>
        <TaskList />
      </div>
    </main>
  );
};

export default HomePage;
