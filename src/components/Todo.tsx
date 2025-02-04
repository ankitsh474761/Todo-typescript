import React, { FormEvent, useState } from "react";

interface taskType {
  id: number;
  taskName: string;
  isCompleted: boolean;
}
const Todo = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<taskType[]>([]);
  //   const [isChecked,setIsChecked] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTask: taskType = {
      id: Date.now() * Math.random(),
      taskName: task,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  const handleCheckBoxChange = (taskId: number) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  const handleEdit = (taskId: number) => {
    const editedTask = prompt("enter task here");
    if (editedTask !== null && editedTask !== "") {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === taskId ? { ...item, taskName: editedTask } : item
        )
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="task-name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button style={{marginLeft:"10px"}} type="submit">Add Task</button>
      </form>
      <div>
        <h2>Tasks</h2>
        {tasks &&
          tasks?.map((item, i) => (
            <div key={item.id}>
             
                <input
                  style={{cursor:"pointer"}}
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckBoxChange(item.id)}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "1.5rem",
                    textDecoration: `${
                      item?.isCompleted ? "line-through" : ""
                    }`,
                    color: `${item.isCompleted ? "green" : "red"}`,
                  }}
                >
                  {item?.taskName}
                </span>
            
              <span
                style={{ marginLeft: "20px" , cursor:"pointer" }}
                onClick={() => handleEdit(item.id)}
              >
                Edit Task ✏️
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
