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
    <li className={`task-list-item ${done && "done-task"}`}>
      <input
        type="checkbox"
        name="done"
        id="done"
        defaultChecked={done}
        className="task-list-item-input"
        onClick={handleCheckChange}
      />
      <span className={`task-list-item-name`}>{name}</span>
      <button
        className="task-list-item-btn red-btn"
        type="button"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
