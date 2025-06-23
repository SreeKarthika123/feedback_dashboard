
// import React, { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("http://localhost:8000/feedbacks", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setFeedbacks(data.feedbacks);
//       setRole(data.role);
//     };
//     fetchData();
//   }, []);

//   const acknowledge = async (id) => {
//     await fetch(`http://localhost:8000/acknowledge/${id}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     alert("Acknowledged!");
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h1>Dashboard ({role})</h1>
//       {feedbacks.map((fb) => (
//         <div key={fb._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//           <p><strong>Strengths:</strong> {fb.strengths}</p>
//           <p><strong>Areas to Improve:</strong> {fb.areas_to_improve}</p>
//           <p><strong>Sentiment:</strong> {fb.sentiment}</p>
//           {role === "employee" && !fb.acknowledged && (
//             <button onClick={() => acknowledge(fb._id)}>Acknowledge</button>
//           )}
//         </div>
//       ))}
//       {role === "manager" && (
//         <a href="/submit">Submit New Feedback</a>
//       )}
//     </div>
// //   );
// // }import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchAll = async () => {
//       const token = localStorage.getItem("token");
//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }
//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };
//     fetchAll();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter(fb => fb.employee_id === emp.id);
//     return acc;
//   }, {});


//   const handleAcknowledge = async (id) => {
//   console.log("🚀 ID to acknowledge:", id);

//   // Confirm the body you are sending
//   const body = JSON.stringify({ feedback_id: id });
//   console.log("📦 Body being sent:", body);

//   const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: body,
//   });

//   console.log("📡 HTTP status:", res.status);

//   // Attempt to parse JSON safely
//   let data;
//   try {
//     data = await res.json();
//   } catch (err) {
//     console.error("❌ Failed to parse JSON response:", err);
//   }

//   console.log("✅ Acknowledge response data:", data);

//   if (res.ok) {
//     setFeedbacks(prev =>
//       prev.map(fb => fb.id === id ? { ...fb, acknowledged: true } : fb)
//     );
//   } else {
//     alert(data?.detail || "Failed to acknowledge");
//   }
// };

//   // ✅ Update handler (simplified: you can use a modal instead)
//   const handleUpdate = async (id) => {
//     const strengths = prompt("New strengths:");
//     const areas = prompt("New areas to improve:");
//     const sentiment = prompt("New sentiment (positive/neutral/negative):");
//     await fetch(`http://127.0.0.1:8000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ strengths, areas_to_improve: areas, sentiment }),
//     });
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee"><button>Add Employee</button></Link>
//           <Link to="/submit"><button>Submit Feedback</button></Link>

//           <h2>Your Employees & Feedback</h2>
//           <ul>
//             {employees.map(emp => (
//               <li key={emp.id}>
//                 <strong>{emp.name} ({emp.email})</strong>
//                 <ul>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map(fb => (
//                       <li key={fb.id}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                         {" "}
//                         <button onClick={() => handleUpdate(fb.id)}>Edit</button>
//                       </li>
//                     ))
//                   ) : (
//                     <li>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <Link to="/submit"><button>Submit Feedback</button></Link>
//           <h2>Your Feedback</h2>
//           <ul>
//             {feedbacks.map(fb => (
//               <li key={fb.id}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                 {!fb.acknowledged && (
//                   <button onClick={() => handleAcknowledge(fb.id)}>Acknowledge</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   // Group feedbacks by employee ID
//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter(fb => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   // ✅ Acknowledge handler for employees
//   const handleAcknowledge = async (id) => {
//     const body = JSON.stringify({ feedback_id: id });

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: body,
//     });

//     if (res.ok) {
//       setFeedbacks(prev =>
//         prev.map(fb => fb.id === id ? { ...fb, acknowledged: true } : fb)
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   // ✅ Update handler for managers
//   const handleUpdate = async (id) => {
//     const feedback = feedbacks.find(fb => fb.id === id);
//     if (!feedback) {
//       alert("Feedback not found");
//       return;
//     }

//     const strengths = prompt("Update strengths:", feedback.strengths);
//     if (strengths === null) return;

//     const areas = prompt("Update areas to improve:", feedback.areas_to_improve);
//     if (areas === null) return;

//     const sentiment = prompt(
//       "Update sentiment (positive/neutral/negative):",
//       feedback.sentiment
//     );
//     if (sentiment === null) return;

//     const res = await fetch(`http://127.0.0.1:8000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ strengths, areas_to_improve: areas, sentiment }),
//     });

//     const data = await res.json().catch(() => null);
//     if (res.ok) {
//       alert(data.msg || "Updated successfully");
//       setFeedbacks(prev =>
//         prev.map(fb => fb.id === id ? { ...fb, strengths, areas_to_improve: areas, sentiment } : fb)
//       );
//     } else {
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee"><button>Add Employee</button></Link>
//           <Link to="/submit"><button>Submit Feedback</button></Link>

