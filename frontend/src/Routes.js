import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LazyLogin = lazy(() => import('./containers/Login/Login'));
const LazyTest = lazy(() => import('./containers/Testing/Test'));
const LazySignUp = lazy(() => import('./containers/SignUp/SignUp'));

const MyRoutes = () => {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="*" element={<LazyLogin />} />
                <Route path="/test" element={<LazyTest />} />
                <Route path="/login" element={<LazyLogin />} />
                <Route path="/register" element={<LazySignUp />} />
            </Routes>
        </Suspense>
    );
}

export default MyRoutes;