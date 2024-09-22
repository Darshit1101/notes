import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LazyLogin = lazy(() => import('./containers/Login/Login'));
const LazyTest = lazy(() => import('./containers/Testing/Test'));

const MyRoutes = () => {
    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path="*" element={<LazyLogin />} />
                <Route path="/test" element={<LazyTest />} />
            </Routes>
        </Suspense>
    );
}

export default MyRoutes;