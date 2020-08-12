import TimePicker from 'react-time-picker';
import styled from 'styled-components';

const StyledDatepicker = styled(TimePicker)`
  .react-time-picker__wrapper {
    border: none;
  }

  .react-time-picker__clock {
    z-index: 3;
  }
`;

export default StyledDatepicker;
