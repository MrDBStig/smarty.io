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
    if (!name) return;
    const response = await addUserTask({ name, done: false });
    dispatch(setUserTasks(response));

    clearForm(e);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Add your task"
        className="task-form-input"
        onChange={handleNameChange}
      />
      <button className="task-form-btn blue-btn" type="submit">
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
