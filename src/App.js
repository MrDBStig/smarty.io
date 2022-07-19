import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./features/user/userSlice";
import HomePage from "./HomePage";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebaseUtils";

function App() {
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user?.uid));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      {currentUser}
      <HomePage />
    </div>
  );
}

export default App;
