import Octicon, { Clock as ClockIcon } from '@primer/octicons-react';
import React from 'react';
import LiveClock from 'react-live-clock';

export function Clock() {
  return (
    <div className="clock">
      <LiveClock className="clock__date" format={'Do, MMMM, ddd, YYYY'} ticking={true} />
      <div className="clock__time">
        <Octicon icon={ClockIcon} aria-hidden="true" />
        &nbsp;
        <LiveClock format={'HH:mm'} ticking={true} />
      </div>
    </div>
  );
}
