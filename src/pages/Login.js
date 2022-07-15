import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContex from '../context/RecipesContext';
import { localStorageCocktailsToken,
  localStorageMealstoken, localStorageUser } from '../services/localStorage';

function Login() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const { setEmail,
  } = useContext(RecipesContex);

  const emailRegex = () => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i.test(emailInput);
  const passwordMin = 6;
  const validationPassword = () => password.length > passwordMin;

  const enableButton = () => {
    const user = { email: emailInput };
    localStorageCocktailsToken(1);
    localStorageMealstoken(1);
    localStorageUser(user);
    setEmail(emailInput);
    history.push('./foods');
  };

  return (
    <div>
      <form>
        <label htmlFor="page-login">
          <input
            data-testid="email-input"
            type="email"
            id="page-login"
            name="email"
            placeholder="Digite seu email"
            value={ emailInput }
            onChange={ (event) => setEmailInput(event.target.value) }
          />
          <input
            data-testid="password-input"
            id="page-login"
            type="password"
            name="password"
            minLength="6"
            placeholder="Digite a senha"
            onChange={ (event) => setPassword(event.target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(emailRegex() && validationPassword()) }
            onClick={ enableButton }
            className={ `entrar-btn ${!(emailRegex() && validationPassword())
              ? 'disable' : 'enable'}` }
          >
            Enter
          </button>
        </label>
      </form>
    </div>
  );
}

export default Login;
