import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LazyLogin = lazy(() => import('./containers/Login/Login'));
const LazyTest = lazy(() => import('./containers/Testing/Test'));
const LazySignUp = lazy(() => import('./containers/SignUp/SignUp'));
const LazyDashboard = lazy(() => import('./containers/Dashboard/Dashboard'));
const LazySetting = lazy(() => import('./containers/Setting/Setting'));

const MyRoutes = () => {
    let authToken = localStorage.getItem('authToken');

    return (
        <Suspense fallback={<></>}>
            <Routes>
                {authToken ?
                    <>
                        <Route path='*' element={<Navigate to="/dashboard" replace />} />
                        <Route path="/testing" element={<LazyTest />} />
                        <Route path="/dashboard" element={<LazyDashboard />} />
                        <Route path='/setting/:type?' element={<LazySetting />} />

                    </>
                    :
                    <>
                        <Route path="*" element={<LazyLogin />} />
                        <Route path="/login" element={<LazyLogin />} />
                        <Route path="/register" element={<LazySignUp />} />
                    </>
                }
            </Routes>
        </Suspense>
    );
}

export default MyRoutes;