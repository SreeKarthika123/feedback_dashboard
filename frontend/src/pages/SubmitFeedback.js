// import React, { useEffect, useState } from "react";

// export default function SubmitFeedback() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [strengths, setStrengths] = useState("");
//   const [areas, setAreas] = useState("");
//   const [sentiment, setSentiment] = useState("positive");

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await fetch("http://127.0.0.1:8000/employees", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       const data = await res.json();
//       setEmployees(data);
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         employee_id: employeeId,
//         strengths,
//         areas_to_improve: areas,
//         sentiment
//       })
//     });
//     const data = await res.json();
//     alert(data.msg);
//     window.location.href = "/dashboard";
//   };

//   return (
//     <div>
//       <h1>Submit Feedback</h1>
//       <select value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
//         <option value="">Select Employee</option>
//         {employees.map(emp => (
//           <option key={emp.id} value={emp.id}>
//             {emp.name} ({emp.email})
//           </option>
//         ))}
//       </select><br/>
//       <textarea
//         placeholder="Strengths"
//         value={strengths}
//         onChange={e => setStrengths(e.target.value)}
//       /><br/>
//       <textarea
//         placeholder="Areas to Improve"
//         value={areas}
//         onChange={e => setAreas(e.target.value)}
//       /><br/>
//       <select value={sentiment} onChange={e => setSentiment(e.target.value)}>
//         <option value="positive">Positive</option>
//         <option value="neutral">Neutral</option>
//         <option value="negative">Negative</option>
//       </select><br/>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";

// export default function SubmitFeedback() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [strengths, setStrengths] = useState("");
//   const [areas, setAreas] = useState("");
//   const [sentiment, setSentiment] = useState("positive");

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await fetch("http://127.0.0.1:8000/employees", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       const data = await res.json();
//       setEmployees(data);
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         employee_id: employeeId,
//         strengths,
//         areas_to_improve: areas,
//         sentiment
//       })
//     });
//     const data = await res.json();
//     alert(data.msg);
//     window.location.href = "/dashboard";
//   };

//   const styles = {
//     container: {
//       maxWidth: "500px",
//       margin: "50px auto",
//       padding: "30px",
//       background: "#f9f9f9",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "28px",
//       color: "#333",
//     },
//     select: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "15px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "15px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//       resize: "vertical",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "600",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Submit Feedback</h1>

//       <select
//         style={styles.select}
//         value={employeeId}
//         onChange={e => setEmployeeId(e.target.value)}
//       >
//         <option value="">Select Employee</option>
//         {employees.map(emp => (
//           <option key={emp.id} value={emp.id}>
//             {emp.name} ({emp.email})
//           </option>
//         ))}
//       </select>

//       <textarea
//         style={styles.textarea}
//         rows="4"
//         placeholder="Strengths"
//         value={strengths}
//         onChange={e => setStrengths(e.target.value)}
//       />

//       <textarea
//         style={styles.textarea}
//         rows="4"
//         placeholder="Areas to Improve"
//         value={areas}
//         onChange={e => setAreas(e.target.value)}
//       />

//       <select
//         style={styles.select}
//         value={sentiment}
//         onChange={e => setSentiment(e.target.value)}
//       >
//         <option value="positive">Positive</option>
//         <option value="neutral">Neutral</option>
//         <option value="negative">Negative</option>
//       </select>

//       <button style={styles.button} onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";

// export default function SubmitFeedback() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [strengths, setStrengths] = useState("");
//   const [areas, setAreas] = useState("");
//   const [sentiment, setSentiment] = useState("positive");

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await fetch("http://127.0.0.1:8000/employees", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setEmployees(data);
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         employee_id: employeeId,
//         strengths,
//         areas_to_improve: areas,
//         sentiment,
//       }),
//     });
//     const data = await res.json();
//     alert(data.msg);
//     window.location.href = "/dashboard";
//   };

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     container: {
//       maxWidth: "500px",
//       padding: "30px",
//       background: "#fff",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "28px",
//       color: "#333",
//     },
//     select: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "15px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "15px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//       resize: "vertical",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "600",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h1 style={styles.title}>Submit Feedback</h1>

//         <select
//           style={styles.select}
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp.id} value={emp.id}>
//               {emp.name} ({emp.email})
//             </option>
//           ))}
//         </select>

//         <textarea
//           style={styles.textarea}
//           rows="4"
//           placeholder="Strengths"
//           value={strengths}
//           onChange={(e) => setStrengths(e.target.value)}
//         />

//         <textarea
//           style={styles.textarea}
//           rows="4"
//           placeholder="Areas to Improve"
//           value={areas}
//           onChange={(e) => setAreas(e.target.value)}
//         />

//         <select
//           style={styles.select}
//           value={sentiment}
//           onChange={(e) => setSentiment(e.target.value)}
//         >
//           <option value="positive">Positive</option>
//           <option value="neutral">Neutral</option>
//           <option value="negative">Negative</option>
//         </select>

//         <button style={styles.button} onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import toast, { Toaster } from "react-hot-toast";
// import { FaRegSmileBeam } from "react-icons/fa";

// export default function SubmitFeedback() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [strengths, setStrengths] = useState("");
//   const [areas, setAreas] = useState("");
//   const [sentiment, setSentiment] = useState("positive");
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const res = await fetch("http://127.0.0.1:8000/employees", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setEmployees(data);
//     };
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         employee_id: employeeId,
//         strengths,
//         areas_to_improve: areas,
//         sentiment,
//       }),
//     });
//     const data = await res.json();
//    toast.success(data.msg || "Feedback submitted!");
//     setShowConfetti(true);
//     setTimeout(() => {
//       window.location.href = "/dashboard";
//     }, 2500); // Let confetti show for 2.5 seconds
//   };

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     container: {
//       maxWidth: "500px",
//       width: "100%",
//       padding: "40px",
//       background: "rgba(255, 255, 255, 0.15)",
//       borderRadius: "16px",
//       boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(255, 255, 255, 0.3)",
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "25px",
//       fontSize: "32px",
//       color: "#333",
//       fontWeight: "700",
//     },
//     select: {
//       width: "100%",
//       padding: "12px",
//       marginBottom: "20px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "16px",
//       background: "rgba(255, 255, 255, 0.8)",
//       outline: "none",
//     },
//     textarea: {
//       width: "100%",
//       padding: "12px",
//       marginBottom: "20px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "16px",
//       resize: "vertical",
//       background: "rgba(255, 255, 255, 0.8)",
//       outline: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "14px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "10px",
//       cursor: "pointer",
//       fontSize: "18px",
//       fontWeight: "600",
//       transition: "all 0.3s ease",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h1 style={styles.title}>✨ Submit Feedback ✨</h1>

//         <select
//           style={styles.select}
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp.id} value={emp.id}>
//               {emp.name} ({emp.email})
//             </option>
//           ))}
//         </select>

//         <textarea
//           style={styles.textarea}
//           rows="4"
//           placeholder="Strengths"
//           value={strengths}
//           onChange={(e) => setStrengths(e.target.value)}
//         />

//         <textarea
//           style={styles.textarea}
//           rows="4"
//           placeholder="Areas to Improve"
//           value={areas}
//           onChange={(e) => setAreas(e.target.value)}
//         />

//         <select
//           style={styles.select}
//           value={sentiment}
//           onChange={(e) => setSentiment(e.target.value)}
//         >
//           <option value="positive">Positive</option>
//           <option value="neutral">Neutral</option>
//           <option value="negative">Negative</option>
//         </select>

//         <button
//           style={styles.button}
//           onClick={handleSubmit}
//           onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
//           onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//         >
//           Submit 🚀
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import toast, { Toaster } from "react-hot-toast";

export default function SubmitFeedback() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [strengths, setStrengths] = useState("");
  const [areas, setAreas] = useState("");
  const [sentiment, setSentiment] = useState("positive");
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("http://127.0.0.1:8000/employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/feedback", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: employeeId,
        strengths,
        areas_to_improve: areas,
        sentiment,
      }),
    });
    const data = await res.json();
    toast.success(`Boom! 🎉 ${data.msg || "Feedback submitted!"}`);
    setShowConfetti(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 4500);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    container: {
      maxWidth: "500px",
      width: "100%",
      padding: "40px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    title: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "32px",
      color: "#333",
      fontWeight: "700",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.8)",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      resize: "vertical",
      background: "rgba(255, 255, 255, 0.8)",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <Toaster position="top-center" />
      {showConfetti && <Confetti width={width} height={height} />}
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>✨ Submit Feedback ✨</h1>

          <select
            style={styles.select}
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>

          <textarea
            style={styles.textarea}
            rows="4"
            placeholder="Strengths"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            rows="4"
            placeholder="Areas to Improve"
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
          />

          <select
            style={styles.select}
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <button
            style={styles.button}
            onClick={handleSubmit}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Submit 🚀
          </button>
        </div>
      </div>
    </>
  );
}
