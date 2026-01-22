# Order Management System

React Vite, Material UI, tailwind + Typescript

## Installation

1.  ติดตั้ง node.js
    - [Node.js — Download Node.js](https://nodejs.org/en/download)
    - ใช้คำสั่งต่อไปนี้เพื่อเช็คว่า node ทำงานถูกต้อง
      node -v
      npm -v

2.  สร้าง directory ที่ต้องการวางโปรเจค เช่น "C:\Users\user\Documents\work" จากนั้นให้ cd เข้าไปในที่ที่ต้องการสร้างโปรเจค

3.  สร้าง Vite Project
    - npm create vite@latest
    - จากนั้นใส่ชื่อ project ที่ต้องการ เช่น assignment-balerion
    - เลือก react
    - เลือก typescript
    - ลอง npm run dev หากใช้ได้ถือว่าสำเร็จ

4.  ติดตั้ง material ui
    - [Installation - Material UI](https://mui.com/material-ui/getting-started/installation/)
    - npm install @mui/material @emotion/react @emotion/styled
    - ลองเรียกใช้งาน Component หากใช้ได้ถือว่าสำเร็จ

```js
import Button from "@mui/material/Button";
function App() {
  return (
    <>
      <Button variant="contained">confirm</Button>
    </>
  );
}

export default App;
```

5.  ติดตั้ง tailwind css
    - [Tailwind CSS Installing with Vite - Installation](https://tailwindcss.com/docs/installation/using-vite)
    - npm install tailwindcss @tailwindcss/vite
    - ลองเรียกใช้งาน className หากใช้ได้ถือว่าสำเร็จ

```js
<div className="text-4xl font-bold pb-6">Order Management</div>
```

6.  ติดตั้ง react-router-dom
    - npm install react-router-dom
    - https://reactrouter.com/
    - ตัวอย่าง Code ในไฟล์ App.js หากใช้ได้ถือว่าสำเร็จ

```js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">หน้าแรก</Link> | <Link to="/about">เกี่ยวกับเรา</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>นี่คือหน้า Home</h1>;
}
function About() {
  return <h1>นี่คือหน้า About</h1>;
}

export default App;
```

## วิธีการใช้งานโปรแกรม

- โปรแกรมมีทั้งหมด 5 หน้า ดังนี้ **Order** **Product** **Order Type** **Customer** **Warehouse**
  - หน้าหลัก **Order** แสดงรายละเอียด order ทั้งหมด
  - หน้า **Product** แสดงรายละเอียดของสินค้าแต่ละชนิด
  - หน้า **Order Type** แสดงรายละเอียดของ type ของ order
  - หน้า **Customer** แสดงรายละเอียดของ customer เช่น credit
  - หน้า **Warehouse** แสดงรายละเอียดของ warehouse เช่น สินค้า จำนวนสินค้า และ supplier

- เปิดโปรแกรมแล้วรอสักครู่ ระบบจะแสดงข้อมูล order ทั้งหมด
- ระบบจะคำนวนสินค้าที่แต่ละ order ได้รับโดยอัตโนมัติ
- user สามารถแก้ไขจำนวนสินค้าที่แต่ละ order ได้รับแบบ manual ได้

## วิเคราะห์ Assignment

- สร้างระบบ Order Management ที่มีการ auto allocate แต่ก็ยังสามารถให้ user แก้ไขแบบ manual ได้

- มีตัวแปรที่เป็น multiple หลายฝ่าย
  - 1 order มีได้หลาย sub order
  - 1 warehouse มีได้หลาย supplier
  - 1 supplier มีได้หลาย สินค้า
  - สินค้าชนิดเดียวกัน แต่คนละ supplier ราคาไม่จำเป็นต้องเท่ากัน
  - สินค้ามีหลาย tier ของราคา
- มีระดับความสำคัญของ order
- การคำนวน credit ให้ใช้ 2 decimal Banker's rounding
- รองรับการ search
- รองรับ order ขนาดใหญ่

## Scope

- ทำการ mock data warehouse, supplier, item ให้ relate กันและคิดว่าเหมาะตามความคิดของผู้เขียน

- หากสินค้าไม่พอให้ assign เท่าที่เหลือ
- มีการ validate ไม่ให้ใส่จำนวนสินค้าเกินที่ order นั้นต้องการ
- มีการ validate ไม่ให้ใส่จำนวนสินค้าเกิน credit ที่ customer มี
- มีการ validate ไม่ให้ใส่จำนวนสินค้าเกินที่ warehouse มี
