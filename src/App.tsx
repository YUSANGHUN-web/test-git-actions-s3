import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pagination from '@/components/Pagination';

function App() {
  console.log(process.env.REACT_APP_API_HOST)
  return (
    <div className="App">
      2021-04-27 9:53

      <Pagination totalPages={3} onChangePage={() => {}} activePage={1} setActivePage={() => {}} countPerPage={11} />
    </div>
  );
}

export default App;
