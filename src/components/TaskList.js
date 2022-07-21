import { useSelector } from "react-redux";

import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useSelector((store) => store.user);

  return (
    <>
      {tasks.length !== 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </ul>
      ) : (
        <h2>No tasks added</h2>
      )}
    </>
  );
};

export default TaskList;
