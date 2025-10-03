import React, { useEffect, useRef } from "react";
import "../styles/home.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";

import Sidebar from "../components/Sidebar";

// 💡 Mock Data สำหรับตารางสรุปเวลาพนักงาน (1 เดือน) พร้อม WFH
const mockMonthlySummary = [
    { name: 'สมชาย ใจดี', dept: 'HR', absent: 0, late: 1, leave: 0, wfh: 5, totalHours: '178.5h', rate: '100%', status: 'success' },
    { name: 'อนุชา ขยันขัน', dept: 'IT', absent: 0, late: 0, leave: 2, wfh: 8, totalHours: '162.0h', rate: '98.0%', status: 'success' },
    { name: 'สุดา ใสใจ', dept: 'Sales', absent: 4, late: 2, leave: 0, wfh: 1, totalHours: '144.0h', rate: '81.8%', status: 'warning' },
    { name: 'พรทิพย์ สุขสันต์', dept: 'Finance', absent: 1, late: 5, leave: 0, wfh: 3, totalHours: '170.0h', rate: '93.2%', status: 'warning' },
    { name: 'วิมลรัตน์ รุ่งเรือง', dept: 'Ops', absent: 0, late: 0, leave: 1, wfh: 10, totalHours: '180.0h', rate: '100%', status: 'success' },
];

export default function HomePage() {
  
  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const clockEl = document.getElementById("clock");
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString("th-TH", { hour12: false });
      }
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Header */}
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

      <main>
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard */}
        <main className="dashboard">
          <h1 className="welcome-text">ยินดีต้อนรับ นางสาว หญิง รัตนะ</h1>

          {/* top-section */}
          <section className="top-section">
            <div className="card big-clock center">
              <div className="time" id="clock">--:--:--</div>
              <div className="date">วันพฤหัสบดีที่ 25 กันยายน 2568</div>
            </div>

            <div className="card work-status">
              <p>สถานะการทำงาน</p>
              <h2 className="status-text">กำลังทำงาน</h2>
              <small>บริษัท</small>
              <div className="time-info">
                <p>เข้างาน : <span id="checkin-time">09:40:12</span></p>
                <p>ออกงาน : <span id="checkout-time">-</span></p>
              </div>
            </div>
          </section>

          {/* summary-section */}
          <section className="summary-section">
            <div className="card small"><p>พนักงานทั้งหมด</p><h3>16</h3></div>
            <div className="card small"><p>วันทำงานในเดือนนี้</p><h3>18/22</h3></div>
            <div className="card small"><p>งานที่ต้องทำวันนี้</p><h3>5</h3></div>
            <div className="card small"><p>วันลาคงเหลือ</p><h3>15</h3></div>
          </section>

          {/* bottom-section */}
          <section className="bottom-section">
            {/* CARD 1: ปฏิทินงาน */}
            <div className="card task-list">
              <div className="card-header">
                <h3>ปฏิทินงาน</h3>
                <a href="/calendar" className="see-all">ดูทั้งหมด</a>
              </div>
              <ul>
                <li className="task blue">
                  <span className="dot"></span>
                  <div className="task-info">
                    <p className="task-title">สรุปชั่วโมงทำงาน (ตัดรอบ)</p>
                    <small>1 ตุลาคม 2548 | 09:00 - 10:30</small>
                  </div>
                  <span className="badge badge-blue">ประชุม</span>
                </li>
                <li className="task yellow">
                  <span className="dot"></span>
                  <div className="task-info">
                    <p className="task-title">วันสุดท้ายยื่นขอลาล่วงหน้า</p>
                    <small>5 ตุลาคม 2568 | ภายใน 23:59</small>
                  </div>
                  <span className="badge badge-yellow">กำหนดส่ง</span>
                </li>
                <li className="task purple">
                  <span className="dot"></span>
                  <div className="task-info">
                    <p className="task-title">สรุปยอดลาพักร้อนคงเหลือ</p>
                    <small>10 ตุลาคม 2568 | 13:00 - 16:30</small>
                  </div>
                  <span className="badge badge-purple">กิจกรรมพนักงาน</span>
                </li>
                <li className="task green">
                  <span className="dot"></span>
                  <div className="task-info">
                    <p className="task-title">จ่ายเงินเดือนงวด 1</p>
                    <small>15 ตุลาคม 2568 | ภายใน 17:00</small>
                  </div>
                  <span className="badge badge-green">วันเงินเดือนออก</span>
                </li>
                <li className="task yellow">
                  <span className="dot"></span>
                  <div className="task-info">
                    <p className="task-title">อนุมัติคำขอแก้ไขเวลา 5 รายการ</p>
                    <small>15 ตุลาคม 2568 | ภายใน 17:00</small>
                  </div>
                  <span className="badge badge-yellow">อนุมัติเอกสารเวลาทำงาน</span>
                </li>
              </ul>
            </div>

            {/* CARD 2: สรุปเวลาเข้า-ออกงานพนักงาน (ตาราง) */}
            <div className="card task-list monthly-summary-table-card">
                <div className="card-header">
                    <h3>สรุปเวลาเข้า-ออกงานพนักงาน (1 เดือน)</h3>
                    <a href="/timereport" className="see-all">ดูทั้งหมด</a>
                </div>
                
                <div className="table-wrapper">
                    <table className="employee-time-summary-table">
                        <thead>
                            <tr>
                                <th>พนักงาน</th>
                                <th className="text-center">ขาด</th>
                                <th className="text-center">สาย</th>
                                <th className="text-center">ลา</th>
                                <th className="text-center">WFH</th> {/* 💡 คอลัมน์ WFH ใหม่ */}
                                <th className="text-center">ชั่วโมงรวม</th>
                                <th className="text-center">อัตรา%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockMonthlySummary.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="employee-name-cell">
                                            <p className="task-title">{data.name}</p>
                                            <small>{data.dept}</small>
                                        </div>
                                    </td>
                                    <td className="text-center"><span className="count-badge">{data.absent}</span></td>
                                    <td className="text-center"><span className="count-badge">{data.late}</span></td>
                                    <td className="text-center"><span className="count-badge">{data.leave}</span></td>
                                    <td className="text-center"><span className="count-badge badge-wfh">{data.wfh}</span></td> {/* 💡 แสดงจำนวน WFH */}
                                    <td className="text-center total-hours">{data.totalHours}</td>
                                    <td className="text-center">
                                        <span className={`rate-badge badge-${data.status}`}>
                                            {data.rate}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>
        </main>
      </main>
    </div>
  );
}