//           <h2>Your Employees & Feedback</h2>
//           <ul>
//             {employees.map(emp => (
//               <li key={emp.id}>
//                 <strong>{emp.name} ({emp.email})</strong>
//                 <ul>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map(fb => (
//                       <li key={fb.id}>
//                         <div>
//                           Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | 
//                           Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                           {" "}
//                           <button onClick={() => handleUpdate(fb.id)}>Edit</button>
//                         </div>
//                       </li>
//                     ))
//                   ) : (
//                     <li>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <Link to="/submit"><button>Submit Feedback</button></Link>
//           <h2>Your Feedback</h2>
//           <ul>
//             {feedbacks.map(fb => (
//               <li key={fb.id}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | 
//                 Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                 {!fb.acknowledged && (
//                   <button onClick={() => handleAcknowledge(fb.id)}>Acknowledge</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   // Group feedbacks by employee
//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter(fb => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   // ✅ Acknowledge with comment
//   const handleAcknowledge = async (id) => {
//     const comment = prompt("Add a comment (optional):");

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: id,
//         comment: comment || ""
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks(prev =>
//         prev.map(fb =>
//           fb.id === id ? { ...fb, acknowledged: true, comment: comment || "" } : fb
//         )
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   // ✅ Manager update
//   const handleUpdate = async (id) => {
//     const feedback = feedbacks.find(fb => fb.id === id);
//     if (!feedback) {
//       alert("Feedback not found");
//       return;
//     }

//     const strengths = prompt("Update strengths:", feedback.strengths);
//     if (strengths === null) return;

//     const areas = prompt("Update areas to improve:", feedback.areas_to_improve);
//     if (areas === null) return;

//     const sentiment = prompt(
//       "Update sentiment (positive/neutral/negative):",
//       feedback.sentiment
//     );
//     if (sentiment === null) return;

//     // Keep comment as is
//     const comment = feedback.comment || "";

//     const res = await fetch(`http://127.0.0.1:8000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ strengths, areas_to_improve: areas, sentiment, comment }),
//     });

//     const data = await res.json().catch(() => null);
//     if (res.ok) {
//       alert(data.msg || "Updated successfully");
//       setFeedbacks(prev =>
//         prev.map(fb =>
//           fb.id === id ? { ...fb, strengths, areas_to_improve: areas, sentiment } : fb
//         )
//       );
//     } else {
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee"><button>Add Employee</button></Link>
//           <Link to="/submit"><button>Submit Feedback</button></Link>

//           <h2>Your Employees & Feedback</h2>
//           <ul>
//             {employees.map(emp => (
//               <li key={emp.id}>
//                 <strong>{emp.name} ({emp.email})</strong>
//                 <ul>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map(fb => (
//                       <li key={fb.id}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | 
//                         Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         {" "}
//                         <button onClick={() => handleUpdate(fb.id)}>Edit</button>
//                       </li>
//                     ))
//                   ) : (
//                     <li>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <Link to="/submit"><button>Submit Feedback</button></Link>
//           <h2>Your Feedback</h2>
//           <ul>
//             {feedbacks.map(fb => (
//               <li key={fb.id}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button onClick={() => handleAcknowledge(fb.id)}>Acknowledge & Comment</button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications"; // ✅ Import it
// import ReactMarkdown from "react-markdown";
// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const handleAcknowledge = async (id) => {
//     const comment = prompt("Add a comment (optional):");

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: id,
//         comment: comment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, acknowledged: true, comment: comment || "" } : fb
//         )
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleUpdate = async (id) => {
//     const feedback = feedbacks.find((fb) => fb.id === id);
//     if (!feedback) {
//       alert("Feedback not found");
//       return;
//     }

//     const strengths = prompt("Update strengths:", feedback.strengths);
//     if (strengths === null) return;

//     const areas = prompt("Update areas to improve:", feedback.areas_to_improve);
//     if (areas === null) return;

//     const sentiment = prompt(
//       "Update sentiment (positive/neutral/negative):",
//       feedback.sentiment
//     );
//     if (sentiment === null) return;

//     const comment = feedback.comment || "";

//     const res = await fetch(`http://127.0.0.1:8000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ strengths, areas_to_improve: areas, sentiment, comment }),
//     });

//     const data = await res.json().catch(() => null);
//     if (res.ok) {
//       alert(data.msg || "Updated successfully");
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, strengths, areas_to_improve: areas, sentiment } : fb
//         )
//       );
//     } else {
//       alert(data?.detail || "Failed to update");
//     }
//   };
//   const handleRequestFeedback = async () => {
//   const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   });
//   const data = await res.json().catch(() => null);
//   alert(data?.msg || "Request sent");
// };


//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {/* ✅ Add Notifications at top */}
//       <Notifications />

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee"><button>Add Employee</button></Link>
//           <Link to="/submit"><button>Submit Feedback</button></Link>

//           <h2>Your Employees & Feedback</h2>
//           <ul>
//             {employees.map((emp) => (
//               <li key={emp.id}>
//                 <strong>{emp.name} ({emp.email})</strong>
//                 <ul>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | 
//                         Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         {" "}
//                         <button onClick={() => handleUpdate(fb.id)}>Edit</button>
//                       </li>
//                     ))
//                   ) : (
//                     <li>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//         <button onClick={handleRequestFeedback}>Request Feedback</button>
//           <Link to="/submit"><button>Submit Feedback</button></Link>
//           <h2>Your Feedback</h2>
//           <ul>
//             {feedbacks.map((fb) => (
//               <li key={fb.id}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack: {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button onClick={() => handleAcknowledge(fb.id)}>
//                     Acknowledge & Comment
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";
// import ReactMarkdown from "react-markdown";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const handleAcknowledge = async (id) => {
//     const comment = prompt("Add a comment (optional):");

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: id,
//         comment: comment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, acknowledged: true, comment: comment || "" } : fb
//         )
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleUpdate = async (id) => {
//     const feedback = feedbacks.find((fb) => fb.id === id);
//     if (!feedback) {
//       alert("Feedback not found");
//       return;
//     }

//     const strengths = prompt("Update strengths:", feedback.strengths);
//     if (strengths === null) return;

//     const areas = prompt("Update areas to improve:", feedback.areas_to_improve);
//     if (areas === null) return;

//     const sentiment = prompt(
//       "Update sentiment (positive/neutral/negative):",
//       feedback.sentiment
//     );
//     if (sentiment === null) return;

//     const comment = feedback.comment || "";

//     const res = await fetch(`http://127.0.0.1:8000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ strengths, areas_to_improve: areas, sentiment, comment }),
//     });

//     const data = await res.json().catch(() => null);
//     if (res.ok) {
//       alert(data.msg || "Updated successfully");
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, strengths, areas_to_improve: areas, sentiment } : fb
//         )
//       );
//     } else {
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   // ✅ CSS styles
//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#f8f9fa",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginBottom: "30px",
//       color: "#333",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                         Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => handleUpdate(fb.id)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <h2 style={styles.sectionTitle}>Your Feedback</h2>
//           <ul style={styles.list}>
//             {feedbacks.map((fb) => (
//               <li key={fb.id} style={styles.listItem}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack:{" "}
//                 {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button
//                     style={styles.inlineButton}
//                     onClick={() => handleAcknowledge(fb.id)}
//                   >
//                     Acknowledge & Comment
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     const res = await fetch(`http://127.0.0.1:8000/feedback/${editingFeedback.id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(editForm),
//     });

//     if (res.ok) {
//       // ✅ Always show "Saved successfully"
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...editForm } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const handleAcknowledge = async (id) => {
//     const comment = prompt("Add a comment (optional):");

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: id,
//         comment: comment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, acknowledged: true, comment: comment || "" } : fb
//         )
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#f8f9fa",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginBottom: "30px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0, left: 0, right: 0, bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {successMessage && (
//         <p style={styles.success}>{successMessage}</p>
//       )}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                         Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => openEditModal(fb)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <h2 style={styles.sectionTitle}>Your Feedback</h2>
//           <ul style={styles.list}>
//             {feedbacks.map((fb) => (
//               <li key={fb.id} style={styles.listItem}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack:{" "}
//                 {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button
//                     style={styles.inlineButton}
//                     onClick={() => handleAcknowledge(fb.id)}
//                   >
//                     Acknowledge & Comment
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, strengths: e.target.value })
//               }
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, areas_to_improve: e.target.value })
//               }
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, sentiment: e.target.value })
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setEditingFeedback(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitEdit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     // ✅ Reset acknowledged to false
//     const updatedFeedback = {
//       ...editForm,
//       acknowledged: false,
//     };

//     const res = await fetch(
//       `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFeedback),
//       }
//     );

//     if (res.ok) {
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       // Update local state with acknowledged = false
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const handleAcknowledge = async (id) => {
//     const comment = prompt("Add a comment (optional):");

//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: id,
//         comment: comment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === id ? { ...fb, acknowledged: true, comment: comment || "" } : fb
//         )
//       );
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#f8f9fa",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginBottom: "30px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {successMessage && <p style={styles.success}>{successMessage}</p>}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                         Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => openEditModal(fb)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <h2 style={styles.sectionTitle}>Your Feedback</h2>
//           <ul style={styles.list}>
//             {feedbacks.map((fb) => (
//               <li key={fb.id} style={styles.listItem}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack:{" "}
//                 {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button
//                     style={styles.inlineButton}
//                     onClick={() => handleAcknowledge(fb.id)}
//                   >
//                     Acknowledge & Comment
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, strengths: e.target.value })
//               }
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, areas_to_improve: e.target.value })
//               }
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, sentiment: e.target.value })
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setEditingFeedback(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitEdit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   // NEW: For employee acknowledge modal
//   const [ackModal, setAckModal] = useState({ open: false, fbId: null });
//   const [ackComment, setAckComment] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     const updatedFeedback = {
//       ...editForm,
//       acknowledged: false, // force reset
//     };

//     const res = await fetch(
//       `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFeedback),
//       }
//     );

//     if (res.ok) {
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   // ✅ NEW: Open acknowledge modal
//   const openAckModal = (id) => {
//     setAckModal((prev) => {
//     if (prev.fbId !== id) {
//       setAckComment(""); // Clear only for new feedback ID
//     }
//     return { open: true, fbId: id };
//   });
// };

//   const submitAcknowledge = async () => {
//   const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       feedback_id: ackModal.fbId,
//       comment: ackComment || "",
//     }),
//   });

//   if (res.ok) {
//     setFeedbacks((prev) =>
//       prev.map((fb) =>
//         fb.id === ackModal.fbId
//           ? { ...fb, acknowledged: true, comment: ackComment || "" }
//           : fb
//       )
//     );
//     // ✅ Reset comment & modal AFTER submit
//     setAckComment("");
//     setAckModal({ open: false, fbId: null });
//   } else {
//     const data = await res.json().catch(() => null);
//     alert(data?.detail || "Failed to acknowledge");
//   }
// };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#eef2f7",
//       // background: "#f8f9fa",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginBottom: "30px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {successMessage && <p style={styles.success}>{successMessage}</p>}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <Link to="/team-overview">
//   <button style={styles.button}>Team Overview</button>
// </Link>


//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                         Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => openEditModal(fb)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <h2 style={styles.sectionTitle}>Your Feedback</h2>
//           <ul style={styles.list}>
//             {feedbacks.map((fb) => (
//               <li key={fb.id} style={styles.listItem}>
//                 Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} |
//                 Sentiment: {fb.sentiment} | Ack:{" "}
//                 {fb.acknowledged ? "✅" : "❌"}
//                 {fb.comment && <> | Comment: {fb.comment}</>}
//                 {!fb.acknowledged && (
//                   <button
//                     style={styles.inlineButton}
//                     onClick={() => openAckModal(fb.id)}
//                   >
//                     Acknowledge & Comment
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, strengths: e.target.value })
//               }
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, areas_to_improve: e.target.value })
//               }
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, sentiment: e.target.value })
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setEditingFeedback(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitEdit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {ackModal.open && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Acknowledge Feedback</h3>
//             <label>Comment (optional):</label>
//             <textarea
//               rows="4"
//               style={styles.modalInput}
//               value={ackComment}
//               onChange={(e) => setAckComment(e.target.value)}
//               placeholder="Add your comment..."
//             ></textarea>
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setAckModal({ open: false, fbId: null })}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitAcknowledge}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");

