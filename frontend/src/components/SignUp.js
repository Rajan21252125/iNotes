import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp(props) {
  const [credentials, setCredentials] = useState({name:'' , email:'' , password:''})
  const history = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(credentials);
    try {
      const response = await fetch('https://inotes-i3zr.onrender.com/api/auth/createUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      })
      const json = await response.json()
      if(json.success){
        localStorage.setItem('token', json.token);
        props.showAlert("User Created Successfully","success")
        history('/')
      }
      else{
        props.showAlert('User Already exist please sign up with different email','danger')
      }
      console.log(json);
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const toggleShow = () => {
    var x = document.getElementById('password')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }
  return (
    <div className='container my-4'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name="name" value={credentials.name} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={handleChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1" onClick={toggleShow}>Check me out</label>
        </div>
        <button type="submit" className="btn btn-outline-primary">Sign-Up</button>
      </form>
    </div>
  )
}
