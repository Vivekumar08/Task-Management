/* eslint-disable react/prop-types */
import { useState } from "react";

const DispTasks = ({ task, uid }) => {
  const { title, description, status, _id } = task;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  // const URL = "http://localhost:5500";
  const URL = "https://task-management-9ni1.onrender.com";

  const handleEditTask = async (e) => {
    e.preventDefault();
    const values = {
      title: editTitle,
      description: editDescription,
      userId: uid,
    };
    const response = await fetch(`${URL}/task/?id=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      setIsModalOpen(false);
    }
  };

  const updateStatus = async (_id, uuserId) => {
    const values = { userId: uuserId };
    await fetch(`${URL}/task/status/?id=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  const onDelete = async (_id, uuserId) => {
    const values = { userId: uuserId };
    const response = await fetch(`${URL}/task/?id=${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      window.alert("Task deleted successfully");
    } else {
      window.alert("Internal server error");
    }
  };

  return (
    <>
      <div className="container">
        <div className="card mb-3">
          <div className="card-body">
            <h5
              className={`card-title ${
                status ? "text-decoration-line-through" : ""
              }`}
            >
              {title}
            </h5>
            <p
              className={`card-text ${
                status ? "text-decoration-line-through" : ""
              }`}
            >
              {description}
            </p>
            <div onClick={() => updateStatus(_id, uid)} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={status}
                disabled
              />
              <label className="form-check-label">
                {status ? "Completed" : "Incomplete"}
              </label>
            </div>
            <button
              className={`btn btn-primary ${
                status ? "disabled not-allowed" : ""
              }`}
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => onDelete(_id, uid)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* Edit Task Modal */}
      {isModalOpen && (
        <div className="container">
          <div className="card mb-3">
            <div className="card-body">
              <form onSubmit={handleEditTask}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Task</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Edit Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DispTasks;