//   const [ackModal, setAckModal] = useState({ open: false, fbId: null });
//   const [ackComment, setAckComment] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     const updatedFeedback = {
//       ...editForm,
//       acknowledged: false,
//     };

//     const res = await fetch(
//       `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFeedback),
//       }
//     );

//     if (res.ok) {
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const openAckModal = (id) => {
//     setAckModal((prev) => {
//       if (prev.fbId !== id) {
//         setAckComment("");
//       }
//       return { open: true, fbId: id };
//     });
//   };

//   const submitAcknowledge = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: ackModal.fbId,
//         comment: ackComment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === ackModal.fbId
//             ? { ...fb, acknowledged: true, comment: ackComment || "" }
//             : fb
//         )
//       );
//       setAckComment("");
//       setAckModal({ open: false, fbId: null });
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#eef2f7",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginBottom: "30px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//       position: "relative",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {successMessage && <p style={styles.success}>{successMessage}</p>}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <Link to="/team-overview">
//             <button style={styles.button}>Team Overview</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve: {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button style={styles.inlineButton} onClick={() => openEditModal(fb)}>
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Feedback Timeline</h2>

//           <ul
//             style={{
//               ...styles.list,
//               borderLeft: "4px solid #1976d2",
//               paddingLeft: "20px",
//               position: "relative",
//             }}
//           >
//             {feedbacks
//               .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//               .map((fb) => (
//                 <li key={fb.id} style={styles.listItem}>
//                   <div
//                     style={{
//                       position: "absolute",
//                       left: "-28px",
//                       top: "20px",
//                       width: "12px",
//                       height: "12px",
//                       borderRadius: "50%",
//                       background: "#1976d2",
//                     }}
//                   ></div>
//                   <div style={{ fontWeight: "bold" }}>{formatDate(fb.created_at)}</div>
//                   <div>Strengths: {fb.strengths}</div>
//                   <div>Areas to Improve: {fb.areas_to_improve}</div>
//                   <div>Sentiment: {fb.sentiment}</div>
//                   <div>
//                     Acknowledged: {fb.acknowledged ? "✅" : "❌"}
//                     {fb.comment && <> | Comment: {fb.comment}</>}
//                   </div>
//                   {!fb.acknowledged && (
//                     <button style={styles.inlineButton} onClick={() => openAckModal(fb.id)}>
//                       Acknowledge & Comment
//                     </button>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) => setEditForm({ ...editForm, strengths: e.target.value })}
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) => setEditForm({ ...editForm, areas_to_improve: e.target.value })}
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) => setEditForm({ ...editForm, sentiment: e.target.value })}
//             />
//             <div style={{ textAlign: "right" }}>
//               <button style={{ ...styles.inlineButton, marginRight: "10px" }} onClick={() => setEditingFeedback(null)}>
//                 Cancel
//               </button>
//               <button style={{ ...styles.inlineButton, background: "#28a745" }} onClick={submitEdit}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {ackModal.open && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Acknowledge Feedback</h3>
//             <label>Comment (optional):</label>
//             <textarea
//               rows="4"
//               style={styles.modalInput}
//               value={ackComment}
//               onChange={(e) => setAckComment(e.target.value)}
//               placeholder="Add your comment..."
//             ></textarea>
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setAckModal({ open: false, fbId: null })}
//               >
//                 Cancel
//               </button>
//               <button style={{ ...styles.inlineButton, background: "#28a745" }} onClick={submitAcknowledge}>
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [ackModal, setAckModal] = useState({ open: false, fbId: null });
//   const [ackComment, setAckComment] = useState("");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     const updatedFeedback = {
//       ...editForm,
//       acknowledged: false,
//     };

