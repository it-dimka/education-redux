import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {
  completeTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  taskDeleted,
  createTask,
  titleChanged
} from "./store/task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getErrors} from "./store/errors";

const store = configureStore();

const App = (params) => {
  const state = [...useSelector(getTasks())];
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const removeTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const foo = {
    title: new Date().getTime().toString(),
    completed: false,
  };

  return (
      <>
        <h1>App</h1>
        <button style={{backgroundColor: 'greenyellow'}} onClick={() => dispatch(createTask(foo))}>CreateTask</button>
        <ul>
          {state.reverse().map((el) => (
              <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
                <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
                <button onClick={() => removeTask(el.id)}>Delete</button>
                <hr/>
              </li>
          ))}
        </ul>
      </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
);
