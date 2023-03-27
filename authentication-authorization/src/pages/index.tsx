import { AuthContext } from '@/context/AuthContext'
import { GetServerSideProps } from 'next'
import { FormEvent, useContext, useState } from 'react'
import styles from '../styles/Home.module.css'
import { parseCookies } from 'nookies'
import { withSSRGuest } from '../../utils/withSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, isAuthenticated } = useContext(AuthContext)

  const credentials = {
    email,
    password
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    signIn(credentials)
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

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {}
  }
})