//     const res = await fetch(
//       `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFeedback),
//       }
//     );

//     if (res.ok) {
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const openAckModal = (id) => {
//     setAckModal((prev) => {
//       if (prev.fbId !== id) {
//         setAckComment("");
//       }
//       return { open: true, fbId: id };
//     });
//   };

//   const submitAcknowledge = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: ackModal.fbId,
//         comment: ackComment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === ackModal.fbId
//             ? { ...fb, acknowledged: true, comment: ackComment || "" }
//             : fb
//         )
//       );
//       setAckComment("");
//       setAckModal({ open: false, fbId: null });
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const formatDate = (iso) => {
//     const date = new Date(iso);
//     return date.toLocaleString();
//   };

//   const getRelativeTime = (isoDate) => {
//     const date = new Date(isoDate);
//     const diff = Date.now() - date.getTime();
//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(diff / (1000 * 60));
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     if (seconds < 60) return `${seconds}s ago`;
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     return `${days}d ago`;
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#eef2f7",
//       minHeight: "100vh",
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       marginTop:"-10px",
//       // marginBottom: "30px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <Notifications />

//       {successMessage && <p style={styles.success}>{successMessage}</p>}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <Link to="/team-overview">
//             <button style={styles.button}>Team Overview</button>
//           </Link>
//           <Link to="/requests">
//   <button style={styles.button}>View Requests</button>
// </Link>


//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve:{" "}
//                         {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => openEditModal(fb)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           {/* <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link> */}
//           <h2 style={styles.sectionTitle}>Your Feedback Timeline</h2>
//           <ul style={styles.list}>
//             {feedbacks
//               .slice()
//               .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//               .map((fb) => (
//                 <li key={fb.id} style={styles.listItem}>
//                   <div>
//                     📌 <strong>{formatDate(fb.created_at)} — {getRelativeTime(fb.created_at)}</strong>
//                   </div>
//                   <div>Strengths: {fb.strengths}</div>
//                   <div>Improve: {fb.areas_to_improve}</div>
//                   <div>Sentiment: {fb.sentiment}</div>
//                   <div>
//                     Ack: {fb.acknowledged ? "✅" : "❌"}
//                     {fb.comment && <> | Comment: {fb.comment}</>}
//                   </div>
//                   {!fb.acknowledged && (
//                     <button
//                       style={styles.inlineButton}
//                       onClick={() => openAckModal(fb.id)}
//                     >
//                       Acknowledge & Comment
//                     </button>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, strengths: e.target.value })
//               }
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, areas_to_improve: e.target.value })
//               }
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, sentiment: e.target.value })
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setEditingFeedback(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitEdit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {ackModal.open && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Acknowledge Feedback</h3>
//             <label>Comment (optional):</label>
//             <textarea
//               rows="4"
//               style={styles.modalInput}
//               value={ackComment}
//               onChange={(e) => setAckComment(e.target.value)}
//               placeholder="Add your comment..."
//             ></textarea>
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setAckModal({ open: false, fbId: null })}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitAcknowledge}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Notifications from "./Notifications";

