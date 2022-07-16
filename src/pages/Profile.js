import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('erro');

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem('user'));
    if (getFromLocal) {
      const { email } = getFromLocal;
      setUserEmail(email);
    }
  }, []);

  return (
    <div>
      <Header />
      <section>
        <p data-testid="profile-email">{userEmail}</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => { history.push('./done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => { history.push('./favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            history.push('./');
            localStorage.clear();
          } }
        >
          Logout
        </button>
      </section>
      <p>
        <br />
        {`  
          
          `}
        <br />
      </p>
      <Footer />
    </div>
  );
}

export default Profile;
