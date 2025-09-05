
import React from 'react';

const TestDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Test Details</h1>
      <p>Details for test with ID: {params.id}</p>
    </div>
  );
};

export default TestDetailPage;
