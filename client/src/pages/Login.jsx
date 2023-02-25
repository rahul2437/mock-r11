import React, { useState } from "react";
import { MdLock, MdEmail, MdAccountBox } from "react-icons/md";

const initFormState = {
  email: "",
  password: "",
};
const URl = `http://localhost:8080/user/login`;
const Login = () => {
  const [form, setForm] = useState(initFormState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(form);
    fetch(URl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.token ? "Login successful" : "Try again");
        const token = `Bearer ${data.token}`;
        localStorage.setItem("access-token", token);
        // setForm(initFormState);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="border flex flex-col w-3/4 mx-auto items-center gap-4 py-6">
        <h1 className="text-3xl">Login</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 justify-center"
        >
          <div className="border flex items-center gap-2 px-2 rounded">
            <MdEmail className="text-2xl text-slate-600" />
            <input
              onChange={onChange}
              value={form.email}
              className="px-2 py-1"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="border flex items-center gap-2 px-2 rounded">
            <MdLock className="text-2xl text-slate-600" />
            <input
              onChange={onChange}
              value={form.password}
              className="px-2 py-1"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <input
            className="px-2 py-1 bg-blue-400 rounded hover:bg-blue-500 text-white font-bold"
            type="submit"
            value="LOGIN"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
