import express from "express";
import async from "hbs/lib/async";
import {selectSql, updateSql } from "../database/sql";

const router = express.Router();

// every res.render('string') : 'string'.hbs file을 넘겨준다.
//기존의 입력 값 불러오기
router.get('/employee', async(req, res) => {
    const emp_res = await selectSql.getEmployee();
    res.render('updateEmployee', {
        title: "직원 테이블 갱신",
        emp_res //emp_res도 hbs에 같이 넘겨주는 것.
    });
});

//기존의 입력 값 불러오기
router.get('/department', async(req, res) => {
    const dept_res = await selectSql.getDepartment();
    res.render('updateDepartment', {
        title: "부서 테이블 갱신",
        dept_res
    });
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/employee', async(req, res) =>{
    await updateSql.updateEmployee();

    res.redirect('/select');
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/department', async(req, res) =>{
    const vars = req.body;
    console.log(vars.dname)

    //조건을 추가하고 싶다면(ex. where Dnumber=0) 여기서 updateDepartment() 함수에 파라미터로 넘겨주기 전 추가할 수 있음.
    const data = {
        Dname: vars.dname
    }        
    await updateSql.updateDepartment(data);

    res.redirect('/select');
});

module.exports = router;