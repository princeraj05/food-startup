import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function ManageUsers(){

const [users,setUsers] = useState([]);

useEffect(()=>{
loadUsers();
},[]);

const loadUsers = async()=>{

const token = await getToken();

const res = await fetch(
"https://food-startup-1.onrender.com/api/admin/users",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setUsers(await res.json());

};

const changeStatus = async(id,status)=>{

const token = await getToken();

await fetch(
`https://food-startup-1.onrender.com/api/admin/users/${id}/status`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({status})
}
);

loadUsers();

};

return(

<div style={page}>

<h1 style={title}>👥 Manage Users</h1>

<div style={tableWrap}>

<table style={table}>

<thead>

<tr>
<th style={th}>Name</th>
<th style={th}>Email</th>
<th style={th}>Status</th>
<th style={th}>Action</th>
</tr>

</thead>

<tbody>

{users.map(u=>(

<tr key={u._id} style={row}>

<td style={td}>{u.name}</td>

<td style={{...td,color:"#475569"}}>{u.email}</td>

<td style={td}>
<span
style={{
...statusBadge,
background:
u.status==="Active"?"#dcfce7":"#fee2e2",
color:
u.status==="Active"?"#166534":"#991b1b"
}}
>
{u.status}
</span>
</td>

<td style={td}>

<button
style={{
...btn,
background:
u.status==="Active"?"#ef4444":"#16a34a"
}}
onClick={()=>changeStatus(
u._id,
u.status==="Active"?"Blocked":"Active"
)}
>
{u.status==="Active"?"Block":"Unblock"}
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

const page={
padding:40,
background:"#f1f5f9",
minHeight:"100vh"
};

const title={
marginBottom:24
};

const tableWrap={
background:"#fff",
borderRadius:18,
padding:20
};

const table={
width:"100%"
};

const th={
textAlign:"left",
padding:"14px 12px"
};

const td={
padding:"14px 12px"
};

const row={
background:"#fff"
};

const statusBadge={
padding:"6px 14px",
borderRadius:20
};

const btn={
padding:"8px 14px",
borderRadius:10,
border:"none",
cursor:"pointer",
color:"#fff"
};
