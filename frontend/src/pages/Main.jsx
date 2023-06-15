import { useEffect, useState } from 'react'
import DispTasks from '../components/DispTasks';
import AddTask from '../components/AddTask';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [task, setTask] = useState();
    // const URL = "http://localhost:5500";
    const URL = "https://task-management-9ni1.onrender.com";
  
    const loggedIn = useSelector((state) => state.users.loggedIn);
    const userDetails = useSelector((state) => state.users.userDetails);
    let navigate = useNavigate();
    const fetchTask = async () => {
      const response = await fetch(`${URL}/task/?id=${userDetails.userId}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setTask(data);
      } else {
        setTask(null);
      }
    };
    useEffect(() => {
      if (!loggedIn) {
        navigate("/login"); // Navigate to the login page if not logged in
      } else {
        fetchTask();
      }
    }, [fetchTask]);
  
    if (!loggedIn) {
      return null; // Render nothing if not logged in
    }
    return (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Hi, {userDetails.name}</h5>
            <p className="card-text">User ID: {userDetails.userId}</p>
            <p className="card-text">Email: {userDetails.email}</p>
          </div>
        </div>
        <div className="my-2">
          <AddTask id={userDetails.userId} />
        </div>
        <div className="my-2">
          {task &&
            task.map((task) => (
              <DispTasks key={task._id} task={task} uid={userDetails.userId} />
            ))}
        </div>
      </>
    );
}

export default Main