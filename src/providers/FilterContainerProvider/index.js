import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  Picker,
  OptionGroup,
  Option,
} from '../../components/Picker';

import { getWindow } from '../../core/functions/browser';
import { dayOfWeek, getBelarusDate, getBelarusDateTime, createDateView } from '../../core/functions/datetime';

import {
  setFilterCinema,
  setFilterDay,
  setFilterTime,
  setFilterFormat,
  setFilterOther,
  setFilterMonth,
  setFilterCategory,
  setFilterHaveShow,
  setTabForFilters,
} from '../../store/actions';

import { makeFormatForDate } from '../../core/functions/days';
import { FilterItem, FilterGrid } from '../../pages/MovieAfishaPage/MovieAfishaPageStyles';

export default function FilterContainerProvider(componentInfo, tabId, eventsFromCms) {
  const { style, childrenList: list } = componentInfo;

  const propsNew = {
    filters: [],
    styleId: style,
  };

  const findValue = (comp, fieldName) => {
    if (comp.componentsDescription && fieldName in comp.componentsDescription) {
      return comp.componentsDescription[fieldName];
    }
    return null;
  };

  const madeOptions = (props, eventsFromCms) => {
    list.forEach((item) => {
      if (item.typeName === 'filter') {
        const filter = {
          multiple: false,
          filterEventKey: findValue(item, 'eventFilterKey'),
          imgLink: findValue(item, 'eventFilterKey') === 'calendar' ? findValue(item, 'eventFilterKey') : findValue(item, 'source'),
          placeHolder: findValue(item, 'placeHolder'),
          filterOptions: [],
        };

        item.childrenList.forEach((el) => {
          const option = {
            label: null,
            labelStyle: null,
            id: null,
            description: null,
            descriptionStyle: null,
          };

          el.childrenList.forEach((element) => {
            if (element.typeName === 'description') {
              option.description = findValue(element, 'value');
              option.labelStyle = element.style;
            }
            if (element.typeName === 'label') {
              option.id = findValue(element, 'eventFilterKey');
              option.label = findValue(element, 'value');
              option.descriptionStyle = element.style;
            }
            return true;
          });
          filter.filterOptions.push(option);
        });

        if (findValue(item, 'eventFilterKey') === 'calendar') {


          const isTomorrow = () => {
            const tomorrow = getBelarusDateTime();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
          };


          const calendarOptionItems = [];
          const params = queryString.parse(getWindow().location ? getWindow().location.hash : '');
          if (params.times && props.movies.length > 0 && eventsFromCms) {
            const movie = props.movies.find(event => event.eventId === Number(params.times.split('-').pop()));

            if (movie) {
              if (movie.showList) {
                Object.keys(movie.showList).forEach((day) => {
                  calendarOptionItems.push(createDateView(day));
                });
              }
            } else {
              console.log('[TD] 🛑 Movie is not exists');
            }


          } else {
            // если выбран последний день, то добавляем +1 день
            let maxDays = 10;
            const diff = Math.floor(new Date(props.filters.day.date).getTime() - getBelarusDate(new Date()).getTime());
            const day = 1000 * 60 * 60 * 24;
            const days = Math.floor(diff / day);
            if (days >= 12) {
              maxDays = days + 2;
            }
            else {
              if (days > 7) {
                maxDays = days + 3;
              }
            }

            for (let i = 0; i < maxDays; i++) {
              calendarOptionItems.push(createDateView(getBelarusDateTime().getTime() + (24 * 60 * 60 * 1000 * i)));
            }
          }
          calendarOptionItems.forEach((comp, index) => {
            const option = {
              label: null,
              id: null,
              date: null,
            };
            if (!eventsFromCms) {
              const today = getBelarusDateTime();
              today.setDate(today.getDate() + index);
              option.label = `${dayOfWeek(today)}, ${comp}`;
              const date = today;
              option.date = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
            } else {
              if (props.movies && Object.keys(props.movies).length !== 0) {
                const movie = props.movies.find(event => event.eventId === Number(params.times.split('-').pop()));

                option.label = `${dayOfWeek(getBelarusDate(`${Object.keys(movie.showList)[index]}`))}, ${comp}`;
                option.date = Object.keys(movie.showList)[index];
              }
            }

            const tommorow = makeFormatForDate(isTomorrow());
            if (createDateView(tommorow) === comp) {
              option.label = `завтра, ${comp}`;
            }
            if (comp === createDateView(getBelarusDateTime())) {
              option.label = `сегодня, ${comp}`;
            }
            option.id = parseInt(comp);
            filter.filterOptions.push(option);
          });
        }

        if (findValue(item, 'eventFilterKey') === 'month') {

          const createDateView = (movieFullDate) => {
            const date = new Date(movieFullDate);
            const options = {
              month: 'long',
              timeZone: 'Europe/Minsk',
            };
            return date.toLocaleString('ru', options);
          };
          const calendarOptionItems = [];
          calendarOptionItems.push({
            label: "Все месяцы",
            id: 0,
          });
          const maxMonthFilter = 4;

          for (let i = 0; i < maxMonthFilter; i++) {
            let currentDate = getBelarusDateTime();
            currentDate.setDate(2);
            currentDate.setMonth(currentDate.getMonth() + i);
            calendarOptionItems.push({
              label: createDateView(currentDate)[0].toUpperCase() + createDateView(currentDate).slice(1),
              id: currentDate.getMonth() + 1,
            });
          }

          calendarOptionItems.forEach((comp, index) => {
            filter.filterOptions.push(comp);
          })

        }
        propsNew.filters.push(filter);
        return true;
      }

      if (item.typeName === 'newFilterContainer') {
        const filter = {
          multiple: true,
          imgLink: findValue(item, 'source'),
          placeHolder: findValue(item, 'placeHolder'),
          filterEventKey: findValue(item, 'eventFilterKey'),
          filterOptions: [],
        };
        item.childrenList.forEach((el) => {
          const optionGroup = {
            filterEventKey: findValue(el, 'eventFilterKey'),
            label: null,
            labelStyle: null,
            options: [],
          };
          el.childrenList.forEach((element) => {
            if (element.typeName === 'label') {
              optionGroup.title = findValue(element, 'value');
              optionGroup.labelStyle = element.style;
              return true;
            }
            if (element.typeName === 'checkBox') {
              optionGroup.options.push({
                label: findValue(element, 'value'),
                id: findValue(element, 'eventFilterKey'),
              });
              return true;
            }
          });
          filter.filterOptions.push(optionGroup);
        });
        propsNew.filters.push(filter);
        return true;
      }
      return true;
    });
  };

  const onChange = (key, setFilterOptions, item) => {
    if (key === 'cinema') {
      if (item.value) {
        setFilterOptions.setFilterCinema(item.label, item.value);
      } else if (item.label === 'Arena City') {
        setFilterOptions.setFilterCinema(item.label, 2);
      } else if (item.label === 'Galileo') {
        setFilterOptions.setFilterCinema(item.label, 1);
      } else if (item.label === 'VOKA cinema') {
        setFilterOptions.setFilterCinema(item.label, 3);
      } else {
        setFilterOptions.setFilterCinema(item.label, 0);
      }
      return;
    }

    if (key === 'calendar') {
      let date;
      propsNew.filters.forEach((filt) => {
        if (filt.filterEventKey === 'calendar') {
          filt.filterOptions.forEach((option) => {
            if (option.id === item.value) {
              date = option.date;
            }
          });
        }
      });
      setFilterOptions.setFilterDay(item.label, item.value, date);
      return;
    }

    if (key === 'listTimeChange') {
      let start; let end;
      propsNew.filters.forEach((filt) => {
        if (filt.filterEventKey === 'listTimeChange') {
          filt.filterOptions.forEach((option) => {
            if (option.id === item.value) {
              start = option.startTime;
              end = option.endTime;
            }
          });
        }
      });

      setFilterOptions.setFilterTime(item.label, item.value, start, end);
      return;
    }

    if (key === 'format') {
      setFilterOptions.setFilterFormat(null, item);
      return;
    }

    if (key === 'other') {
      setFilterOptions.setFilterOther(null, item);
    }
    if (key === 'month') {
      setFilterOptions.setFilterMonth(item.label, item.value);
    }
    if (key === 'category') {
      setFilterOptions.setFilterCategory(item.label, item.value);
    }
    if (key === 'isHaveShow') {
      setFilterOptions.setFilterHaveShow(item.label, item.value);
    }
  };

  const selectPlaceholder = (key, item) => {
    switch (key) {
      case 'cinema':
        return `${item.cinema.name}`;
      case 'calendar':
        return `${item.day.name}`;
      case 'listTimeChange':
        return `${item.time.name}`;
      case 'format':
        return `${item.format.name}`;
      case 'other':
        return `${item.other.name}`;
      case 'month':
        return `${item.month.name}`;
      case 'category':
        return `${item.category.name}`;
      case 'isHaveShow':
        return `${item.isHaveShow.name}`;
      default:
        return null;
    }
  };

  const selectKey = (key, item) => {
    switch (key) {
      case 'cinema':
        return item.cinema.key;
      case 'calendar':
        return item.day.key;
      case 'listTimeChange':
        return item.time.key;
      case 'format':
        return item.format.key;
      case 'other':
        return item.other.key;
      case 'month':
        return item.month.key;
      case 'category':
        return item.category.key;
      case 'isHaveShow':
        return item.isHaveShow.key;
      default:
        return null;
    }
  };

  const renderOptionGroupMultiple = (filterOptions, filters) => filterOptions.map(item => {
    return(
      <OptionGroup groupTitle={item.title} groupKey={item.filterEventKey}>
        {
          item.options.map(el => (
            <Option value={el.id} label={el.label} filters={filters} />
          ))
        }
      </OptionGroup>
    );
  });

  const renderOptionGroup = (filterOptions) => {
    const group = filterOptions.map((el, number) => (
      <Option
        value={Number(el.id)}
        label={el.label}
        description={el.description}
        defaultKey={Number(filterOptions[0].id)}
      />
    ))
    return group;
  }

  const renderFilterRow = (array, filters, setFilterOptions, props) => array.map((item, id) => {
    if (item.multiple) {
      return (
        <FilterItem rightBorder={id !== array.length - 1} number={id + 1}>
          <Picker
            multiple
            icon={item.imgLink}
            placeholder={item.placeHolder}
            onChange={e => console.log('pick')}
            open={props.open}
            toggle={props.Toggle}
            currentValue={item.filterEventKey}
          >
            {renderOptionGroupMultiple(item.filterOptions, filters)}
          </Picker>
        </FilterItem>
      );
    }

    return (
      <FilterItem rightBorder={id !== array.length - 1} number={id + 1}>
        <Picker
          icon={item.imgLink}
          placeholder={selectPlaceholder(item.filterEventKey, filters)}
          onChange={e => onChange(item.filterEventKey, setFilterOptions, e)}
          currentValue={Number(selectKey(item.filterEventKey, filters))}
          data={filters}
        >

          {item.filterOptions.length > 0
            ? (
              <OptionGroup>
                {renderOptionGroup(item.filterOptions)}
              </OptionGroup>
            )
            : (
              <OptionGroup>
                <Option value={1} label="Сегодня" />
                <Option value={2} label="Завтра" />
                <Option value={3} label="Послезавтра" />
                <Option value={4} label="Пятнадцатого никогда" />
              </OptionGroup>
            )
          }
        </Picker>
      </FilterItem>
    );
  });

  class ProviderWithState extends React.Component {
    state = {
      isLoadFilters: false,
      isMountFilters: false,
    }
    componentWillMount() {
      if (this.props.moviesStatus === 'success') {
        const isTomorrow = () => {
          const tomorrow = getBelarusDateTime();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow;
        };

        const createDateView = (movieFullDate) => {
          const date = new Date(movieFullDate);
          const options = {
            month: 'long',
            day: 'numeric',
            timeZone: 'Europe/Minsk',
          };
          return date.toLocaleString('ru', options);
        };
        if (eventsFromCms) {
          let indexChooseMountDay = 0;
          Object.keys(eventsFromCms.showList).find((dateString,index) => {
            if(this.props.filters.day.date === dateString) {
              indexChooseMountDay = index;
            }
          });

          let chooseMountDay = getBelarusDate(`${Object.keys(eventsFromCms.showList)[indexChooseMountDay]}`);


          let dayOfWeekLabel = dayOfWeek(chooseMountDay);
          if (isTomorrow().getDate() === chooseMountDay.getDate() && dayOfWeek(isTomorrow()) === dayOfWeek(chooseMountDay)) {
            dayOfWeekLabel = `завтра`;
          }
          if (getBelarusDateTime().getDate() === chooseMountDay.getDate() && dayOfWeek(getBelarusDateTime()) === dayOfWeek(chooseMountDay)) {
            dayOfWeekLabel = `сегодня`;
          }
          //if (chooseMountDay === !==)
          this.props.setFilterDay(`${dayOfWeekLabel}, ${createDateView(chooseMountDay)}`, chooseMountDay.getDate(), Object.keys(eventsFromCms.showList)[indexChooseMountDay]);
        }
        madeOptions(this.props, eventsFromCms);
        let tabFilters = [];
        propsNew.filters.forEach((option) => {
          tabFilters.push(option.filterEventKey);
          if (Object.entries(this.props.filters.cinema).length === 0 && this.props.filters.cinema.constructor === Object && option.filterEventKey === 'cinema') {
            if (option.placeHolder === null) this.props.setFilterCinema(option.filterOptions[0].label, 0);
            else this.props.setFilterCinema('Все кинотеатры, Минск', 0);
          }

          if (!eventsFromCms) {
            if (Object.entries(this.props.filters.day).length === 0 && this.props.filters.day.constructor === Object && option.filterEventKey === 'calendar') {
              const currentDate = getBelarusDateTime();
              const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;
              if (option.placeHolder === null && option.filterOptions[0])
                this.props.setFilterDay(option.filterOptions[0].label, option.filterOptions[0].id, date);
            }
          }



          if (Object.entries(this.props.filters.time).length === 0 && this.props.filters.time.constructor === Object && option.filterEventKey === 'listTimeChange') {
            if (option.placeHolder === null) this.props.setFilterTime(option.filterOptions[0].label, 0);
            else this.props.setFilterTime('Все cеансы', 0);
          }

          if (Object.entries(this.props.filters.format).length === 0 && this.props.filters.format.constructor === Object && option.filterEventKey === 'format') {
            this.props.resetFilterFormat();
          }

          if (Object.entries(this.props.filters.other).length === 0 && this.props.filters.other.constructor === Object && option.filterEventKey === 'other') {
            this.props.resetFilterOther();
          }
          if (Object.entries(this.props.filters.month).length === 0 && this.props.filters.month.constructor === Object && option.filterEventKey === 'month') {
            this.props.setFilterMonth(option.filterOptions[0].label, option.filterOptions[0].id);
          }

          if (Object.entries(this.props.filters.category).length === 0 && this.props.filters.category.constructor === Object && option.filterEventKey === 'category') {
            this.props.setFilterCategory(option.filterOptions[0].label, option.filterOptions[0].id);
          }

          if (Object.entries(this.props.filters.isHaveShow).length === 0 && this.props.filters.isHaveShow.constructor === Object && option.filterEventKey === 'isHaveShow') {
            this.props.setFilterHaveShow(option.filterOptions[0].label, option.filterOptions[0].id);
          }


        });
        this.props.setTabForFilters(tabId, tabFilters);
        this.setState({isLoadFilters: true});

      }
    }


    componentDidUpdate(prevProps) {
      // ждем пока movies загрузится (для фильтра дат)
      if (prevProps.moviesStatus === 'pending' && this.props.moviesStatus === 'success') {

        const isTomorrow = () => {
          const tomorrow = getBelarusDateTime();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow;
        };

        const createDateView = (movieFullDate) => {
          const date = new Date(movieFullDate);
          const options = {
            month: 'long',
            day: 'numeric',
            timeZone: 'Europe/Minsk',
          };
          return date.toLocaleString('ru', options);
        };

        if (eventsFromCms) {
          let chooseMountDay = Object.keys(eventsFromCms.showList).find(dateString => this.props.filters.day.date === dateString);
          if (chooseMountDay) {
            chooseMountDay = getBelarusDate(`${eventsFromCms.showList[chooseMountDay]}`);
          }
          else {
            chooseMountDay = getBelarusDate(`${Object.keys(eventsFromCms.showList)[0]}`);
          }

          let dayOfWeekLabel = dayOfWeek(chooseMountDay);
          if (isTomorrow().getDate() === chooseMountDay.getDate() && dayOfWeek(isTomorrow()) === dayOfWeek(chooseMountDay)) {
            dayOfWeekLabel = `завтра`;
          }
          if (getBelarusDateTime().getDate() === chooseMountDay.getDate() && dayOfWeek(getBelarusDateTime()) === dayOfWeek(chooseMountDay)) {
            dayOfWeekLabel = `сегодня`;
          }
          //if (chooseMountDay === !==)
          this.props.setFilterDay(`${dayOfWeekLabel}, ${createDateView(chooseMountDay)}`, chooseMountDay.getDate(), Object.keys(eventsFromCms.showList)[0]);
        }

        madeOptions(this.props, eventsFromCms);
        let tabFilters = [];
        propsNew.filters.forEach((option) => {
          tabFilters.push(option.filterEventKey);
          if (Object.entries(this.props.filters.cinema).length === 0 && this.props.filters.cinema.constructor === Object && option.filterEventKey === 'cinema') {
            if (option.placeHolder === null) this.props.setFilterCinema(option.filterOptions[0].label, 0);
            else this.props.setFilterCinema('Все кинотеатры, Минск', 0);
          }
          if (!eventsFromCms) {
            if (Object.entries(this.props.filters.day).length === 0 && this.props.filters.day.constructor === Object && option.filterEventKey === 'calendar') {
              const currentDate = getBelarusDateTime();
              const date = `${currentDate.getFullYear()}-${(`0${currentDate.getMonth() + 1}`).slice(-2)}-${(`0${currentDate.getDate()}`).slice(-2)}`;
              if (option.placeHolder === null && option.filterOptions[0])
                this.props.setFilterDay(option.filterOptions[0].label, option.filterOptions[0].id, date);
            }
          }


          if (Object.entries(this.props.filters.time).length === 0 && this.props.filters.time.constructor === Object && option.filterEventKey === 'listTimeChange') {
            if (option.placeHolder === null) this.props.setFilterTime(option.filterOptions[0].label, 0);
            else this.props.setFilterTime('Все cеансы', 0);
          }

          if (Object.entries(this.props.filters.format).length === 0 && this.props.filters.format.constructor === Object && option.filterEventKey === 'format') {
            this.props.resetFilterFormat();
          }

          if (Object.entries(this.props.filters.other).length === 0 && this.props.filters.other.constructor === Object && option.filterEventKey === 'other') {
            this.props.resetFilterOther();
          }

          if (Object.entries(this.props.filters.month).length === 0 && this.props.filters.month.constructor === Object && option.filterEventKey === 'month') {
            this.props.setFilterMonth(option.filterOptions[0].label, option.filterOptions[0].id);
          }

          if (Object.entries(this.props.filters.category).length === 0 && this.props.filters.category.constructor === Object && option.filterEventKey === 'category') {
            this.props.setFilterCategory(option.filterOptions[0].label, option.filterOptions[0].id);
          }

          if (Object.entries(this.props.filters.isHaveShow).length === 0 && this.props.filters.isHaveShow.constructor === Object && option.filterEventKey === 'isHaveShow') {
            this.props.setFilterHaveShow(option.filterOptions[0].label, option.filterOptions[0].id);
          }
        });
        this.props.setTabForFilters(tabId, tabFilters);
        this.setState({isLoadFilters: true});

      }
    }

    render() {
      const setFilterOptions = {
        setFilterCinema: this.props.setFilterCinema,
        setFilterDay: this.props.setFilterDay,
        setFilterTime: this.props.setFilterTime,
        setFilterFormat: this.props.setFilterFormat,
        setFilterOther: this.props.setFilterOther,
        setFilterMonth: this.props.setFilterMonth,
        setFilterCategory: this.props.setFilterCategory,
        setFilterHaveShow: this.props.setFilterHaveShow,
      };
      return (
        <FilterGrid
          styleId={propsNew.styleId}
          key={getBelarusDate(new Date()) + getWindow().location.hash}
          widthBlock={componentInfo.componentsDescription ? componentInfo.componentsDescription.width : ''}
        >
          {(this.state.isLoadFilters) ? renderFilterRow(propsNew.filters, this.props.filters, setFilterOptions, this.props) : ''}
        </FilterGrid>
      );
    }
  }
  const mapStateToProps = state => ({
    filters: state.filters,
    movies: state.movies,
    moviesStatus: state.moviesStatus,
  });

  const mapDispatchToProps = dispatch => ({
    setFilterCinema: (cinema, key) => dispatch(setFilterCinema(cinema, key)),
    setFilterTime: (time, key, start, end) => dispatch(setFilterTime(time, key, start, end)),
    setFilterFormat: (format, key, video, audio) => dispatch(setFilterFormat(format, key, video, audio)),
    setFilterOther: (other, key) => dispatch(setFilterOther(other, key)),
    resetFilterFormat: () => dispatch(setFilterFormat()),
    setFilterDay: (day, key, date) => dispatch(setFilterDay(day, key, date)),
    resetFilterOther: () => dispatch(setFilterOther()),
    setFilterMonth: (month, key) => dispatch(setFilterMonth(month, Number(key))),
    setFilterCategory: (category, key) => dispatch(setFilterCategory(category, Number(key))),
    setFilterHaveShow: (status, key) => dispatch(setFilterHaveShow(status, Number(key))),
    setTabForFilters: (tabId, filtersName) => dispatch(setTabForFilters(tabId, filtersName)),
  });

  const ConnectedProvider = connect(mapStateToProps, mapDispatchToProps)(ProviderWithState);

  return (<ConnectedProvider />);
}
