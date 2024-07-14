import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Share from './Share/Share';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/share/:username' element={<Share />} />
    </Routes>
  )
};

export default AllRoutes;