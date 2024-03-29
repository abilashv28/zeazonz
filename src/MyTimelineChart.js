import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { Button, ButtonGroup, Container } from '@mui/material';

const groups = [
  { id: 1, title: 'layers' },
  { id: 2, title: 'layer 1' },
  { id: 3, title: 'layer 2' },
  { id: 4, title: 'override layer' },
  { id: 5, title: 'Final Schedule' },
];

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
  const [currentDate, setCurrentDate] = useState(moment());
  const [view, setView] = useState('day');

  const handleNextButtonClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().add(1, view));
  };

  const handlePreviousButtonClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().subtract(1, view));
  };

  const handleTodayButtonClick = () => {
    setCurrentDate(moment());
  };

  const handleMonthButtonClick = () => {
    setView('month');
  };

  const handleWeekButtonClick = () => {
    setView('week');
  };

  const handleDayButtonClick = () => {
    setView('day');
  };



  const timelineRef = React.createRef();

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <Button onClick={handleTodayButtonClick}>Today</Button>
          <Button onClick={handlePreviousButtonClick}>Previous</Button>
          <Button onClick={handleNextButtonClick}>Next</Button>
        </div>
        <div className='col-md-6'>
          <ButtonGroup>
            <Button onClick={handleMonthButtonClick}>Month</Button>
            <Button onClick={handleWeekButtonClick}>Week</Button>
            <Button onClick={handleDayButtonClick}>Day</Button>
          </ButtonGroup>
        </div>
      </div>
      <Container>
        <Timeline
          ref={timelineRef}
          groups={groups}
          items={items}
          defaultTimeStart={currentDate.clone().startOf(view)}
          defaultTimeEnd={currentDate.clone().endOf(view)}
          visibleTimeStart={currentDate.clone().startOf(view)}
          visibleTimeEnd={currentDate.clone().endOf(view)}
          minZoom={60 * 60 * 1000}
        />
      </Container>


    </div>

  );
}

export default TimelineComponent;