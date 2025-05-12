import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import styles from "../styles/Backoffice.module.css";

export default function Backoffice() {
  const { user, signedIn } = useAuth(); 
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    weekday: "",
    time: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/activities")
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/activities/${editingId}`
      : "http://localhost:5000/activities";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", weekday: "", time: "", description: "", image: "" });
    setEditingId(null);
    const res = await fetch("http://localhost:5000/activities");
    const data = await res.json();
    setActivities(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/activities/${id}`, { method: "DELETE" });
    setActivities(activities.filter(a => a._id !== id));
  };

  const handleEdit = (activity) => {
    setForm({
      title: activity.title,
      weekday: activity.weekday,
      time: activity.time,
      description: activity.description,
      image: activity.image,
    });
    setEditingId(activity._id);
  };

  if (!signedIn || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Backoffice</h1>
        <div className={styles.topLinks}>
          <a href="/">Back to frontend</a>
          <a href="#">Edit subscribers</a>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Activities</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td className={styles.actions}>
                <button className={styles.actionBtn} onClick={() => handleEdit(a)}>Update</button>
                <button className={styles.actionBtn} onClick={() => handleDelete(a._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.gridForms}>
        <div className={styles.formBox}>
          <h2>Add activity</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Activity</label>
            <input className={styles.text1} type="text" name="title" placeholder="Enter title" value={form.title} onChange={handleChange} />

            <label>Date</label>
            <input className={styles.text1} type="text" name="weekday" placeholder="Enter date" value={form.weekday} onChange={handleChange} />

            <label>Time</label>
            <input className={styles.text1} type="text" name="time" placeholder="Enter time" value={form.time} onChange={handleChange} />

            <label>Description</label>
            <input className={styles.text1} type="text" name="description" placeholder="Enter description" value={form.description} onChange={handleChange} />

            <label>Image</label>
            <input className={styles.text1} type="text" name="image" placeholder="Upload image" value={form.image} onChange={handleChange} />

            <button type="submit" className={styles.actionBtn}>Add new activity</button>
          </form>
        </div>

        {editingId && (
          <div className={styles.formBox}>
            <h2>Update activity - {form.title}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Activity</label>
              <input className={styles.text1} type="text" name="title" value={form.title} onChange={handleChange} />

              <label>Date</label>
              <input className={styles.text1} type="text" name="weekday" value={form.weekday} onChange={handleChange} />

              <label>Time</label>
              <input className={styles.text1} type="text" name="time" value={form.time} onChange={handleChange} />

              <label>Description</label>
              <textarea className={styles.box1} name="description" value={form.description} onChange={handleChange} />

              <label>Image</label>
              <input className={styles.text1} type="text" name="image" value={form.image} onChange={handleChange} />

              <button type="submit" className={styles.actionBtn}>Update activity</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
