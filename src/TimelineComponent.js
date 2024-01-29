import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { Button, ButtonGroup, Container } from '@mui/material';
// import data from './data.json'; // Import your data

// const groups = data.groups; // Use the groups from data.json
// const items = data.items;   // Use the items from data.json
const groups = [{ id: 1, title: 'layers' }, { id: 2, title: 'layer 1' }, { id: 3, title: 'layer 2' }, { id: 4, title: 'override layer' }, { id: 5, title: 'Final Schedule' }];
const items = [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment(),
      end_time: moment().add(1, 'hour'),
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour'),
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour'),
    },
  ];



function TimelineComponent() {
  const [view, setView] = useState('month');

  const handleTodayClick = () => {
    const now = moment();
    switch (view) {
      case 'month':
        setTimelineRange(now.startOf('month'), now.endOf('month'));
        break;
      case 'week':
        setTimelineRange(now.startOf('isoWeek'), now.endOf('isoWeek'));
        break;
      case 'day':
        setTimelineRange(now.startOf('day'), now.endOf('day'));
        break;
      default:
        break;
    }
  };

  const setTimelineRange = (start, end) => {
    timelineRef.current.setTimelineBounds(start, end);
  };

  const handleNextClick = () => {
    const currentStart = timelineRef.current.state.visibleTimeStart;
    const currentEnd = timelineRef.current.state.visibleTimeEnd;
    const duration = moment.duration(currentEnd.diff(currentStart));

    setTimelineRange(currentStart.add(duration), currentEnd.add(duration));
  };

  const handlePrevClick = () => {
    const currentStart = timelineRef.current.state.visibleTimeStart;
    const currentEnd = timelineRef.current.state.visibleTimeEnd;
    const duration = moment.duration(currentEnd.diff(currentStart));

    setTimelineRange(currentStart.subtract(duration), currentEnd.subtract(duration));
  };

  const timelineRef = React.createRef();

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => setView('month')}>Month</Button>
        <Button onClick={() => setView('week')}>Week</Button>
        <Button onClick={() => setView('day')}>Day</Button>
      </ButtonGroup>
      <Button onClick={handleTodayClick}>Today</Button>
      <Button onClick={handlePrevClick}>Previous</Button>
      <Button onClick={handleNextClick}>Next</Button>
      
      <Timeline
        ref={timelineRef}
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        visibleTimeStart={moment().add(-12, 'hour')}
        visibleTimeEnd={moment().add(12, 'hour')}
        minZoom={60 * 60 * 1000} // Minimum zoom level is 1 hour
      />
    </Container>
  );
}

export default TimelineComponent;
