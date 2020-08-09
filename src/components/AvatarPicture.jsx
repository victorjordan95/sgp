import React from 'react';
import styled from 'styled-components';

import defaultPicture from '../assets/img/default-picture.png';

const StyledAvatar = styled.img`
  border-radius: 50%;
  margin: 0 auto;
  &.small {
    border: 2px solid #009688;
    height: 30px;
    width: 30px;
  }
  &.medium {
    border: 5px solid #009688;
    height: 150px;
    width: 150px;
  }
  &.large {
    border: 5px solid #009688;
    height: 200px;
    width: 200px;
  }
`;

function AvatarPicture({ path, description, size }) {
  return (
    <StyledAvatar
      src={path || defaultPicture}
      alt={description}
      className={size}
    />
  );
}

export default AvatarPicture;
