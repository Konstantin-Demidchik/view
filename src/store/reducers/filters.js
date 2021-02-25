import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  cinema: {},
  day: {},
  time: {},
  format: {},
  other: {},
  afishaActiveTab: null,
  month: {},
  category: {},
  isHaveShow: {},
  tabFilters: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_FILTER_OPTIONS_CINEMA:
      return {
        ...state,
        cinema: {
          name: action.payload,
          key: action.key,
        }
      };

    case actionsTypes.SET_FILTER_OPTIONS_DAY:
      return {
        ...state,
        day: {
          name: action.payload,
          key: action.key,
          date: action.date,
        }
      };

    case actionsTypes.SET_FILTER_OPTIONS_TIME:
      return {
        ...state,
        time: {
          name: action.payload,
          key: action.key,
          start: action.start,
          end: action.end,
        }
      };

    case actionsTypes.SET_FILTER_OPTIONS_FORMAT: {
      const newStateFormat = { ...state };
      if (action.groupKey === undefined) {
        newStateFormat.format[action.groupKey] = undefined;
        return newStateFormat;
      }
      if (!newStateFormat.format[action.groupKey]) newStateFormat.format[action.groupKey] = {};
      if (newStateFormat.format[action.groupKey][action.key]) {
        newStateFormat.format[action.groupKey][action.key] = undefined;

        if (Object.values(newStateFormat.format[action.groupKey]).filter(a => a).length === 0) {
          newStateFormat.format[action.groupKey] = undefined;
        }
        return newStateFormat;
      }

      newStateFormat.format[action.groupKey][action.key] = action.payload;
      return newStateFormat;
    }

    case actionsTypes.SET_FILTER_OPTIONS_OTHER: {
      const newStateFormat = { ...state };
      if (action.groupKey === undefined) {
        newStateFormat.other[action.groupKey] = undefined;
        return newStateFormat;
      }
      if (!newStateFormat.other[action.groupKey]) newStateFormat.other[action.groupKey] = {};
      if (newStateFormat.other[action.groupKey][action.key]) {
        newStateFormat.other[action.groupKey][action.key] = undefined;
        if (Object.values(newStateFormat.other[action.groupKey]).filter(a => a).length === 0) {
          newStateFormat.other[action.groupKey] = undefined;
        }
        return newStateFormat;
      }
      newStateFormat.other[action.groupKey][action.key] = action.payload;
      return newStateFormat;
    }

    case actionsTypes.RESET_FILTER_OPTIONS_FORMAT: {
      return {
        ...state,
        format: {}
      };
    }
    case actionsTypes.RESET_FILTER_OPTIONS_OTHER: {
      return {
        ...state,
        other: {}
      };
    }

    case actionsTypes.SET_FILTER_OPTIONS_OTHER: {
      return {
        ...state,
        other: {}
      };
    };

    case actionsTypes.SET_AFISHA_ACTIVE_TAB:
      return {
        ...state,
        afishaActiveTab: action.payload,
      };
    case actionsTypes.SET_FILTER_OPTIONS_MONTH:
      return {
        ...state,
        month: {
          name: action.payload,
          key: action.key,
        }
      };
    case actionsTypes.SET_FILTER_OPTIONS_CATEGORY:
      return {
        ...state,
        category: {
          name: action.payload,
          key: action.key,
        }
      };
    case actionsTypes.SET_FILTER_OPTIONS_HAVE_SHOW:
      return {
        ...state,
        isHaveShow: {
          name: action.payload,
          key: action.key,
        }
      };
    case actionsTypes.SET_TAB_FOR_FILTERS:
      const newStateFormat = { ...state };
      if (!Object.keys(newStateFormat.tabFilters).find(key => key == action.tabId)) {
          newStateFormat.tabFilters[action.tabId] = action.filtersName;
          return newStateFormat;
      }
    default:
      return state;
  }
};
