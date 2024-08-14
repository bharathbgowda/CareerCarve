import React, { useEffect, useState } from "react";
import "../style.css";
import FormInput from "../../components/FormInput/FormInput";
import Select from "react-select";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import userData from "../../users.json";

const Login = () => {
  let navigate = useNavigate();

  const routeChange = (newPath) => {
    let path = newPath;
    navigate(path);
  };

  // LOADER
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  // VARIABLES
  const [modalIsOpen, setIsOpen] = useState(false);
  const [res, setRes] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    whois: "",
  });

  // MODAL CSS
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: '35%',
      textAlign: 'center',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // INPUTS
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Enter a valid email address",
      label: "Email",
      pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Enter Password",
      label: "Password",
      required: true,
    },
  ];

  const options = [
    { value: 'mentor', label: 'Mentor' },
    { value: 'student', label: 'Student' }
  ];

  // MODAL FUNCTIONS
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // FORM FUNCTIONS
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored user data based on the role selected
    let storedUser;
    if (values.whois === 'student') {
      storedUser = userData.loginCredentials.student;
    } else if (values.whois === 'mentor') {
      storedUser = userData.loginCredentials.mentor;
    }

    // Check if the email and password match
    if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
      localStorage.setItem('authorisation', `${values.whois}-token`);
      routeChange(`../${values.whois}`);
    } else {
      setRes("Invalid credentials. Please try again.");
      openModal();
    }
  };

  return (
    <div className="app">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h2>{res}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
      {loading ? (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>Who are you?</label>
          <Select 
            required={true} 
            options={options} 
            name="whois"  
            onChange={(e) => setValues({ ...values, whois: e.value })} 
          />
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
         <button type="submit">Login</button>
<Link to={'/register'} style={{ textDecoration: 'none' }}>
  <h3>New User?</h3>
</Link>

        </form>
      ) : (
        <div className="scheduler"></div>
      )}
    </div>
  );
};

export default Login;
