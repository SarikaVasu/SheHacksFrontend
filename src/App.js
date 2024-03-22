import React from "react";
import LandingPage from './components/landing/LandingPage';
import SignUp from './features/signup/SignUp';
import SignIn from './features/signin/SignIn';
import VotingPage from './features/voting/Voting';

// import Prefetch from './features/auth/Prefetch';
// import PersistLogin from './features/auth/PersistLogin';
// import RequireAuth from './features/auth/RequireAuth';
// import { ROLES } from './config/roles';

import {Routes, Route, Navigate} from 'react-router-dom';
import useTitle from './hooks/useTitle';


function App() {
  useTitle('Electoral Voting App');

  return (

    <Routes>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/signup' element= {<SignUp />}></Route>
      <Route path='/signin' element= {<SignIn />}></Route>
      <Route path='/vote' element={<VotingPage />}></Route>

      {/* <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>

            <Route path='/vote' element={<VotingPage />}></Route>

            // <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            //   <Route path='administrator/settings/details'></Route>
            // </Route>

          </Route>
        </Route>
      </Route> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
