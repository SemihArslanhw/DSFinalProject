import React from 'react'

function TeacherLogin() {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/teacher/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username" : username,
           "password" : password
        })
    }).then(res => res.json())
    .then(data => {
       if(data.data){
            alert('Giriş başarılı')
            window.location.href = '/teacher/home'
        }else{
          alert('Kullanıcı adı veya şifre hatalı')
    }
    }
    )
 }

 const handleRegister = (e) => {
  e.preventDefault()
  fetch('http://localhost:8080/teacher', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username" : username,
        "password" : password
      })
  }).then(res => res.json())
  .then(data => {
   if(data.acknowledged){
        alert('Kayıt başarılı')
        window.location.href = '/teacher/login'
    }else{
      alert("Hata")
    }
  }
  )
}



  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className='w-[700px] h-1/2 rounded-lg bg-gray-100 justify-between p-10 shadow-2xl flex flex-col items-center '>
        <h1 className='text-2xl font-bold text-blue-500'>Öğretmen Sistemine Giriş</h1>
        <form  className='flex flex-col h-full gap-10 items-center justify-center'>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className='p-2 w-[250px] bg-yellow-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-yellow-400' type="text" placeholder="Kullanıcı Adı" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 w-[250px] bg-yellow-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-yellow-400' type="password" placeholder="Şifre" />
            <div className=' w-[250px] flex'>
            <button onClick={(e)=>{handleRegister(e)}} className='p-2 w-1/2 bg-yellow-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-yellow-400' type="submit">Kayıt Ol</button>
            <button onClick={(e)=>{handleLogin(e)}} className='p-2 w-1/2 bg-yellow-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-yellow-400' type="submit">Giriş Yap</button>

            </div>
        </form>
    </div>
</div>
  )
}

export default TeacherLogin