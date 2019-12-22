import React from 'react';

class StudentList extends React.Component {
  render() {
    return (
      <h1>
        Display Student list. Only logged in STAFF, ADMIN can see this page
      </h1>
    );
  }
}

export default StudentList;
