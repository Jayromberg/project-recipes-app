import React from 'react';

function Login() {
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
          />
          <input
            data-testid="password-input"
            id="page-login"
            type="password"
            name="password"
            placeholder="Digite a senha"
          />
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </label>
      </form>
    </div>
  );
}

export default Login;
