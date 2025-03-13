import React, { useState } from "react";
import {useNavigate  } from "react-router-dom";

interface FormData {
  name: string;
  password: string;
}

interface ApiResponse {
  token: number;
  name: string;
  role: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '' , password:''});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.name || !formData.password) {
      setError("Both fields are required.");
      return;
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data: ApiResponse = await response.json();
      setResponse(data);
      if (response.ok) {
        navigate("/");
        sessionStorage.setItem('sessionData', JSON.stringify({ token: data.token, role : data.role, name: data.name}));
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } 
  };

  return (
    <main className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}

        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;