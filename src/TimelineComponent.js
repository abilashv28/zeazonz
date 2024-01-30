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
    title: "Jack A",
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
  },
  {
    id: 2,
    group: 2,
    title: "Richard M",
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
  },
  {
    id: 3,
    group: 1,
    title: "John M",
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
  {
    id: 4,
    group: 5,
    title: "Jack A",
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function TimelineComponent() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [view, setView] = useState('day');
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(currentDate.clone().endOf(view));

  const handleNextButtonClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().add(1, view));
    updateVisibleTimeEnd(view);
  };

  const handlePreviousButtonClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().subtract(1, view));
    updateVisibleTimeEnd(view);
  };

  const handleTodayButtonClick = () => {
    setCurrentDate(moment());
    updateVisibleTimeEnd(view);
  };

  const handleMonthButtonClick = () => {
    setView('month');
    updateVisibleTimeEnd('month');
  };

  const handleWeekButtonClick = () => {
    setView('week');
    updateVisibleTimeEnd('week');
  };

  const handle2DateButtonClick = () => {
     setView('day');
    updateVisibleTimeEnd('day');
    setVisibleTimeEnd(currentDate.clone().endOf('day').add(1, 'day'));
  };

  const handle2WeekButtonClick = () => {
    setView('week');
    updateVisibleTimeEnd('week');
    setVisibleTimeEnd(currentDate.clone().endOf('week').add(1, 'week'));
  };
  const handleDayButtonClick = () => {
    setView('day');
    updateVisibleTimeEnd('day');
  };

  const updateVisibleTimeEnd = (newView) => {
    setVisibleTimeEnd(currentDate.clone().endOf(newView));
  };

  const timelineRef = React.createRef();

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = getRandomColor(); // Assign a unique color for each user

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            border: '1px solid #333',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.2)',
            padding: '2px',
            zIndex: '100',
          },
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            position: 'absolute',
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  return (
    <div>
      <div className='row' style={{marginBottom:'10%',marginTop:'5%'}}>
        <div className='col-md-6'>
          <Button onClick={handleTodayButtonClick}>Today</Button>
          <Button onClick={handlePreviousButtonClick}>Previous</Button>
          <Button onClick={handleNextButtonClick}>Next</Button>
        </div>
        <div className='col-md-6'>
          <ButtonGroup>
            <Button onClick={handleMonthButtonClick}>Month</Button>
            <Button onClick={handle2WeekButtonClick}>2-week</Button>
            <Button onClick={handleWeekButtonClick}>Week</Button>
            <Button onClick={handle2DateButtonClick}>2-day</Button>
            <Button onClick={handleDayButtonClick}>Day</Button>
          </ButtonGroup>
        </div>
      </div>
        <Timeline
          ref={timelineRef}
          groups={groups}
          items={items}
          defaultTimeStart={currentDate.clone().startOf(view)}
          defaultTimeEnd={currentDate.clone().endOf(view)}
          visibleTimeStart={currentDate.clone().startOf(view)}
          visibleTimeEnd={visibleTimeEnd}
          minZoom={60 * 60 * 1000}
          itemRenderer={itemRenderer}
        />
    </div>
  );
}

export default TimelineComponent;
