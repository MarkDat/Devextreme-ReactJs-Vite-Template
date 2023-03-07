import React from 'react';
import './orders.scss';

export default function Order() {
  return (
    <>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings order-page'}>
           <Outlet />
        </div>
      </div>
    </>
  );
};
