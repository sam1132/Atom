import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { TbChecks } from "react-icons/tb";

import { useAuth } from "../../../auth/Context";

const Docket = () => {
  const { backendUser, setBackendUser, currentUser } = useAuth();
  const [inputText, setInputText] = useState("");

  const handleAddTodo = async () => {
    if (!inputText.trim()) return;
    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
        body: JSON.stringify({
          task: inputText,
        }),
      });
      if (!response.ok) throw new Error("Failed to create todo");
      const newTodo = await response.json();
      setBackendUser((prev) => ({
        ...prev,
        todos: [...prev.todos, newTodo],
      }));
      setInputText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleComplete = async (todoId, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todos/${todoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
          body: JSON.stringify({
            isCompleted: !currentStatus,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update todo");
      const updatedTodo = await response.json();
      setBackendUser((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todos/${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete todo");
      setBackendUser((prev) => ({
        ...prev,
        todos: prev.todos.filter((todo) => todo._id !== todoId),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-[15px] h-full w-full gap-[15px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center h-[45px] shrink-0 text-xs font-bold text-[#aaa] uppercase">
          Docket
        </div>
        {/* <div className="h-[37.5px] max-[475px]:w-[125px] rounded-[7.5px] bg-[#2f184b]/37.5 border-[1px] border-[#2f184b]/75 flex items-center overflow-hidden">
          <div className="border-0 h-[37.5px] w-[37.5px] shrink-0 grid place-items-center text-[#bbb] text-sm">
            <BsSearch />
          </div>
          <input
            type="text"
            className="flex-1 py-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent"
            placeholder="Search..."
          />
        </div> */}
      </div>

      <div className="relative flex flex-col items-center justify-center p-[15px] min-h-[125px] w-full rounded-[10px] bg-fuchsia-950/75">
        <div className="absolute inset-0 bg-[url('/todo.jpg')] bg-repeat rounded-[10px] mix-blend-multiply opacity-50" />
        <p className="text-2xl font-extrabold text-[#eee] z-1">
          Less Clutter, More Focus
        </p>
        <p className="text-md font-medium text-[#bbb] z-1">
          A simple, elegant to-do list that helps you stay organized without the
          noise.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="relative h-[125px] w-full flex flex-col gap-[5px] bg-white/5 rounded-[10px] border-[1px] border-[#2f184b]/75">
          <textarea
            rows="5"
            maxLength="75"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="p-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent overflow-y-auto [&::-webkit-scrollbar]:hidden"
            placeholder="Write it down, get it done."
          />
          <div
            onClick={handleAddTodo}
            className="absolute bottom-[10px] right-[10px] flex items-center justify-center h-[37.5px] w-[37.5px] rounded-[7.5px] cursor-pointer text-[#bbb] hover:text-[#eee] bg-purple-950/75 hover:bg-purple-950 text-lg shrink-0"
          >
            <FaPlus />
          </div>
        </div>
        {backendUser?.todos?.map((todo) => (
          <div
            key={todo._id || todo}
            className="relative h-[125px] w-full flex flex-col gap-[5px] bg-white/5 rounded-[10px] border-[1px] border-[#2f184b]/75"
          >
            <p
              className={`p-3 border:none focus:outline-none text-sm font-normal text-[#eee] bg-transparent overflow-y-auto [&::-webkit-scrollbar]:hidden ${
                todo.isCompleted ? "line-through opacity-50" : ""
              } `}
            >
              {todo.task}
            </p>
            <div className="absolute bottom-[10px] right-[10px] flex items-center justify-center gap-[2.5px] h-[37.5px] text-lg shrink-0">
              <div
                onClick={() => handleToggleComplete(todo._id, todo.isCompleted)}
                className="flex items-center justify-center h-[25px] w-[25px] rounded-[7.5px] cursor-pointer text-emerald-500/50 hover:text-emerald-500 text-xl"
              >
                <TbChecks />
              </div>
              <div
                onClick={() => handleDeleteTodo(todo._id)}
                className="flex items-center justify-center h-[25px] w-[25px] rounded-[7.5px] cursor-pointer text-red-500/50 hover:text-red-500"
              >
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docket;
