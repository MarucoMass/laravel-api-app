import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";


const Register = () => {

const { setToken } = useContext(AuthContext);

const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const [errors, setErrors] = useState({});

 const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData)
    })

    const data = await res.json();

    if (data.errors) {
        setErrors(data.errors);
    } else {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate("/");
    }

 }

  return (
    <>
      <h1 className="title">Register a new account</h1>

      <form onSubmit={handleRegister} className="max-w-3xl mx-auto space-y-6">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div>
          <input
            type="password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>
        <button className="primary-btn" type="submit">
          Register
        </button>
      </form>
    </>
  );
}

export default Register