import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[700px] h-1/2 rounded-lg bg-gray-100 justify-between p-10 shadow-2xl flex flex-col items-center '>
            <h1 className='text-2xl font-bold text-blue-500'>Öğretim Sistemine Hoşgeldiniz</h1>
            <Link to={"/teacher/login"} className='p-5 w-[250px] bg-yellow-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-yellow-400'>Öğretmen olarak giriş yap</Link>
            <Link to={"/student/login"} className='p-5 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400'>Öğrenci olarak giriş yap</Link>
        </div>
    </div>
  )
}

export default Home