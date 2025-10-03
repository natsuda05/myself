import React, { useEffect } from "react";
import "../styles/timereport.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

// -----------------------------------------------------------
// ข้อมูลจำลอง (Mock Data) สำหรับรายงานสรุป 16 คน
// -----------------------------------------------------------
const EMPLOYEES_REPORT_DATA = [
  { id: 'EM001', name: "สมชาย", surname: "ใจดี", dept: "HR", absent: 0, late: 1, leave: 0, wfh: 5, totalHours: 178.5, rate: "100%" },
  { id: 'EM002', name: "อนุชา", surname: "ขยัน", dept: "IT", absent: 0, late: 0, leave: 2, wfh: 8, totalHours: 162.0, rate: "98.0%" },
  { id: 'EM003', name: "สุดา", surname: "ใสใจ", dept: "Sales", absent: 4, late: 2, leave: 0, wfh: 1, totalHours: 144.0, rate: "81.8%" },
  { id: 'EM004', name: "พรทิพย์", surname: "สุขสันต์", dept: "Finance", absent: 1, late: 5, leave: 0, wfh: 3, totalHours: 170.0, rate: "93.2%" },
  { id: 'EM005', name: "วิมลรัตน์", surname: "รุ่งเรือง", dept: "Ops", absent: 0, late: 0, leave: 1, wfh: 10, totalHours: 180.0, rate: "100%" },
  { id: 'EM006', name: "วีระ", surname: "ชัยชนะ", dept: "IT", absent: 0, late: 3, leave: 0, wfh: 4, totalHours: 165.5, rate: "95.5%" },
  { id: 'EM007', name: "มานะ", surname: "พากเพียร", dept: "HR", absent: 1, late: 0, leave: 0, wfh: 0, totalHours: 158.0, rate: "90.0%" },
  { id: 'EM008', name: "ดวงใจ", surname: "เมตตา", dept: "Sales", absent: 0, late: 0, leave: 3, wfh: 2, totalHours: 150.0, rate: "85.0%" },
  { id: 'EM009', name: "ก้องภพ", surname: "เก่งกาจ", dept: "Finance", absent: 0, late: 0, leave: 0, wfh: 5, totalHours: 176.0, rate: "100%" },
  { id: 'EM010', name: "ปรีชา", surname: "สามารถ", dept: "Ops", absent: 2, late: 1, leave: 0, wfh: 1, totalHours: 135.0, rate: "78.0%" },
  { id: 'EM011', name: "รัตนา", surname: "ทองดี", dept: "IT", absent: 0, late: 0, leave: 0, wfh: 6, totalHours: 182.0, rate: "100%" },
  { id: 'EM012', name: "ธนวัฒน์", surname: "อิ่มสุข", dept: "HR", absent: 0, late: 2, leave: 1, wfh: 3, totalHours: 168.0, rate: "92.0%" },
  { id: 'EM013', name: "ลลิตา", surname: "ศรีไทย", dept: "Sales", absent: 0, late: 1, leave: 0, wfh: 7, totalHours: 175.5, rate: "98.5%" },
  { id: 'EM014', name: "ชาญชัย", surname: "มั่นคง", dept: "Finance", absent: 0, late: 0, leave: 0, wfh: 2, totalHours: 160.0, rate: "100%" },
  { id: 'EM015', name: "พัชรี", surname: "อ่อนหวาน", dept: "Ops", absent: 3, late: 0, leave: 0, wfh: 1, totalHours: 140.0, rate: "75.0%" },
  { id: 'EM016', name: "จินตนา", surname: "เยี่ยมยอด", dept: "IT", absent: 0, late: 0, leave: 1, wfh: 5, totalHours: 172.0, rate: "96.0%" },
];

// ฟังก์ชันสำหรับส่งออกรายงานเป็น CSV
const handleExportReport = () => {
  const headers = [
    "รหัสพนักงาน", "ชื่อ", "นามสกุล", "แผนก", "ขาด", "สาย", "ลา", "WFH", "รวม(ชม.)", "อัตรา (%)"
  ];

  const rows = EMPLOYEES_REPORT_DATA.map(emp => [
    emp.id,
    `"${emp.name}"`,
    `"${emp.surname}"`,
    emp.dept,
    emp.absent,
    emp.late,
    emp.leave,
    emp.wfh,
    emp.totalHours,
    emp.rate
  ].join(','));

  const csvContent = [
    headers.join(','),
    ...rows
  ].join('\n');

  // ใช้ BOM สำหรับรองรับภาษาไทยใน Excel
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', 'รายงานสรุปเวลาเข้าออกงาน_รายเดือน.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("รายงานกำลังถูกดาวน์โหลดในรูปแบบ CSV");
};


