import { useSelector } from "react-redux";

import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, currentUser } = useSelector((store) => store.user);

  if (!currentUser) {
    return (
      <>
        <h2>Sign in to start</h2>
      </>
    );
  }

  return (
    <>
      {tasks.length !== 0 ? (
        <ul>
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
