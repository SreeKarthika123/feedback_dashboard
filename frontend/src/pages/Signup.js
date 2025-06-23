// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(""); // ✅ match backend
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("employee");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     const res = await fetch("http://127.0.0.1:8000/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, role }), // ✅ match backend
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert(data.msg);
//       navigate("/");
//     } else {
//       alert(data.detail || "Signup failed");
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       /><br/>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       /><br/>
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /><br/>
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="employee">Employee</option>
//         <option value="manager">Manager</option>
//       </select><br/>
//       <button onClick={handleSignup}>Register</button>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [inputFocused, setInputFocused] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert(data.msg);
//         navigate("/");
//       } else {
//         setError(data.detail || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error during signup. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const styles = {
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     squareBox: {
//       display: "flex",
//       width: "800px",
//       height: "500px",
//       backgroundColor: "#fff",
//       borderRadius: "16px",
//       boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     imageSide: {
//       width: "50%",
//       backgroundColor: "#f0f0f0",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     image: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//     },
//     formSide: {
//       width: "50%",
//       padding: "40px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//     },
//     title: {
//       fontSize: "26px",
//       fontWeight: "600",
//       textAlign: "center",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     label: {
//       fontSize: "14px",
//       color: "#444",
//       marginBottom: "6px",
//       display: "block",
//     },
//     input: {
//       width: "100%",
//       padding: "10px 12px",
//       marginBottom: "16px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "14px",
//       outline: "none",
//     },
//     select: {
//       width: "100%",
//       padding: "10px 12px",
//       marginBottom: "16px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "14px",
//       outline: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: inputFocused
//         ? "linear-gradient(to right, #1e88e5, #8e24aa)"
//         : "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       fontWeight: "600",
//       border: "none",
//       borderRadius: "8px",
//       cursor: loading ? "not-allowed" : "pointer",
//       fontSize: "16px",
//       transition: "all 0.3s ease-in-out",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
//       ...(isHovered
//         ? {
//             transform: "scale(1.03)",
//             boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
//           }
//         : {}),
//     },
//     error: {
//       backgroundColor: "#ffebee",
//       color: "#c62828",
//       textAlign: "center",
//       padding: "10px",
//       borderRadius: "6px",
//       marginBottom: "15px",
//       fontSize: "14px",
//     },
//     footer: {
//       textAlign: "center",
//       fontSize: "14px",
//       marginTop: "16px",
//       color: "#666",
//     },
//     link: {
//       color: "#007bff",
//       textDecoration: "none",
//       fontWeight: "500",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.squareBox}>
//         <div style={styles.imageSide}>
//           <img src="/girl.jpg" alt="Girl" style={styles.image} />
//         </div>
//         <div style={styles.formSide}>
//           <h2 style={styles.title}>Create an Account</h2>

//           {error && <div style={styles.error}>{error}</div>}

//           <form onSubmit={handleSignup}>
//             <label htmlFor="name" style={styles.label}>
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               onFocus={() => setInputFocused(true)}
//               onBlur={() => setInputFocused(false)}
//               required
//               style={styles.input}
//             />

//             <label htmlFor="email" style={styles.label}>
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onFocus={() => setInputFocused(true)}
//               onBlur={() => setInputFocused(false)}
//               required
//               style={styles.input}
//             />

//             <label htmlFor="password" style={styles.label}>
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onFocus={() => setInputFocused(true)}
//               onBlur={() => setInputFocused(false)}
//               required
//               style={styles.input}
//             />

//             <label htmlFor="role" style={styles.label}>
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               style={styles.select}
//             >
//               <option value="employee">Employee</option>
//               <option value="manager">Manager</option>
//             </select>

//             <button
//               type="submit"
//               disabled={loading}
//               style={styles.button}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>

//           <p style={styles.footer}>
//             Already have an account?{" "}
//             <a href="/" style={styles.link}>
//               Login here
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Check password strength
    const password = formData.password;
    const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!strongPassword.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
      return; // stop signup
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
        navigate("/");
      } else {
        setError(data.detail || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    squareBox: {
      display: "flex",
      width: "800px",
      height: "500px",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    imageSide: {
      width: "50%",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    formSide: {
      width: "50%",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: "26px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    label: {
      fontSize: "14px",
      color: "#444",
      marginBottom: "6px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: inputFocused
        ? "linear-gradient(to right, #1e88e5, #8e24aa)"
        : "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      ...(isHovered
        ? {
            transform: "scale(1.03)",
            boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
          }
        : {}),
    },
    error: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      textAlign: "center",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "15px",
      fontSize: "14px",
    },
    footer: {
      textAlign: "center",
      fontSize: "14px",
      marginTop: "16px",
      color: "#666",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.squareBox}>
        <div style={styles.imageSide}>
          <img src="/girl.jpg" alt="Girl" style={styles.image} />
        </div>
        <div style={styles.formSide}>
          <h2 style={styles.title}>Create an Account</h2>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSignup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <label htmlFor="role" style={styles.label}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p style={styles.footer}>
            Already have an account?{" "}
            <a href="/" style={styles.link}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
