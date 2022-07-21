import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { signOutUser } from "../utils/firebaseUtils";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Modal from "./Modal";

const HomePage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const { currentUser } = useSelector((store) => store.user);

  const signOut = () => signOutUser();
  const showModal = () => setIsHidden(false);

  useEffect(() => {
    setIsRegistered(true);
    setIsHidden(true);
  }, [currentUser]);

  return (
    <>
      <header className="header">
        <div className="container">
          {currentUser ? (
            <button type="button" className="blue-btn" onClick={signOut}>
              Sign Out
            </button>
          ) : (
            <button type="button" className="blue-btn" onClick={showModal}>
              Sign In
            </button>
          )}
        </div>
      </header>
      <main className="main">
        {!currentUser ? (
          <>
            <h2>Sign in to start</h2>
            <Modal
              props={{ isHidden, isRegistered, setIsRegistered, setIsHidden }}
            />
          </>
        ) : (
          <>
            <TaskForm />
            <TaskList />
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
