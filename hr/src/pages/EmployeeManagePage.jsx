import React, { useState, useEffect } from "react";
import "../styles/employeemanage.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

// ข้อมูลพนักงาน 15 รายการ (คงเดิม)
const initialEmployeeData = [
  // 💡 ตำแหน่งทั่วไป -> พนักงาน
  { id: 'EMP001', name: 'สมหญิง', surname: 'ใจดี', username: 'somyin.j', dept: 'IT', position: 'IT Support', type: 'พนักงาน', lastLogin: '15/01/2024 09:15', status: 'ใช้งานได้', statusColor: 'badge-green' },
  // 💡 ตำแหน่ง Lead/Manager -> หัวหน้า
  { id: 'EMP002', name: 'วิชัย', surname: 'รักงาน', username: 'wichai.r', dept: 'การตลาด', position: 'Marketing Lead', type: 'หัวหน้า', lastLogin: '14/01/2024 17:30', status: 'ถูกระงับ', statusColor: 'badge-red' },
  // 💡 ตำแหน่งทั่วไป -> พนักงาน
  { id: 'EMP003', name: 'มานี', surname: 'ขยัน', username: 'manee.k', dept: 'บัญชี', position: 'Accountant', type: 'พนักงาน', lastLogin: '15/01/2024 08:45', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP004', name: 'สุดา', surname: 'ทำงาน', username: 'suda.t', dept: 'IT', position: 'SysAdmin', type: 'พนักงาน', lastLogin: '12/01/2024 16:20', status: 'ถูกระงับ', statusColor: 'badge-red' },
  { id: 'EMP005', name: 'ปิยะ', surname: 'ขยันงาน', username: 'piya.k', dept: 'การตลาด', position: 'Digital Analyst', type: 'พนักงาน', lastLogin: '15/01/2024 07:50', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP006', name: 'ธนากร', surname: 'เด่นชัย', username: 'thanakorn.d', dept: 'IT', position: 'Developer (Frontend)', type: 'พนักงาน', lastLogin: '15/01/2024 09:35', status: 'ใช้งานได้', statusColor: 'badge-green' },
  // 💡 ตำแหน่ง HR -> ฝ่ายบุคคล
  { id: 'EMP007', name: 'อัญชลี', surname: 'แสงทอง', username: 'anchalee.s', dept: 'HR', position: 'HR Specialist', type: 'ฝ่ายบุคคล', lastLogin: '15/01/2024 08:00', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP008', name: 'วีรภัทร', surname: 'ตั้งใจ', username: 'weerapat.t', dept: 'ขาย', position: 'Sales Representative', type: 'พนักงาน', lastLogin: '14/01/2024 15:40', status: 'ถูกระงับ', statusColor: 'badge-red' },
  { id: 'EMP009', name: 'กิตติศักดิ์', surname: 'มั่นคง', username: 'kittisak.m', dept: 'บัญชี', position: 'Auditor', type: 'พนักงาน', lastLogin: '15/01/2024 10:10', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP010', name: 'นิภา', surname: 'งามยิ่ง', username: 'nipha.n', dept: 'IT', position: 'Network Engineer', type: 'พนักงาน', lastLogin: '15/01/2024 07:40', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP011', name: 'ภาณุ', surname: 'เกียรติ', username: 'panu.k', dept: 'การตลาด', position: 'Content Creator', type: 'พนักงาน', lastLogin: '14/01/2024 11:25', status: 'ถูกระงับ', statusColor: 'badge-red' },
  // 💡 ตำแหน่ง HR -> ฝ่ายบุคคล
  { id: 'EMP012', name: 'ดวงพร', surname: 'รัตนชัย',username: 'down.r', dept: 'HR', position: 'Recruiter', type: 'ฝ่ายบุคคล', lastLogin: '15/01/2024 08:30', status: 'ใช้งานได้', statusColor: 'badge-green' },
  // 💡 ตำแหน่ง Lead/Manager -> หัวหน้า
  { id: 'EMP013', name: 'ชัยชนะ', surname: 'รักธรรม', username: 'chaichana.r', dept: 'ขาย', position: 'Area Manager', type: 'หัวหน้า', lastLogin: '15/01/2024 09:00', status: 'ใช้งานได้', statusColor: 'badge-green' },
  { id: 'EMP014', name: 'มะลิ', surname: 'อินทร', username: 'mali.i', dept: 'IT', position: 'Developer (Backend)', type: 'พนักงาน', lastLogin: '12/01/2024 10:55', status: 'ถูกระงับ', statusColor: 'badge-red' },
  { id: 'EMP015', name: 'สมปอง', surname: 'ฟ้าใส', username: 'sompong.f', dept: 'บัญชี', position: 'Finance Officer', type: 'พนักงาน', lastLogin: '15/01/2024 09:20', status: 'ใช้งานได้', statusColor: 'badge-green' },
];

export default function EmployeeManagePage() {
  const [employeeList, setEmployeeList] = useState(initialEmployeeData); 
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    // 1. ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
      alert("⚠️ รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return; 
    }

    // 2. ดึงข้อมูลอื่น ๆ จากฟอร์มเพื่อใช้ในการสร้างบัญชีใหม่
    const newName = e.target.name.value;
    const newSurname = e.target.surname.value;
    const newUsername = e.target.username.value;
    const newType = e.target.type.value; 

    // 3. สร้าง ID ใหม่
    const newId = `EMP${(employeeList.length + 1).toString().padStart(3, '0')}`;
    
    const newEmployee = { 
        id: newId, 
        name: newName, 
        surname: newSurname, 
        username: newUsername, 
        dept: 'N/A', 
        position: newType, 
        type: newType, 
        lastLogin: new Date().toLocaleTimeString('th-TH', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }).replace(',', ''), // วันที่และเวลาปัจจุบัน
        status: 'ใช้งานได้', 
        statusColor: 'badge-green' 
    };

    // 💡 4. อัปเดต State โดยเพิ่มรายการใหม่ไว้ที่แถวบนสุด
    setEmployeeList([newEmployee, ...employeeList]); 

    alert(`✅ บัญชี ${newName} ${newSurname} ถูกสร้างและเพิ่มเข้าตารางเรียบร้อยแล้ว`);
    
    e.target.reset(); // ล้างข้อมูลในฟอร์ม
  };
  
  const handleDelete = (id, name) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบบัญชีของ ${name} (ID: ${id})? การดำเนินการนี้ไม่สามารถย้อนกลับได้`)) {
      
      const updatedList = employeeList.filter(employee => employee.id !== id);
      setEmployeeList(updatedList);
      
      alert(`บัญชี ${name} (ID: ${id}) ถูกลบเรียบร้อยแล้ว`);
    }
  };

  return (
    <div>
      <header>
        <div className="brand">
          <img src={logo} alt="logo CDG" className="img-fluid me-3" />
          <div>
            <h1>ระบบบันทึกเวลา และการเข้าทำงาน</h1>
            <span>CDG Group</span>
          </div>
        </div>
        <div className="profile">
          <div className="profile-info">
            <strong>นางสาวปวีณา มงคลชัย</strong>
            <span>ฝ่ายบุคคล</span>
          </div>
          <img src={profileImg} alt="profile" />
        </div>
      </header>

      <main className="main-layout">
        <Sidebar />

        <div className="main-content">

          {/* 💡 1. หัวข้อหลัก (อยู่ด้านนอก Card) */}
          <h3 className="page-title ">จัดการพนักงาน</h3>

          {/* 2. ฟอร์มสร้างบัญชีใหม่ (แสดงตลอดเวลาใน Card ของตัวเอง) */}
          <div className="card add-employee-card">
            <h3 className="card-title">สร้างบัญชีผู้ใช้ใหม่</h3>
            <form onSubmit={handleSubmit} className="employee-form new-form-layout">

              {/* แถว 1: ชื่อ - นามสกุล */}
              <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">ชื่อ</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <input type="text" id="name" name="name" required placeholder="ชื่อจริง" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">นามสกุล</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <input type="text" id="surname" name="surname" required placeholder="นามสกุล" />
                    </div>
                </div>

              {/* แถว 2: Username - ประเภท */}
              <div className="form-row">
                        <div className="form-group">
                        <label htmlFor="username">Username</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <input type="text" id="username" name="username" required placeholder="kanokwan.t" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="type">ประเภท</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <select id="type" name="type" required>
                            <option value="">เลือกประเภท...</option>
                            <option value="พนักงาน">พนักงาน</option>
                            <option value="หัวหน้า">หัวหน้า</option>
                            <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                        </select>
                    </div>
                </div>

              {/* แถว 3: รหัสผ่าน - ยืนยันรหัสผ่าน */}
              <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <input type="password" id="password" name="password" required placeholder="กรอกรหัสผ่าน" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">ยืนยันรหัสผ่าน</label>
                        {/* 💡 เพิ่ม name attribute */}
                        <input type="password" id="confirm-password" name="confirm-password" required placeholder="กรอกรหัสผ่านที่เหมือนกัน" />
                    </div>
                </div>

              {/* แถว 4: ปุ่มส่งฟอร์ม (เต็มความกว้าง) */}
              <div className="form-actions full-width-action">
                <button type="submit" className="btn btn-submit-full">
                  สร้างบัญชี
                </button>
                <button
                  type="reset"
                  className="btn btn-cancel"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>

          {/* 3. ตารางบัญชีพนักงาน (อยู่ใน Card ของตัวเอง) */}
          <div className="card employee-list-card">
            <h2>บัญชีพนักงานปัจจุบัน</h2> {/* 💡 หัวข้อสำหรับตาราง */}
            <table className="employee-manage-table">
              <thead>
                <tr>
                  <th>รหัสพนักงาน</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>Username</th>
                  <th>ประเภท</th>
                  <th>เข้าใช้ล่าสุด</th>
                  <th>สถานะ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name} {employee.surname}</td>
                    <td>{employee.username}</td>
                    <td>{employee.type}</td>
                    <td>{employee.lastLogin}</td>
                    <td>
                      <span className={`badge ${employee.statusColor}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="actions-icons">
                     <button 
                        className="btn btn-delete-action" 
                        title="ลบบัญชี"
                        onClick={() => handleDelete(employee.id, employee.name)}
                      >
                        <i className="fas fa-trash-alt"></i> ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}