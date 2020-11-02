import React from 'react';
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = ({ size, loading }) => {
  return (
    <div
      className='sweet-loading'
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}>
      <HashLoader
        css={override}
        size={size}
        color={'#99E34A'}
        loading={loading}
      />
    </div>
  );
};

export default Loading;
