import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserTasks } from "../features/user/userSlice";
import { addUserTask } from "../utils/firebaseUtils";

const TaskForm = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleNameChange = (e) => setName(e.target.value);

  const clearForm = (e) => {
    e.target[0].value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addUserTask({ name, done: false });
    dispatch(setUserTasks(response));

    clearForm(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" id="name" onChange={handleNameChange} />
      <button type="submit">Add task</button>
    </form>
  );
};

export default TaskForm;
