import React from 'react'
import { DashboardCard } from '../../components';

const Dashboard = () => {
  const handleAddNote = () => {
    console.log('Add note clicked');
  }

  return (
    <div>
      <DashboardCard
        handleAddNote={handleAddNote}
      />
    </div>
  )
}

export default Dashboard
