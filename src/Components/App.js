import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //onAuthStateChanged는 로그인, 로그아웃, 어플리케이션이 초기화 될 때 발생한다.
      if (user) {
        setUserObject({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUserObj = () => {
    // setUserObject(authService.currentUser);
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
          refreshUserObj={refreshUserObj}
        />
      ) : (
        'loading...'
      )}
    </ThemeProvider>
  );
}

export default App;
