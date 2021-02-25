import * as actionsTypes from './actionsTypes';

// eslint-disable-next-line import/prefer-default-export
export function setFilterCinema(cinema, key) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_CINEMA,
    payload: cinema,
    key
  };
}

export function setFilterDay(day, key, date) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_DAY,
    payload: day,
    date: date,
    key,
  };
}


export function setFilterTime(time, key, start, end) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_TIME,
    payload: time,
    key,
    start,
    end,
  };
}

export function setFilterFormat(format, key, groupKey) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_FORMAT,
    payload: format,
    key,
    groupKey,
  };
}

export function setFilterOther(other, key, groupKey) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_OTHER,
    payload: other,
    key,
    groupKey,
  };
}

export function resetFilterFormat() {
  return {
    type: actionsTypes.RESET_FILTER_OPTIONS_FORMAT,
  };
}

export function resetFilterOther() {
  return {
    type: actionsTypes.RESET_FILTER_OPTIONS_OTHER,
  };
}

export function setAfishaActiveTab(activeTab) {
  return {
    type: actionsTypes.SET_AFISHA_ACTIVE_TAB,
    payload: activeTab,
  };
}


// soon filters
export function setFilterMonth(month, key) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_MONTH,
    payload: month,
    key,
  };
}

export function setFilterCategory(category, key) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_CATEGORY,
    payload: category,
    key,
  };
}


export function setFilterHaveShow(status, key) {
  return {
    type: actionsTypes.SET_FILTER_OPTIONS_HAVE_SHOW,
    payload: status,
    key,
  };
}

export function setTabForFilters(tabId, filtersName) {
  return {
    type: actionsTypes.SET_TAB_FOR_FILTERS,
    tabId,
    filtersName,
  };
}
