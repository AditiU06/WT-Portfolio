import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNumber: ""
  });

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/students", form);
    }

    setForm({ name: "", email: "", rollNumber: "" });
    load();
  };

  const edit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student CRUD App</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="rollNumber"
        placeholder="Roll Number"
        value={form.rollNumber}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={submit}>
        {editId ? "Update" : "Add"}
      </button>

      <hr />

      {students.map(s => (
        <div key={s._id}>
          <p>
            {s.name} | {s.email} | {s.rollNumber}
          </p>
          <button onClick={() => edit(s)}>Edit</button>
          <button onClick={() => del(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}