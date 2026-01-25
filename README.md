# Order Management System

React Vite, Material UI, tailwind + Typescript

ผมลองสร้างอีก 1 โปรเจคโดยใช้ ai vibe coding + gemini เพื่อทดลองการใช้งาน antigravity
สามารถเข้าเยี่ยมชมได้ที่นี่
[github](https://github.com/NattapongPi/orders-management-ai)
[website](https://orders-management-ai.vercel.app/)

## Installation

1.  ติดตั้ง node.js
    - [Node.js — Download Node.js](https://nodejs.org/en/download)
    - ใช้คำสั่งต่อไปนี้เพื่อเช็คว่า node ทำงานถูกต้อง
      node -v
      npm -v

2.  สร้าง directory ที่ต้องการวางโปรเจค เช่น "C:\Users\user\Documents\work" จากนั้นให้ cd เข้าไปในที่ที่ต้องการสร้างโปรเจค

3.  clone project ต่อไปนี้
    - https://github.com/NattapongPi/orders-management.git

```js
git clone https://github.com/NattapongPi/orders-management.git
```

4. cd orders-management เพื่อเข้าไปใน project directory

5. ใช้คำสั่ง npm install เพื่อติดตั้ง dependencies ที่จำเป็น

```js
npm install
```

6. ใช้คำสั่ง npm run dev เพื่อ start application

```js
npm run dev
```

7. หลังจาก run เสร็จสิ้น ให้เปิดโปรแกรมได้ผ่าน [localhost](http://localhost:5173/)

8. หรือถ้าหากต้องการทดสอบ สามารถเข้าเยี่ยมชมได้ผ่าน Link : [orders-management](http://orders-management-five.vercel.app/)

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
