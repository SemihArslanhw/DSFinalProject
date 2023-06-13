import React from 'react'

function StudentLogin() {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch('http://localhost:8080/student/login', {
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
              console.log(data.data)
              alert('Giriş başarılı')
              window.location.href = '/student/home/' + data.data._id
          }else{
            alert('Kullanıcı adı veya şifre hatalı')
      }
      }
      )
   }
  

  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className='w-[700px] h-1/2 rounded-lg bg-gray-100 justify-between p-10 shadow-2xl flex flex-col items-center '>
        <h1 className='text-2xl font-bold text-blue-500'>Öğrenci Sistemine Giriş</h1>
        <form onSubmit={handleSubmit} className='flex flex-col h-full gap-10 items-center justify-center'>
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className='p-2 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="text" placeholder="Kullanıcı Adı" />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='p-2 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="password" placeholder="Şifre" />
            <button className='p-2 w-[250px] bg-blue-300 rounded-lg text-yellow-800 flex justify-center items-center hover:bg-blue-400' type="submit">Giriş Yap</button>
        </form>
    </div>
</div>  )
}

export default StudentLogin