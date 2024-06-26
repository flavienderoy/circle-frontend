import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [ formSubmit, setFormSubmit ] = useState(false) // [1
  const [ pseudo, setPseudo ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ controlPassword, setControlPassword ] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const terms = document.getElementById('terms')
    const pseudoError = document.querySelector('.pseudo.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector('.password-confirm.error')
    const termsError = document.querySelector('.terms.error')

    passwordConfirmError.innerHTML = ''
    termsError.innerHTML = ''

    if (password !== controlPassword || !terms.checked) {
      if (password != controlPassword) {
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"
      }
      if (!terms.checked) {
        termsError.innerHTML = "Veuillez lire et accepter les conditions générales"
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password
        }
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          }else{
            setFormSubmit(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span> 
          <h4 className="success"> Enregistrement réussi, veuillez vous connecter</h4>
        </>
      ) : (

        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input type="text" placeholder="Pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input type="text" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input type="password" placeholder="Mot de passe" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input type="password" placeholder="Confirmer mot de passe" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  )
}

export default SignUpForm