import React, { useState, useEffect } from "react";
import "../styles/calendar.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthYear, setMonthYear] = useState("");

    // 💡 โหลดข้อมูลเมื่อคอมโพเนนต์โหลดและเมื่อ currentDate เปลี่ยน
    useEffect(() => {
        updateMonthYear(currentDate);
    }, [currentDate]);

    const updateMonthYear = (date) => {
        const options = { year: "numeric", month: "long" };
        setMonthYear(date.toLocaleDateString("th-TH", options));
    };

    const handlePrev = () => {
        const prev = new Date(currentDate);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentDate(prev);
    };

    const handleNext = () => {
        const next = new Date(currentDate);
        next.setMonth(next.getMonth() + 1);
        setCurrentDate(next);
    };

    // ฟังก์ชันสร้างวันในเดือนและใส่กิจกรรม HR โดยเฉพาะ
    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // หาว่าวันแรกของเดือนตรงกับวันอะไร (0=อาทิตย์, 1=จันทร์...)
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // ปรับให้วันจันทร์เป็นวันแรก (0)
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let days = [];
        
        // เติมช่องว่างก่อนวันแรก
        for (let i = 0; i < startDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        // เติมวันจริงพร้อมกิจกรรม HR
        for (let d = 1; d <= daysInMonth; d++) {
            const today = new Date(year, month, d);
            const isToday = today.toDateString() === new Date().toDateString();

            days.push(
                <div key={d} className={`day ${isToday ? 'current-day' : ''}`}>
                    <span className="date-number">{d}</span>
                    
                    {/* 💡 กิจกรรม HR ล้วน ๆ */}
                    {d === 1 && <div className="event blue">สรุปชั่วโมงทำงาน (ตัดรอบ)</div>}
                    {d === 5 && <div className="event yellow">วันสุดท้ายยื่นขอลาล่วงหน้า</div>}
                    {d === 10 && <div className="event purple">สรุปยอดลาพักร้อนคงเหลือ</div>}
                    {d === 15 && (
                        <>
                            <div className="event green">จ่ายเงินเดือนงวด 1</div>
                            <div className="event yellow">อนุมัติคำขอแก้ไขเวลา 5 รายการ</div>
                        </>
                    )}
                    {d === 25 && <div className="event green">วันเงินเดือนออก (งวด 2)</div>}
                    {d === 28 && <div className="event red">กำหนดนำส่งประกันสังคม/ภาษี</div>}
                    {d === 30 && <div className="event blue">เตรียมแผนสรรหาบุคลากร Q4</div>}
                    {d === 31 && <div className="event purple">กิจกรรมต้อนรับพนักงานใหม่</div>}
                </div>
            );
        }
        return days;
    };
    
    // วันในสัปดาห์ (ภาษาไทย)
    const weekDays = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

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

            <main className="app-main">
                <Sidebar />

                <section className="calendar-container">
                    <h1 className="title">ปฏิทินบริหารบุคคล (HR)</h1>

                    <div className="calendar-box card">
                        <div className="calendar-header">
                            <h2>{monthYear}</h2>
                            <div className="calendar-nav">
                                <button className="nav-btn" onClick={handlePrev}>
                                    &larr;
                                </button>
                                <button className="nav-btn" onClick={handleNext}>
                                    &rarr;
                                </button>
                            </div>
                        </div>
                        
                        {/* แสดงวันในสัปดาห์ */}
                        <div className="week-days">
                            {weekDays.map(day => <div key={day} className="week-day-name">{day}</div>)}
                        </div>

                        <div className="calendar-grid">{generateDays()}</div>
                    </div>
                    
                    {/* ส่วน Legend (คำอธิบายสี) */}
                    <div className="legend-container card">
                        <h3>คำอธิบายกิจกรรม HR</h3>
                        <div className="legend-list">
                            <div className="legend-item"><span className="legend-color green"></span> วันเงินเดือนออก/จ่ายสวัสดิการ</div>
                            <div className="legend-item"><span className="legend-color yellow"></span> กำหนดส่ง/อนุมัติเอกสารเวลาทำงาน</div>
                            <div className="legend-item"><span className="legend-color red"></span> วันหยุดนักขัตฤกษ์/กำหนดส่งภาษี/ประกันสังคม</div>
                            <div className="legend-item"><span className="legend-color blue"></span> การประชุม/วางแผนกลยุทธ์บุคลากร</div>
                            <div className="legend-item"><span className="legend-color purple"></span> กิจกรรมพนักงาน/วันเกิด</div>
                        </div>
                    </div>
                </section>
            </main>
        </div >
    );
}