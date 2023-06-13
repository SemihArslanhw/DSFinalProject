import React, { useEffect, useState } from 'react'
import Student from '../components/Student'

function TeacherHome() {

  const [students, setStudents] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isStudentMode, setIsStudentMode] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({})

  useEffect(() => {
    document.title = 'Öğretmen Sistemi'
    getStudents()
    }, [])

    const getStudents = () => {
        fetch('http://localhost:8080/student', {
            method: 'GET'})
        .then(response => response.json())
        .then(data => setStudents(data))
    }

    const addStudent = () => {
        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        }).then(response => getStudents())


    }


  return (
    <div className='w-full h-full flex items-center justify-center'>
      {isStudentMode && <Student setIsStudentMode={setIsStudentMode} selectedStudent={selectedStudent} />}
    <div className='w-[700px] h-2/3 gap-5 rounded-lg bg-gray-100 justify-between p-10 shadow-2xl flex flex-col items-center '>
        <h1 className='text-2xl font-bold text-blue-500'>Öğretmen Sistemine Hoşgeldiniz</h1>
        <div className='flex flex-col gap-10 items-center justify-end w-full'>
        <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className='p-2 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="text" placeholder="Kullanıcı Adı" />
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='p-2 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="password" placeholder="Şifre" />
        <button onClick={()=>addStudent()} className='p-2 w-[100px] text-sm bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="submit">Öğrenci Ekle</button>
        </div>
        <div className='w-full h-[300px] rounded-lg gap-5 border-gray-400 border overflow-y-auto flex flex-col items-center p-5'>
         {students?.map((student) => (
            <div onClick={(e)=>{setIsStudentMode(true);setSelectedStudent(student)}} key={student._id} className='w-full rounded-lg hover:bg-gray-500 h-20 p-3 cursor-pointer flex items-center justify-between border-gray-400'>
            <div className='flex items-center justify-center text-2xl'><p className='text-blue-500 font-bold'>Öğrenci adı :</p> {student.username}</div>
            </div>
                ))}
        </div>
    </div>
    </div>
  )
}

export default TeacherHome