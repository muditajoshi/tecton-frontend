import React from "react";

const AdminNavList = () =>{
return(
    <div style={{ display: "flex", paddingTop: "70px" }}>
                        <div style={{ paddingRight: "30px", cursor: "pointer" }}> <a href="/admin/ambassadorslist"><b>Ambassador List</b></a></div>
                        <div style={{ paddingRight: "30px", cursor: "pointer" }}><a href="/admin/veteranList"><b>Veteran List</b></a></div>
                        <div style={{ paddingRight: "30px", cursor: "pointer" }}><a href="/admin/employeeList"><b>Employees, F&F List</b></a></div>
                    </div>
)
}

export default  AdminNavList;