import React, { useEffect, useState } from 'react'
import "./Student.css"
import Lesson from './Lesson'

function Student({setIsStudentMode , selectedStudent}) {

    const [studentName, setStudentName] = useState(selectedStudent.username)
    const [studentPassword, setStudentPassword] = useState(selectedStudent.password)
    const [studentLessons, setStudentLessons] = useState([])
    const [studentAbsences, setStudentAbsences] = useState([])
    const [date , setDate] = useState()
    const [lessonName, setLessonName] = useState('')
    const [lessonPoint, setLessonPoint] = useState('')

    useEffect(() => {
    getAbsences()
    getLessons()
    }, [])

    const getAbsences = () => {
        fetch('http://localhost:8080/student/absence/' + selectedStudent._id, {
            method: 'GET'})
        .then(response => response.json())
        .then(data => {setStudentAbsences(data); console.log(data)})
    }

    const addAbsence = () => {
        fetch('http://localhost:8080/student/absence' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studentId" : selectedStudent._id,
                "date" : date
            })
        }).then(response => getAbsences())
    }

    const deleteAbsence = (absenceId) => {
        fetch('http://localhost:8080/student/absence/' + absenceId , {
            method: 'DELETE',
        }).then(response => getAbsences())
    }

    const getLessons = () => {
        fetch("http://localhost:8080/student/grade/" + selectedStudent._id, {
            method: 'GET'})
            .then(response => response.json())
            .then(data => {setStudentLessons(data);console.log(data)})
    }

    const addLesson = () => {
        fetch('http://localhost:8080/student/grade/'+ selectedStudent._id , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "lesson" : lessonName,
                "grade" : lessonPoint
            })
        }).then(response => getLessons())
    }



  return (
    <div onClick={(e) => { e.target === e.currentTarget && setIsStudentMode(false) }} className='calendar-component'>
      <div className='calendar-component-body'>
        <div className='w-full flex flex-col items-center justify-center h-full bg-slate-600 rounded-lg'>
        <div className='w-fit flex p-5 gap-5'>
            <input value={studentName} onChange={(e)=>{setStudentName(e.target.value)}} className='p-3 w-2/5 rounded-lg bg-slate-700 text-white'></input>
            <input value={studentPassword} onChange={(e)=>{setStudentPassword(e.target.value)}} className='p-3 w-2/5 rounded-lg bg-slate-700 text-white'></input>
            <button className='p-3 w-1/5 bg-green-500 rounded-lg text-white'>Güncelle</button>
        </div>
        <div className='w-fit justify-between flex p-5 gap-64'>
            <input value={date} onChange={(e)=>{setDate(e.target.value)}} className='p-3 w-2/5 rounded-lg bg-slate-700 text-white'></input>        
            <button onClick={()=>addAbsence()} className='p-3 w-[100px] bg-green-500 rounded-lg text-white'>Devamsızlık</button>
        </div>
        <div className='w-fit flex p-5 gap-5'>
            <input value={lessonName} placeholder='Ders Adı' onChange={(e)=>{setLessonName(e.target.value)}} className='p-3 w-2/5 rounded-lg bg-slate-700 text-white'></input>
            <input value={lessonPoint} placeholder='Puan' onChange={(e)=>{setLessonPoint(e.target.value)}} className='p-3 w-2/5 rounded-lg bg-slate-700 text-white'></input>
            <button onClick={()=>{addLesson()}} className='p-3 w-1/5 bg-green-500 rounded-lg text-white'>Ders Ekle</button>
        </div>
        <div className='w-full h-[250px] flex '>
            <div className='w-4/6 border-r text-white h-full flex flex-col p-5 gap-5'>
            <h1 className='text-xl'>Dersler</h1> 
            <div className='w-full h-[300px] overflow-y-auto flex flex-col gap-3'>
            {studentLessons?.map((lesson,i) => {
                return(
                     <Lesson lesson={lesson.lesson} lessonPoint={lesson.grade} lessonId={lesson._id} key={i}></Lesson>
                )
            })}
            </div>
            </div>
            <div className='w-3/6 text-white h-full flex flex-col p-5 gap-5 rounded-lg'>
            <div className='w-full flex justify-between'> <h1 className='text-xl'>Devamsızlık : {studentAbsences.length}</h1></div>
           
            <div className='w-full h-[300px] overflow-y-auto flex flex-col gap-3'>
            {studentAbsences?.map((absence) => {
                return(
                    <div className='w-full p-1 h-fit flex justify-between'>
                        <h1>{absence.date}</h1>
                        <h1 onClick={()=>{deleteAbsence(absence._id)}} className='hover:text-red-500 cursor-pointer'>X</h1>
                        </div>
                )
            })}
            </div>
                </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Student