import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function StudentHome() {

    const { id } = useParams()
    const [userName , setUserName] = useState("")
    const [studentAbsences , setStudentAbsences] = useState([])
    const [studentLessons , setStudentLessons] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/student/get/' + id, {
            method: 'GET'})
        .then(response => response.json())
        .then(data =>{ setUserName(data.username); console.log(data)})

        fetch('http://localhost:8080/student/absence/' + id, {
            method: 'GET'})
        .then(response => response.json())
        .then(data => {setStudentAbsences(data); console.log(data)})

        fetch('http://localhost:8080/student/grade/' + id, {
            method: 'GET'})
        .then(response => response.json())
        .then(data => {setStudentLessons(data); console.log(data)})

    }, [])

  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className='w-[700px] h-2/3 rounded-lg bg-gray-100 justify-between p-10 shadow-2xl flex flex-col items-center '>
        <h1 className='text-2xl font-bold text-blue-500'>Öğrenci Sistemine Hoşgeldin { userName } </h1>
        <div className='w-full h-full flex '>
            <div className='w-4/6 border-r text-black h-full flex flex-col p-5 gap-5'>
            <h1 className='text-xl'>Dersler</h1> 
            <div className='w-full h-[300px] overflow-y-auto flex flex-col gap-3'>
            {
                studentLessons?.map((lesson) => {
                    return(
                        <div className='w-full p-1 h-fit flex justify-between'>
            <div className='flex'>Ders :{lesson.lesson}</div> 
            <div className='flex'>Puan :{lesson.grade}</div> 
                            </div>
                    )
                }
                )
            }
            </div>
            </div>
            <div className='w-3/6 text-black h-full flex flex-col p-5 gap-5 rounded-lg'>
            <div className='w-full flex justify-between'> <h1 className='text-xl'>Devamsızlık : {studentAbsences?.length}</h1></div>
            {studentAbsences?.map((absence) => {
                return(
                    <div className='w-full p-1 h-fit flex justify-between'>
                        <h1>{absence.date}</h1>
                        </div>
                )
            })}
            <div className='w-full h-[300px] overflow-y-auto flex flex-col gap-3'>

            </div>
                </div>
        </div>
    </div>
</div>  )
}

export default StudentHome