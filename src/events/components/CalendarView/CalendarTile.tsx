import classNames from 'classnames';
import HoverCard from 'common/components/HoverCard';
import { Link } from 'core/components/Router';
import React from 'react';
import { getEventColor, IEvent, isCompanyEvent } from '../../models/Event';
import style from './calendar.less';
import CalendarHoverCard from './CalendarHoverCard';
import { DateTime } from 'luxon';

export interface ITileProps {
  events: IEvent[];
  active?: boolean;
  day: number;
  month: DateTime;
}

export const createDayList = (amount: number, start: number): number[] => {
  const l = [];
  for (let i = 0; i < amount; i++) {
    l.push(i + start + 1);
  }
  return l;
};

export const CalendarEventTile = ({ events, active = true, day, month }: ITileProps) => {
  const thisDate = new Date();
  const today = thisDate.getDate();
  const thisMonth = thisDate.getMonth() + 1;
  const isToday = day == today && thisMonth == parseInt(month.toFormat('M')) ? true : false;

  return (
    <div
      className={classNames(style.tile, {
        [style.tileInactive]: !active,
        [style.tileToday]: isToday,
      })}
    >
      <div className={style.tileContent}>
        <p>
          <span>{day}</span>
        </p>
        {events.map((event) => (
          <CalendarEvent key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export const CalendarFillerTiles = ({ days }: { days: number[] }) => (
  <>
    {days.map((day) => (
      <div className={style.tile + ' ' + style.tileInactive} key={`filler-${day}`}>
        <div className={style.tileContent}>
          <p>{day}</p>
        </div>
      </div>
    ))}
  </>
);

export const CalendarEvent = (event: IEvent) => (
  <Link to={`/events/${event.id}`}>
    <HoverCard card={<CalendarHoverCard {...event} />}>
      <p className={style.title} style={{ background: getEventColor(event.event_type) }}>
        {isCompanyEvent(event.event_type, event.company_event) ? event.company_event[0].company.name : event.title}
      </p>
    </HoverCard>
  </Link>
);

export default CalendarEventTile;