// export default function Dashboard() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [role, setRole] = useState("");
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [editForm, setEditForm] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "",
//   });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [ackModal, setAckModal] = useState({ open: false, fbId: null });
//   const [ackComment, setAckComment] = useState("");
//   const [signOutModal, setSignOutModal] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole) setRole(storedRole);

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       if (storedRole === "manager") {
//         const empRes = await fetch("http://127.0.0.1:8000/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const empData = await empRes.json();
//         setEmployees(empData);
//       }

//       const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const fbData = await fbRes.json();
//       setFeedbacks(fbData);
//     };

//     fetchData();
//   }, []);

//   const feedbacksByEmployee = employees.reduce((acc, emp) => {
//     acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
//     return acc;
//   }, {});

//   const openEditModal = (fb) => {
//     setEditingFeedback(fb);
//     setEditForm({
//       strengths: fb.strengths,
//       areas_to_improve: fb.areas_to_improve,
//       sentiment: fb.sentiment,
//     });
//   };

//   const submitEdit = async () => {
//     if (!editingFeedback) return;

//     const updatedFeedback = {
//       ...editForm,
//       acknowledged: false,
//     };

//     const res = await fetch(
//       `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFeedback),
//       }
//     );

//     if (res.ok) {
//       setSuccessMessage("Saved successfully");
//       setTimeout(() => setSuccessMessage(""), 3000);

//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
//         )
//       );

//       setEditingFeedback(null);
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to update");
//     }
//   };

//   const openAckModal = (id) => {
//     setAckModal((prev) => {
//       if (prev.fbId !== id) {
//         setAckComment("");
//       }
//       return { open: true, fbId: id };
//     });
//   };

//   const submitAcknowledge = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         feedback_id: ackModal.fbId,
//         comment: ackComment || "",
//       }),
//     });

//     if (res.ok) {
//       setFeedbacks((prev) =>
//         prev.map((fb) =>
//           fb.id === ackModal.fbId
//             ? { ...fb, acknowledged: true, comment: ackComment || "" }
//             : fb
//         )
//       );
//       setAckComment("");
//       setAckModal({ open: false, fbId: null });
//     } else {
//       const data = await res.json().catch(() => null);
//       alert(data?.detail || "Failed to acknowledge");
//     }
//   };

//   const handleRequestFeedback = async () => {
//     const res = await fetch("http://127.0.0.1:8000/feedback/request", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json().catch(() => null);
//     alert(data?.msg || "Request sent");
//   };

//   const handleSignOut = () => {
//     setSignOutModal(true);
//   };

//   const confirmSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   const formatDate = (iso) => {
//     const date = new Date(iso);
//     return date.toLocaleString();
//   };

//   const getRelativeTime = (isoDate) => {
//     const date = new Date(isoDate);
//     const diff = Date.now() - date.getTime();
//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(diff / (1000 * 60));
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     if (seconds < 60) return `${seconds}s ago`;
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     return `${days}d ago`;
//   };

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       background: "#eef2f7",
//       minHeight: "100vh",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     title: {
//       fontSize: "32px",
//       color: "#333",
//     },
//     success: {
//       color: "#28a745",
//       background: "#e6f4ea",
//       padding: "10px",
//       borderRadius: "6px",
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     sectionTitle: {
//       marginTop: "30px",
//       fontSize: "22px",
//       color: "#444",
//     },
//     button: {
//       padding: "10px 20px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "600",
//       margin: "5px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: "0",
//     },
//     listItem: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//     },
//     inlineButton: {
//       marginLeft: "10px",
//       padding: "4px 10px",
//       fontSize: "12px",
//       background: "#1976d2",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     },
//     modalBackdrop: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     modalContent: {
//       background: "#fff",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "400px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//     },
//     modalInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "8px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Dashboard</h1>
//         <button style={styles.button} onClick={handleSignOut}>
//           Sign Out
//         </button>
//       </div>

//       <Notifications />

//       {successMessage && <p style={styles.success}>{successMessage}</p>}

//       {role === "manager" && (
//         <>
//           <Link to="/add-employee">
//             <button style={styles.button}>Add Employee</button>
//           </Link>
//           <Link to="/submit">
//             <button style={styles.button}>Submit Feedback</button>
//           </Link>
//           <Link to="/team-overview">
//             <button style={styles.button}>Team Overview</button>
//           </Link>
//           <Link to="/requests">
//             <button style={styles.button}>View Requests</button>
//           </Link>

//           <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
//           <ul style={styles.list}>
//             {employees.map((emp) => (
//               <li key={emp.id} style={styles.listItem}>
//                 <strong>
//                   {emp.name} ({emp.email})
//                 </strong>
//                 <ul style={styles.list}>
//                   {feedbacksByEmployee[emp.id]?.length > 0 ? (
//                     feedbacksByEmployee[emp.id].map((fb) => (
//                       <li key={fb.id} style={styles.listItem}>
//                         Strengths: {fb.strengths} | Improve:{" "}
//                         {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack:{" "}
//                         {fb.acknowledged ? "✅" : "❌"}
//                         {fb.comment && <> | Comment: {fb.comment}</>}
//                         <button
//                           style={styles.inlineButton}
//                           onClick={() => openEditModal(fb)}
//                         >
//                           Edit
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <li style={styles.listItem}>No feedback yet.</li>
//                   )}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {role === "employee" && (
//         <>
//           <button style={styles.button} onClick={handleRequestFeedback}>
//             Request Feedback
//           </button>
//           <h2 style={styles.sectionTitle}>Your Feedback Timeline</h2>
//           <ul style={styles.list}>
//             {feedbacks
//               .slice()
//               .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//               .map((fb) => (
//                 <li key={fb.id} style={styles.listItem}>
//                   <div>
//                     📌 <strong>{formatDate(fb.created_at)} — {getRelativeTime(fb.created_at)}</strong>
//                   </div>
//                   <div>Strengths: {fb.strengths}</div>
//                   <div>Improve: {fb.areas_to_improve}</div>
//                   <div>Sentiment: {fb.sentiment}</div>
//                   <div>
//                     Ack: {fb.acknowledged ? "✅" : "❌"}
//                     {fb.comment && <> | Comment: {fb.comment}</>}
//                   </div>
//                   {!fb.acknowledged && (
//                     <button
//                       style={styles.inlineButton}
//                       onClick={() => openAckModal(fb.id)}
//                     >
//                       Acknowledge & Comment
//                     </button>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </>
//       )}

//       {editingFeedback && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Edit Feedback</h3>
//             <label>Strengths:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.strengths}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, strengths: e.target.value })
//               }
//             />
//             <label>Areas to Improve:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.areas_to_improve}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, areas_to_improve: e.target.value })
//               }
//             />
//             <label>Sentiment:</label>
//             <input
//               style={styles.modalInput}
//               value={editForm.sentiment}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, sentiment: e.target.value })
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setEditingFeedback(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitEdit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {ackModal.open && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Acknowledge Feedback</h3>
//             <label>Comment (optional):</label>
//             <textarea
//               rows="4"
//               style={styles.modalInput}
//               value={ackComment}
//               onChange={(e) => setAckComment(e.target.value)}
//               placeholder="Add your comment..."
//             ></textarea>
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setAckModal({ open: false, fbId: null })}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#28a745" }}
//                 onClick={submitAcknowledge}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {signOutModal && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <h3>Confirm Sign Out</h3>
//             <p>Are you sure you want to sign out?</p>
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{ ...styles.inlineButton, marginRight: "10px" }}
//                 onClick={() => setSignOutModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ ...styles.inlineButton, background: "#e74c3c" }}
//                 onClick={confirmSignOut}
//               >
//                 Yes, Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import usePDFExport from "../hooks/usePDFExport"; // ✅ Add this import

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [role, setRole] = useState("");
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [editForm, setEditForm] = useState({
    strengths: "",
    areas_to_improve: "",
    sentiment: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [ackModal, setAckModal] = useState({ open: false, fbId: null });
  const [ackComment, setAckComment] = useState("");
  const [signOutModal, setSignOutModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Hook for PDF export
  const [pdfRef, exportPDF] = usePDFExport("feedback.pdf");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (storedRole === "manager") {
        const empRes = await fetch("http://127.0.0.1:8000/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const empData = await empRes.json();
        setEmployees(empData);
      }

      const fbRes = await fetch("http://127.0.0.1:8000/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fbData = await fbRes.json();
      setFeedbacks(fbData);
    };

    fetchData();
  }, []);

  const feedbacksByEmployee = employees.reduce((acc, emp) => {
    acc[emp.id] = feedbacks.filter((fb) => fb.employee_id === emp.id);
    return acc;
  }, {});

  const openEditModal = (fb) => {
    setEditingFeedback(fb);
    setEditForm({
      strengths: fb.strengths,
      areas_to_improve: fb.areas_to_improve,
      sentiment: fb.sentiment,
    });
  };

  const submitEdit = async () => {
    if (!editingFeedback) return;

    const updatedFeedback = {
      ...editForm,
      acknowledged: false,
    };

    const res = await fetch(
      `http://127.0.0.1:8000/feedback/${editingFeedback.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeedback),
      }
    );

    if (res.ok) {
      setSuccessMessage("Saved successfully");
      setTimeout(() => setSuccessMessage(""), 3000);

      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === editingFeedback.id ? { ...fb, ...updatedFeedback } : fb
        )
      );

      setEditingFeedback(null);
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.detail || "Failed to update");
    }
  };

  const openAckModal = (id) => {
    setAckModal((prev) => {
      if (prev.fbId !== id) {
        setAckComment("");
      }
      return { open: true, fbId: id };
    });
  };

  const submitAcknowledge = async () => {
    const res = await fetch("http://127.0.0.1:8000/feedback/acknowledge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback_id: ackModal.fbId,
        comment: ackComment || "",
      }),
    });

    if (res.ok) {
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === ackModal.fbId
            ? { ...fb, acknowledged: true, comment: ackComment || "" }
            : fb
        )
      );
      setAckComment("");
      setAckModal({ open: false, fbId: null });
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.detail || "Failed to acknowledge");
    }
  };

  const handleRequestFeedback = async () => {
    const res = await fetch("http://127.0.0.1:8000/feedback/request", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json().catch(() => null);
    alert(data?.msg || "Request sent");
  };

  const handleSignOut = () => {
    setSignOutModal(true);
  };

  const confirmSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  const getRelativeTime = (isoDate) => {
    const date = new Date(isoDate);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const styles = {
    container: {
      padding: "40px",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: "#eef2f7",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "32px",
      color: "#333",
    },
    success: {
      color: "#28a745",
      background: "#e6f4ea",
      padding: "10px",
      borderRadius: "6px",
      textAlign: "center",
      marginBottom: "15px",
    },
    sectionTitle: {
      marginTop: "30px",
      fontSize: "22px",
      color: "#444",
    },
    button: {
      padding: "10px 20px",
      background: "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      margin: "5px",
    },
    list: {
      listStyle: "none",
      paddingLeft: "0",
    },
    listItem: {
      background: "#fff",
      margin: "10px 0",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    inlineButton: {
      marginLeft: "10px",
      padding: "4px 10px",
      fontSize: "12px",
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    modalBackdrop: {
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
    modalContent: {
      background: "#fff",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    modalInput: {
      width: "100%",
      marginBottom: "10px",
      padding: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button style={styles.button} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <Notifications />

      {successMessage && <p style={styles.success}>{successMessage}</p>}

      {role === "manager" && (
        <>
          <Link to="/add-employee">
            <button style={styles.button}>Add Employee</button>
          </Link>
          <Link to="/submit">
            <button style={styles.button}>Submit Feedback</button>
          </Link>
          <Link to="/team-overview">
            <button style={styles.button}>Team Overview</button>
          </Link>
          <Link to="/requests">
            <button style={styles.button}>View Requests</button>
          </Link>

          <h2 style={styles.sectionTitle}>Your Employees & Feedback</h2>
          <ul style={styles.list}>
            {employees.map((emp) => (
              <li key={emp.id} style={styles.listItem}>
                <strong>
                  {emp.name} ({emp.email})
                </strong>
                <ul style={styles.list}>
                  {feedbacksByEmployee[emp.id]?.length > 0 ? (
                    feedbacksByEmployee[emp.id].map((fb) => (
                      <li key={fb.id} style={styles.listItem}>
                        Strengths: {fb.strengths} | Improve:{" "}
                        {fb.areas_to_improve} | Sentiment: {fb.sentiment} | Ack:{" "}
                        {fb.acknowledged ? "✅" : "❌"}
                        {fb.comment && <> | Comment: {fb.comment}</>}
                        <button
                          style={styles.inlineButton}
                          onClick={() => openEditModal(fb)}
                        >
                          Edit
                        </button>
                      </li>
                    ))
                  ) : (
                    <li style={styles.listItem}>No feedback yet.</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}

      {role === "employee" && (
        <>
          <button style={styles.button} onClick={handleRequestFeedback}>
            Request Feedback
          </button>
          {/* ✅ Export PDF */}
          <button style={styles.button} onClick={exportPDF}>
            Export Feedback as PDF
          </button>

          <h2 style={styles.sectionTitle}>Your Feedback Timeline</h2>
          <div ref={pdfRef}>
            <ul style={styles.list}>
              {feedbacks
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((fb) => (
                  <li key={fb.id} style={styles.listItem}>
                    <div>
                      📌 <strong>{formatDate(fb.created_at)} — {getRelativeTime(fb.created_at)}</strong>
                    </div>
                    <div>Strengths: {fb.strengths}</div>
                    <div>Improve: {fb.areas_to_improve}</div>
                    <div>Sentiment: {fb.sentiment}</div>
                    <div>
                      Ack: {fb.acknowledged ? "✅" : "❌"}
                      {fb.comment && <> | Comment: {fb.comment}</>}
                    </div>
                    {!fb.acknowledged && (
                      <button
                        style={styles.inlineButton}
                        onClick={() => openAckModal(fb.id)}
                      >
                        Acknowledge & Comment
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}

      {editingFeedback && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3>Edit Feedback</h3>
            <label>Strengths:</label>
            <input
              style={styles.modalInput}
              value={editForm.strengths}
              onChange={(e) =>
                setEditForm({ ...editForm, strengths: e.target.value })
              }
            />
            <label>Areas to Improve:</label>
            <input
              style={styles.modalInput}
              value={editForm.areas_to_improve}
              onChange={(e) =>
                setEditForm({ ...editForm, areas_to_improve: e.target.value })
              }
            />
            <label>Sentiment:</label>
            <input
              style={styles.modalInput}
              value={editForm.sentiment}
              onChange={(e) =>
                setEditForm({ ...editForm, sentiment: e.target.value })
              }
            />
            <div style={{ textAlign: "right" }}>
              <button
                style={{ ...styles.inlineButton, marginRight: "10px" }}
                onClick={() => setEditingFeedback(null)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.inlineButton, background: "#28a745" }}
                onClick={submitEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {ackModal.open && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3>Acknowledge Feedback</h3>
            <label>Comment (optional):</label>
            <textarea
              rows="4"
              style={styles.modalInput}
              value={ackComment}
              onChange={(e) => setAckComment(e.target.value)}
              placeholder="Add your comment..."
            ></textarea>
            <div style={{ textAlign: "right" }}>
              <button
                style={{ ...styles.inlineButton, marginRight: "10px" }}
                onClick={() => setAckModal({ open: false, fbId: null })}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.inlineButton, background: "#28a745" }}
                onClick={submitAcknowledge}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {signOutModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3>Confirm Sign Out</h3>
            <p>Are you sure you want to sign out?</p>
            <div style={{ textAlign: "right" }}>
              <button
                style={{ ...styles.inlineButton, marginRight: "10px" }}
                onClick={() => setSignOutModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.inlineButton, background: "#e74c3c" }}
                onClick={confirmSignOut}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
