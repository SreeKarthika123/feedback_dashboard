// TeamOverview.jsx
// import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// ChartJS.register(ArcElement, Tooltip, Legend);
// export default function TeamOverview() {
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("http://127.0.0.1:8000/feedback", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       const data = await res.json();
//       setFeedbacks(data);
//     };
//     fetchData();
//   }, []);

//   const sentimentCounts = {
//     positive: feedbacks.filter(f => f.sentiment === "positive").length,
//     neutral: feedbacks.filter(f => f.sentiment === "neutral").length,
//     negative: feedbacks.filter(f => f.sentiment === "negative").length,
//   };

//   const pieData = {
//     labels: ["Positive", "Neutral", "Negative"],
//     datasets: [
//       {
//         data: [
//           sentimentCounts.positive,
//           sentimentCounts.neutral,
//           sentimentCounts.negative,
//         ],
//         backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h1>Team Overview</h1>
//       <p><strong>Total Feedback:</strong> {feedbacks.length}</p>
//       <div style={{ width: "200px", height: "400px", margin: "0 auto" }}>
//         <Pie data={pieData} options={{ maintainAspectRatio: false }} />
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

// Register all necessary chart elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function TeamOverview() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setEmployees(data));

    fetch("http://127.0.0.1:8000/feedback", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  const sentimentCounts = {
    positive: feedbacks.filter(f => f.sentiment === "positive").length,
    neutral: feedbacks.filter(f => f.sentiment === "neutral").length,
    negative: feedbacks.filter(f => f.sentiment === "negative").length,
  };

  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Sentiment Breakdown",
      },
    },
  };

  const barData = {
    labels: employees.map(emp => emp.name),
    datasets: [
      {
        label: "Feedback Count",
        data: employees.map(emp =>
          feedbacks.filter(fb => fb.employee_id === emp.id).length
        ),
        backgroundColor: "#42a5f5",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Feedbacks per Employee",
      },
    },
  };

  const containerStyle = {
    padding: "40px",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
    minHeight: "100vh",
    background: "#f9f9f9",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    margin: "20px",
    flex: "1 1 300px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Team Overview</h1>
      <p style={{ textAlign: "center" }}>
        <strong>Total Feedback:</strong> {feedbacks.length}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div style={cardStyle}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
