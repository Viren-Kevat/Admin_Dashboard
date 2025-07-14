import { useEffect, useState } from "react";
import axios from "../axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    eod: "",
    userId: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async (role, userId) => {
    try {
      const res =
        role === "admin"
          ? await axios.get("/task/admin/all")
          : await axios.get(`/user/task/userTasks/${userId}`);

      const tasks = res.data.data?.execute || [];
      setTasks(tasks);
    } catch (err) {
      if (err.response?.status === 404) {
        setTasks([]);
      } else {
        console.error("Failed to fetch tasks", err);
        setError("Could not fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.post("/admin/all");
      setUsers(res.data.execute || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleApproveUser = async (id) => {
    try {
      await axios.post(`/admin/approve/${id}`);
      alert("User approved");
      fetchUsers();
    } catch (err) {
      console.error("Failed to approve user", err);
      alert("Failed to approve user");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = localStorage.getItem("user");
        if (!raw || raw === "undefined" || raw === "null")
          throw new Error("Corrupted or missing user data");

        const userData = JSON.parse(raw);
        if (!userData?.id || !userData?.role)
          throw new Error("Incomplete user data");

        setUser(userData);
        fetchTasks(userData.role, userData.id);
        if (userData.role === "admin") {
          fetchUsers();
        }
      } catch (err) {
        console.error("User load error", err);
        localStorage.removeItem("user");
        setError("User not logged in or session expired");
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleCreate = async () => {
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.eod ||
      !newTask.userId
    ) {
      return alert("All fields (title, description, eod, userId) are required");
    }

    try {
      await axios.post("/task/admin/add", newTask);
      alert("Task created");
      setNewTask({ title: "", description: "", eod: "", userId: "" });
      fetchTasks(user.role, user.id);
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Failed to create task");
    }
  };

  const handleUpdate = (task) => {
    setEditingTask(task);
  };

  const handleUpdateSubmit = async () => {
    if (!editingTask?.title || !editingTask?.description) return;
    try {
      await axios.put(
        `/task/admin/update/${editingTask.id || editingTask._id}`,
        {
          title: editingTask.title,
          description: editingTask.description,
        }
      );
      alert("Task updated");
      setEditingTask(null);
      fetchTasks(user.role, user.id);
    } catch {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/task/admin/delete/${id}`);
      alert("Task deleted");
      fetchTasks(user.role, user.id);
    } catch {
      alert("Delete failed");
    }
  };

  const handleProgress = async (id) => {
    try {
      await axios.put(`/user/task/progress/${id}`);
      alert("Marked as In Progress");
      fetchTasks(user.role, user.id);
    } catch {
      alert("Failed to mark progress");
    }
  };

  const handleDone = async (id) => {
    try {
      await axios.put(`/user/task/done/${id}`);
      alert("Marked as Done");
      fetchTasks(user.role, user.id);
    } catch {
      alert("Failed to mark done");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ... (same imports and logic as before)
  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "1rem",
    },
    subHeading: {
      fontSize: "18px",
      marginBottom: "0.5rem",
    },
    logoutButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "2rem",
    },
    section: {
      marginBottom: "2rem",
    },
    formRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    input: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      flex: "1",
      minWidth: "150px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "0.5rem",
    },
    smallButton: {
      padding: "4px 10px",
      backgroundColor: "#17a2b8",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "0.5rem",
      marginTop: "0.5rem",
    },
    list: {
      listStyle: "none",
      paddingLeft: "0",
    },
    listItem: {
      padding: "0.5rem 0",
      borderBottom: "1px solid #ddd",
    },
    taskCard: {
      backgroundColor: "white",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
    },
    status: {
      fontStyle: "italic",
      color: "gray",
      marginLeft: "0.5rem",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      background: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "400px",
    },
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Welcome, {user.role === "admin" ? "Admin" : user.username}
      </h2>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      {user.role === "admin" && (
        <div style={styles.section}>
          <h3 style={styles.subHeading}>Create Task</h3>
          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="date"
              value={newTask.eod}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  eod: new Date(e.target.value).toISOString(),
                })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="User ID"
              value={newTask.userId}
              onChange={(e) =>
                setNewTask({ ...newTask, userId: e.target.value })
              }
              style={styles.input}
            />
            <button onClick={handleCreate} style={styles.button}>
              Create
            </button>
          </div>
        </div>
      )}

      {user.role === "admin" && (
        <div style={styles.section}>
          <h3 style={styles.subHeading}>All Users</h3>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul style={styles.list}>
              {users.map((u) => (
                <li key={u.id} style={styles.listItem}>
                  <strong>{u.username}</strong> ({u.email}) -{" "}
                  {u.is_Approved ? "✅ Approved" : "❌ Not Approved"}
                  {!u.is_Approved && (
                    <button
                      onClick={() => handleApproveUser(u.id)}
                      style={styles.smallButton}
                    >
                      Approve
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div style={styles.section}>
        <h3 style={styles.subHeading}>Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul style={styles.list}>
            {tasks.map((task) => {
              const id = task.id || task._id;
              return (
                <li key={id} style={styles.taskCard}>
                  <b>{task.title}</b>: {task.description}
                  {task.status && (
                    <span style={styles.status}>[{task.status}]</span>
                  )}
                  <br />
                  {task.eod && (
                    <small>
                      EOD: {new Date(task.eod).toLocaleDateString("en-IN")}
                    </small>
                  )}
                  <br />
                  {task.created_At && (
                    <small>
                      Created:{" "}
                      {new Date(task.created_At).toLocaleDateString("en-IN")}
                    </small>
                  )}
                  <br />
                  {user.role === "admin" ? (
                    <>
                      <button
                        onClick={() => handleUpdate(task)}
                        style={styles.smallButton}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        style={styles.smallButton}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleProgress(id)}
                        style={styles.smallButton}
                      >
                        Progress
                      </button>
                      <button
                        onClick={() => handleDone(id)}
                        style={styles.smallButton}
                      >
                        Done
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {editingTask && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.subHeading}>Update Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Description"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
              style={styles.input}
            />
            <div>
              <button onClick={handleUpdateSubmit} style={styles.button}>
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                style={{ ...styles.button, marginLeft: "1rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
