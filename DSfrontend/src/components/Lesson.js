import React, { useState } from 'react'

function Lesson({ lesson, lessonPoint, lessonId }) {

    const [lessonn, setLessonn] = useState(lesson)
    const [lessonPointn, setLessonPointn] = useState(lessonPoint)

    const updateLesson = () => {
        fetch('http://localhost:8080/student/grade/' + lessonId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "lesson" : lessonn,
                "grade" : lessonPointn
            })
        })
    }


    return (
        <div className='w-full p-1 h-fit flex items-center justify-between'>
            <div className='flex'>Ders :<input value={lessonn} onChange={(e)=>{setLessonn(e.target.value)}} className='w-2/3 bg-slate-700 text-white'></input></div> 
            <div className='flex'>Puan :<input value={lessonPointn} onChange={(e)=>{setLessonPointn(e.target.value)}} className='w-2/3 bg-slate-700 text-white'></input></div> 
            <button onClick={()=>{updateLesson()}}>Düzenle</button>
        </div>
    )
}

export default Lesson