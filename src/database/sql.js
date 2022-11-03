import async from "hbs/lib/async";
import mysql from "mysql2";

//데이터베이스 연결
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host:'localhost',
        // port:3306,
        user:'root',
        database: 'week10',
        password:'1234',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// async / await 사용
const promisePool = pool.promise(); //db에 접근하는 객체

// select query
// export : 다른 파일에서 접근할 수 있게
export const selectSql = {
    getUsers: async() => {
        const [rows] = await promisePool.query(`select * from user`);

        return rows
    },
    getDepartment: async() => {
        const [rows] = await promisePool.query(`select * from department`);
        
        return rows
    }
}

// async and await : for 동기화
//새로 정의한건 다 대문자

//delete query
export const deleteSql={
    deleteDepartment: async(data) => {
        console.log("deleteSql.deleteDepartment:", data.Dnumber);
        const sql = `delete from department where Dnumber=${data.Dnumber}`

        await promisePool.query(sql);
    },
};