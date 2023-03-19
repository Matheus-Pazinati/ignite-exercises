import { FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    console.log({email, password})
    setEmail('')
    setPassword('')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail</label>
        <input 
        type="email" 
        placeholder='xxx@email.com' 
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input 
        type="password" 
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
