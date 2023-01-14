import React from 'react';

const Tabs = () => {
  const items = ['General', 'Users', 'Plan', 'Billing', 'Integrations'];
  return (
    <div className='flex items-center px-2 my-6 bg-white border-2 border-gray-300 shadow-sm rounded-xl max-w-fit b-2'>
      {items.map((item, idx) => (
        <button
          className='p-3 font-semibold text-center text-gray-700 hover:bg-gray-100'
          key={idx}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
