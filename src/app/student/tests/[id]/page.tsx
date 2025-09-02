
import React from 'react';

const StudentTestPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Test</h1>
      <p>You are taking test with ID: {params.id}</p>
    </div>
  );
};

export default StudentTestPage;
