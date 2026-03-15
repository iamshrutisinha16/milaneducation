import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
FaUsers,
FaEnvelope,
FaBook,
FaUniversity,
FaClipboardList
} from "react-icons/fa";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
ArcElement,
Tooltip,
Legend
);

const AdminDashboard = () => {

const navigate = useNavigate();

const [stats,setStats] = useState({});
const [monthlyData,setMonthlyData] = useState([]);

const API = "https://collegemilan-backend-2.onrender.com";

useEffect(()=>{

const loadData = async ()=>{

const token = localStorage.getItem("adminToken");

const headers = {
Authorization:`Bearer ${token}`
};

const [statsRes,monthlyRes] = await Promise.all([

axios.get(`${API}/api/admin/dashboard/stats`,{headers}),
axios.get(`${API}/api/admin/dashboard/monthly-enquiries`,{headers})

]);

setStats(statsRes.data);
setMonthlyData(monthlyRes.data);

};

loadData();

},[]);

const months = [
"",
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
];

const barData = {
labels: monthlyData.map(i=>months[i._id]),
datasets:[
{
label:"Monthly Enquiries",
data: monthlyData.map(i=>i.count),
backgroundColor:"#6366f1",
borderRadius:8
}
]
};

const lineData = {
labels: monthlyData.map(i=>months[i._id]),
datasets:[
{
label:"User Growth",
data: monthlyData.map(i=>i.count + 3),
borderColor:"#10b981",
backgroundColor:"#10b981",
tension:0.4
}
]
};

const pieData = {
labels:["MBA","BTech","BCA","BBA"],
datasets:[
{
data:[40,25,20,15],
backgroundColor:[
"#6366f1",
"#10b981",
"#f59e0b",
"#ef4444"
]
}
]
};

const cards = [

{
title:"Users",
value:stats.totalUsers,
icon:<FaUsers/>,
bg:"linear-gradient(135deg,#667eea,#764ba2)"
},

{
title:"Enquiries",
value:stats.totalEnquiries,
icon:<FaEnvelope/>,
bg:"linear-gradient(135deg,#43cea2,#185a9d)"
},

{
title:"Courses",
value:stats.totalCourses,
icon:<FaBook/>,
bg:"linear-gradient(135deg,#ff9966,#ff5e62)"
},

{
title:"Tests",
value:stats.totalTests,
icon:<FaClipboardList/>,
bg:"linear-gradient(135deg,#00c6ff,#0072ff)"
},

{
title:"Universities",
value:stats.totalUniversities,
icon:<FaUniversity/>,
bg:"linear-gradient(135deg,#f7971e,#ffd200)"
}

];

return (

<div className="container-fluid py-4">

<div className="d-flex justify-content-between align-items-center mb-4">

<div>
<h3 className="fw-bold">Admin Dashboard</h3>
<p className="text-muted">Platform Overview</p>
</div>

<button
className="btn btn-primary"
onClick={()=>navigate("/admin/courses")}
>
+ Add Course
</button>

</div>


{/* COLOR CARDS */}

<div className="row g-4 mb-5">

{cards.map((card,i)=>(

<div className="col-lg-3 col-md-4 col-sm-6" key={i}>

<div
className="text-white p-4 rounded-4 shadow-lg"
style={{
background:card.bg,
transition:"0.3s",
cursor:"pointer"
}}
>

<div className="d-flex justify-content-between align-items-center">

<div>

<h6>{card.title}</h6>
<h2 className="fw-bold">{card.value}</h2>

</div>

<div style={{fontSize:"30px"}}>
{card.icon}
</div>

</div>

</div>

</div>

))}

</div>


{/* CHARTS */}

<div className="row g-4">

<div className="col-lg-6">

<div className="card border-0 shadow-lg p-4 rounded-4">

<h5 className="mb-3">
Monthly Enquiries
</h5>

<Bar data={barData}/>

</div>

</div>


<div className="col-lg-6">

<div className="card border-0 shadow-lg p-4 rounded-4">

<h5 className="mb-3">
User Growth
</h5>

<Line data={lineData}/>

</div>

</div>

</div>


<div className="row g-4 mt-4">

<div className="col-lg-6">

<div className="card border-0 shadow-lg p-4 rounded-4">

<h5 className="mb-3">
Course Distribution
</h5>

<Pie data={pieData}/>

</div>

</div>


<div className="col-lg-6">

<div className="card border-0 shadow-lg p-4 rounded-4">

<h5 className="mb-3">
Quick Actions
</h5>

<div className="d-flex flex-wrap gap-3">

<button
className="btn btn-outline-primary"
onClick={()=>navigate("/admin/universities")}
>
Manage Universities
</button>

<button
className="btn btn-outline-success"
onClick={()=>navigate("/admin/tests")}
>
Manage Tests
</button>

<button
className="btn btn-outline-dark"
onClick={()=>navigate("/admin/enquiries")}
>
View Enquiries
</button>

</div>

</div>

</div>

</div>

</div>

);

};

export default AdminDashboard;