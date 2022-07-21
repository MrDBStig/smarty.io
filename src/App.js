import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUserTasks } from "./features/user/userSlice";
import HomePage from "./components/HomePage";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserTasks,
} from "./utils/firebaseUtils";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user?.uid));
        const tasks = await getUserTasks();
        dispatch(setUserTasks(tasks));
      } else {
        dispatch(setCurrentUser(null));
        dispatch(setUserTasks([]));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
