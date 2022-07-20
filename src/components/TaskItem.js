import { useDispatch } from "react-redux";
import { updateUserTask, deleteUserTask } from "../utils/firebaseUtils";
import { setUserTasks } from "../features/user/userSlice";

const TaskItem = (task) => {
  const { name, done } = task;

  const dispatch = useDispatch();

  const handleCheckChange = async (e) => {
    const checked = e.target.checked;
    const tasks = await updateUserTask({ ...task, done: checked });
    dispatch(setUserTasks(tasks));
  };

  const handleDeleteTask = async () => {
    const tasks = await deleteUserTask(task);
    dispatch(setUserTasks(tasks));
  };

  return (
    <li>
      <input
        type="checkbox"
        name="done"
        id="done"
        onChange={handleCheckChange}
      />
      <span>{name}</span>
      <button type="button" onClick={handleDeleteTask}>
        x
      </button>
    </li>
  );
};

export default TaskItem;
