import React, { useState } from 'react';

const SortedTable = ({ students }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const   
 sortedStudents = students.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * (sortOrder === 'asc' ? 1 : -1);
    } else if (sortBy === 'GPA') {
      return (a.GPA - b.GPA) * (sortOrder === 'asc' ? 1 : -1);
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th><a href="#" onClick={() => handleSort('name')}>Name</a></th>
          <th><a href="#" onClick={() => handleSort('GPA')}>GPA</a></th>
        </tr>
      </thead>
      <tbody>
        {sortedStudents.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.GPA}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortedTable;
