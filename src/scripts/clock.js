import React from 'react';
import LiveClock from 'react-live-clock';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

export function Clock() {
  return (
    <div className="clock">
      <LiveClock
        className="clock__date"
        format={'Do, MMMM, ddd, YYYY'}
        ticking={true}
      />
      <div className="clock__time">
        <ScheduleOutlinedIcon />
        &nbsp;
        <LiveClock format={'HH:mm'} ticking={true} />
      </div>
    </div>
  );
}
