import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ExplorePage from './ExplorePage';

export default function Exchange() {
  const location = useLocation();

  // Safely redirect if the URL is still /exchange, preserving search params
  if (location.pathname === '/exchange') {
    return <Navigate to={`/explore${location.search}`} replace />;
  }

  // Otherwise (e.g. on /explore), render the new ExplorePage
  return <ExplorePage />;
}
