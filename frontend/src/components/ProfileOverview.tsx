import React from 'react';
import prettyMilliseconds from 'pretty-ms';

import { IOverview } from '../types/ProfileGraphDashboard';

interface ProfileOverviewProps {
  overviewInfo?: IOverview;
  queryDuration?: number;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  overviewInfo,
  queryDuration = 0,
}) => {
  return (
    <div className="expensive-nodes-card">
      <div className="expensive-nodes-card-header">
        <h2>
          Profile Overview <span>(Finished)</span>
        </h2>
      </div>
      <div className="expensive-nodes-node">
        <div className="expensive-nodes-node-name">Total Execution Time</div>
        <div className="expensive-nodes-node-percentage">
          ({prettyMilliseconds(Math.floor(queryDuration/1000/1000))})
          {overviewInfo?.totalTimePercent}
        </div>
      </div>
      <div className="expensive-nodes-node">
        <div className="expensive-nodes-node-name">
          <span
            className="custom-dot"
            style={{ backgroundColor: "rgb(28, 130, 242)" }}
          />
          CPU Time
        </div>
        <div className="expensive-nodes-node-percentage">
          {overviewInfo?.cpuTimePercent}
        </div>
      </div>
      <div className="expensive-nodes-node">
        <div className="expensive-nodes-node-name">
          <span
            className="custom-dot"
            style={{ backgroundColor: "rgb(255, 152, 0)" }}
          />
          I/O Time
        </div>
        <div className="expensive-nodes-node-percentage">
          {overviewInfo?.waitTimePercent}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
