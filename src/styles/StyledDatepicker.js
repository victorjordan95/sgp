import DatePicker from 'react-date-picker';
import styled from 'styled-components';

const StyledDatepicker = styled(DatePicker)`
  .react-date-picker__wrapper {
    border: none;
  }

  .react-date-picker__calendar {
    z-index: 3;
  }
`;

export default StyledDatepicker;
