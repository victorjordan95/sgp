import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

const StyledCalendar = styled(Calendar)`
  .rbc-toolbar {
    flex-flow: column wrap;
    @media screen and (min-width: 1024px) {
      flex-flow: row wrap;
    }
  }

  .rbc-toolbar-label {
    text-transform: uppercase;
    font-weight: bold;
    margin: 8px 0;
  }
  .rbc-current-time-indicator {
    height: 2px;
    background-color: #d32f2f;
  }
  .rbc-header {
    text-transform: capitalize;
  }
  .rbc-agenda-date-cell {
    text-transform: capitalize;
    vertical-align: middle !important;
  }
`;

export default StyledCalendar;