export default function TimeReport() {
  const reportData = EMPLOYEES_REPORT_DATA;

  // -------------------------------------------------------------
  // ✨ Mock Data สำหรับ Summary Boxes
  // -------------------------------------------------------------
  const MOCK_TOTAL_EMPLOYEES = reportData.length; // 16
  const MOCK_TOTAL_LATE = 15; // Mocked
  const MOCK_TOTAL_ABSENT = 11; // Mocked
  const MOCK_TOTAL_LEAVE = 8; // Mocked
  const MOCK_AVERAGE_RATE = '92.5%'; // Mocked Value
  // -------------------------------------------------------------


  useEffect(() => {
    // ทำให้ลิงก์ของหน้าปัจจุบัน active
    document.querySelectorAll(".menu-item").forEach(link => {
      if (
        window.location.pathname.includes(link.getAttribute("href")) &&
        !link.classList.contains("logout")
      ) {
        link.classList.add("active");
      }
    });
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
            <strong>นางสาวหญิง รัตนะ</strong>
            <span>พนักงาน</span>
          </div>
          <img src={profileImg} alt="profile" />
        </div>
      </header>

      <main>
        <Sidebar />

        <div className="container">
          {/* Header และปุ่มส่งออกรายงาน */}
          <div className="report-controls">
            <h1 className="page-title">รายงานสรุปเวลาเข้า – ออกงาน (รายเดือน)</h1>
            <button
              className="export-button"
              onClick={handleExportReport}
            >
              ส่งออกรายงาน (.CSV)
            </button>
          </div>

          {/* Summary Boxes - ใช้ Mock Data และคลาสที่เปลี่ยนชื่อแล้ว */}
          <div className="summary-stats-container">
            <div className="stat-card">
              <span className="number">{MOCK_TOTAL_EMPLOYEES}</span>
              <span className="label">พนักงานทั้งหมด</span>
            </div>
            <div className="stat-card status-late">
              <span className="number">{MOCK_TOTAL_LATE}</span>
              <span className="label">สายทั้งหมด</span>
            </div>
            <div className="stat-card status-absent">
              <span className="number">{MOCK_TOTAL_ABSENT}</span>
              <span className="label">ขาดทั้งหมด</span>
            </div>
            <div className="stat-card status-leave">
              <span className="number">{MOCK_TOTAL_LEAVE}</span>
              <span className="label">ลาทั้งหมด</span>
            </div>
            <div className="stat-card stat-average">
              <span className="number">{MOCK_AVERAGE_RATE}</span> {/* แสดงผลเป็น 92.5% */}
              <span className="label">อัตราเฉลี่ย/เดือน</span>
            </div>
          </div>

          {/* Table - ตารางรายงานสรุปรายพนักงาน */}
          <div className="table-card-report">
            <table>
              {/* หัวตารางสีเทา ตามรูปภาพ */}
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>รหัส</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th style={{ width: '100px' }}>แผนก</th>
                  <th className="text-center">ขาด</th>
                  <th className="text-center">สาย</th>
                  <th className="text-center">ลา</th>
                  <th className="text-center">WFH</th>
                  <th className="text-center">รวม(ชม.)</th>
                  <th className="text-center">อัตรา%</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name} {employee.surname}</td>
                      <td>{employee.dept}</td>
                      <td className={`text-center ${employee.absent > 0 ? 'status-red' : ''}`}>{employee.absent}</td>
                      <td className={`text-center ${employee.late > 0 ? 'status-yellow' : ''}`}>{employee.late}</td>
                      <td className={`text-center ${employee.leave > 0 ? 'status-gray' : ''}`}>{employee.leave}</td>
                      <td className="text-center">{employee.wfh}</td>
                      <td className="text-center total-hours-report">{employee.totalHours.toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`rate-badge ${parseFloat(employee.rate) >= 95 ? 'badge-success' : parseFloat(employee.rate) >= 85 ? 'badge-warning' : 'badge-danger'}`}>
                          {employee.rate}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                      ไม่มีข้อมูลรายงานสรุปการเข้า – ออกงาน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}