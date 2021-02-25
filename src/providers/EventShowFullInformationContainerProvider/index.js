import React from 'react';
import queryString from 'query-string';
import { BookingHeader } from '../../components';
import { formatDate } from '../../components/ProfileArchive/ticket';
import { getWindow } from '../../core/functions/browser';

export default function EventShowFullInformationProvider(componentInfo, {}, eventList) {
  const props = {
    title: false,
    cinemaAddress: false,
    locationImage: false,
    locationLabel: false,
    dayImage: false,
    dayWithMonth: false,
    eventRunTime: false,
    glassesImage: false,
    videoQuality: false,
    eventAuditorium: false,
    dayName: false,
    eventImage: false,
    ageLimitImage: false,
  };

  const findValue = (comp, fieldName, value) => {
    for (let item = 0; item < comp.childrenList.length; item++) {
      if (comp.childrenList[item][fieldName] === value) {
        return comp.childrenList[item][fieldName];
      }
    }
    return null;
  };

  const findChildren = (comp, fieldName, value) => {
    for (let item = 0; item < comp.childrenList.length; item++) {
      if (comp.childrenList[item][fieldName] === value) {
        return comp.childrenList[item];
      }
    }
    return null;
  };


  if (findValue(componentInfo, 'name', 'eventName')) {
    props.title = findChildren(componentInfo, 'name', 'eventName');
  }

  if (findValue(componentInfo, 'name', 'locationImage')) {
    props.locationImage = !!findValue(componentInfo, 'name', 'locationImage');
  }

  if (findValue(componentInfo, 'name', 'locationLabel')) {
    props.locationLabel = findChildren(componentInfo, 'name', 'locationLabel');
  }

  if (findValue(componentInfo, 'name', 'dayImage')) {
    props.dayImage = !!findValue(componentInfo, 'name', 'dayImage');
  }
  if (findValue(componentInfo, 'name', 'ageLimitImage')) {
    props.ageLimitImage = findChildren(componentInfo, 'name', 'ageLimitImage');
  }

  if (findValue(componentInfo, 'name', 'eventAuditorium')) {
    props.eventAuditorium = findChildren(componentInfo, 'name', 'eventAuditorium');
  }

  if (findValue(componentInfo, 'name', 'dayWithMonth')) {
    props.dayWithMonth = findChildren(componentInfo, 'name', 'dayWithMonth');
  }

  if (findValue(componentInfo, 'name', 'eventRunTime')) {
    props.eventRunTime = findChildren(componentInfo, 'name', 'eventRunTime');
  }

  if (findValue(componentInfo, 'name', 'dayName')) {
    props.dayName = findChildren(componentInfo, 'name', 'dayName');
  }

  if (findValue(componentInfo, 'name', 'glassesImage')) {
    props.glassesImage = !!findValue(componentInfo, 'name', 'glassesImage');
  }

  if (findValue(componentInfo, 'name', 'videoQuality')) {
    props.videoQuality = findChildren(componentInfo, 'name', 'videoQuality');
  }

  if (findValue(componentInfo, 'name', 'audioQuality')) {
    props.audioQuality = findChildren(componentInfo, 'name', 'audioQuality');
  }

  if (findValue(componentInfo, 'name', 'eventImage')) {
    props.eventImage = findChildren(componentInfo, 'name', 'eventImage');
  }

  const getNormalTime = (time) => {
    const startTime = time.slice(0, time.indexOf('-')).slice(0, -10);
    const endTime = time.slice(time.indexOf('-') + 1, time.length).slice(0, -10);
    return `${startTime} - ${endTime}`;
  };
  const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
  return (
    <BookingHeader
      // background={props.movie.poster}
      background={props.eventImage ? props.eventImage.componentsDescription.source : ''}
      title={props.title ? props.title.componentsDescription.value : ''}
      cinemaAddress={props.locationLabel ? props.locationLabel.componentsDescription.value : ''}
      locationImage={props.locationImage}
      hall={props.eventAuditorium ? props.eventAuditorium.componentsDescription.value : ''}
      dayOfWeek={props.dayName ? props.dayName.componentsDescription.value : ''}
      date={props.dayWithMonth ? formatDate(props.dayWithMonth.componentsDescription.value, 'dd F') : ''}
      time={props.eventRunTime ? getNormalTime(props.eventRunTime.componentsDescription.value) : ''}
      videoFormat={props.videoQuality ? props.videoQuality.componentsDescription.value : ''}
      videoImageFormat={props.videoQuality ? props.videoQuality.componentsDescription.image : ''}
      audioFormat={props.audioQuality ? props.audioQuality.componentsDescription.value : ''}
      dayImage={props.dayImage}
      glassesImage={props.glassesImage}
      ageLimitImage={props.ageLimitImage ? props.ageLimitImage.componentsDescription.age : ''}
      payment={params.payment}
      setHeaderInfoPage={eventList && eventList.setHeaderInfoPage}
      orderListInfo={eventList && eventList.orderListInfo}
      eventId={eventList && eventList.eventId}
    />
  );
}
