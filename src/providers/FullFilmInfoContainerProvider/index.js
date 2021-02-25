import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Text, Button } from '../../components';
import { formatDate } from '../../core/functions/datetime';
import getHistory from '../../core/functions/global-history';
import { getWindow } from '../../core/functions/browser';

import { setReturnPathFromAfisha } from '../../store/actions';

import {
  MovieContentWrapper,
  MovieContent,
  MovieContentText,
  MovieContentGrid,
  MovieContentAside,
  MovieCardWrapper,
  MovieContentDescription,
  MovieInfoContainer,
  MovieContentTitle,
  MovieInfoItemContainer,
  MovieInfoItemIcon,
  MovieInfoItemText,
  MovieItemSmallText,
  MovieTrailerWrapper,
  MovieTrailerVideo,
  MovieShortInfoWrapper,
  MovieNotesWrapper,
  MovieNotesGrid,
  MovieNotesCol,
  MovieShowWrapper,
  MovieShowContainer,
  MovieShowImageWrapper,
  MovieShowImage,
  MovieShowContentWrapper,
  MovieShowTitle,
  MovieShowInfo,
  MovieShowButtonGrid,
  ListContent,
  MovieShowInfoItem,
  IconDate,
} from '../../pages/MovieFullPage/MovieFullPageStyles';

const renderTrailer = link => (
  <iframe title="trailer" src={link && link.replace(/watch\?v=/, 'embed/')} allow="autoplay; encrypted-media" allowFullScreen="" />
);

const getRootChildren = component => component.childrenList.reduce((obj, item) => {
  const newObj = { ...obj };
  newObj[item.typeName] = item;
  return newObj;
}, {});

const getChildren = component => component.childrenList.map(item => ({
  style: item.style,
  childrenList: item.childrenList,
  ...item.componentsDescription,
}));

const renderShortInfo = dotList => getChildren(dotList).map((item) => {
  const [
    label = {},
    content = {},
  ] = getChildren(item);

  return (
    <li>
      <ListContent className="rowStart" styleId={label.style}>
        {label.value}
      </ListContent>
      <ListContent className="rowRuler" />
      <ListContent className="rowEnd" styleId={content.style}>{content.value}</ListContent>
    </li>
  );
});

const date = new Date();

function FullFilmInfoProviderView(props) {
  const {
    shortFilmInfoBlock = {},
    label: movieLabel = {},
    description: movieDescription = {},
    image: movieImage = {},
    dotList = {},
    video: movieVideo = {},
    labelContainer = {},
    filmInfo = {},
  } = getRootChildren(props.componentInfo);

  const [
    datesItem = {},
    ageItem = {},
  ] = getChildren(shortFilmInfoBlock);

  const [
    datesImage = {},
    startLabel = {},
    endLabel = {},
  ] = getChildren(datesItem);

  const [
    ageImage = {},
    ageStyle = {},
    ageLabel = {},
  ] = getChildren(ageItem);

  const movieNotes = getChildren(labelContainer);

  const [
    filmImage = {},
    filmTitle = {},
    filmAddInfo = {},
    filmButton = {},
  ] = getChildren(filmInfo);

  const [
    descriptionDeners = {},
    descriptionAgeLimit = {},
    descriptionRunTime = {},
  ] = getChildren(filmAddInfo);

  return (
    <MovieContentWrapper>
      <MovieContent>
        <MovieContentGrid>
          <MovieContentText>
            <MovieInfoContainer styleId={shortFilmInfoBlock.style}>
              <MovieInfoItemContainer styleId={datesItem.style}>
                <MovieInfoItemIcon styleId={datesImage.style}>
                  <IconDate>
                    <Text>{date.getDate()}</Text>
                  </IconDate>
                  <svg width="32" height="32" fill="currentColor">
                    <image xlinkHref={datesImage.source} width="32" height="32" />
                  </svg>
                </MovieInfoItemIcon>
                <MovieInfoItemText>
                  <Text h3 styleId={startLabel.style}>
                    {`с ${formatDate(startLabel.value, 'dd F')}`}
                  </Text>
                  <MovieItemSmallText styleId={endLabel.style}>
                    по {+formatDate(endLabel.value, 'dd')} {formatDate(endLabel.value, 'F')}
                  </MovieItemSmallText>
                </MovieInfoItemText>
              </MovieInfoItemContainer>
              <MovieInfoItemContainer styleId={ageItem.style}>
                <MovieInfoItemIcon styleId={ageImage.style}>
                  <svg width="32" height="32" fill="currentColor">
                    <image xlinkHref={ageImage.source} width="32" height="32" />
                  </svg>
                </MovieInfoItemIcon>
                <MovieInfoItemText>
                  <Text h3 styleId={ageStyle.style}>
                    {ageStyle.value}
                  </Text>
                  <MovieItemSmallText styleId={ageLabel.style} age>
                    Возраст зрителей
                  </MovieItemSmallText>
                </MovieInfoItemText>
              </MovieInfoItemContainer>
            </MovieInfoContainer>
            <MovieContentTitle>
              <Text h2 styleId={movieLabel.style}>
                {movieLabel.componentsDescription.value}
              </Text>
            </MovieContentTitle>
            <MovieContentDescription>
              <Text styleId={movieDescription.style}>
                {movieDescription.componentsDescription.value}
              </Text>
            </MovieContentDescription>
            <MovieShortInfoWrapper styleId={dotList.styleId}>
              <ul>
                {renderShortInfo(dotList)}
              </ul>
            </MovieShortInfoWrapper>
          </MovieContentText>
          <MovieContentAside>
            <MovieCardWrapper styleId={movieImage.style}>
              <img src={movieImage.componentsDescription.source} />
            </MovieCardWrapper>
          </MovieContentAside>
        </MovieContentGrid>
        <React.Fragment>
          <MovieTrailerWrapper>
            <MovieTrailerVideo styleId={movieVideo.style} video={movieVideo.componentsDescription.source}>
              {renderTrailer(movieVideo.componentsDescription.source)}
            </MovieTrailerVideo>
          </MovieTrailerWrapper>
          <MovieNotesWrapper styleId={labelContainer.style}>
            <MovieNotesGrid>
              {movieNotes.map(note => (
                <MovieNotesCol styleId={note.style}>
                  <div dangerouslySetInnerHTML={{ __html: note.value }} />
                </MovieNotesCol>
              ))}
            </MovieNotesGrid>
          </MovieNotesWrapper>
        </React.Fragment>
        <MovieShowWrapper>
          <MovieShowContainer>
            <MovieShowImageWrapper>
              <MovieShowImage
                styleId={filmImage.style}
                poster={filmImage.source}
              />
            </MovieShowImageWrapper>
            <MovieShowContentWrapper>
              <MovieShowTitle>
                <Text h2 styleId={filmTitle.style}>
                  {filmTitle.value}
                </Text>
              </MovieShowTitle>
              <MovieShowInfo>
                <MovieShowInfoItem styleId={descriptionDeners.style}>
                  {descriptionDeners.value}
                </MovieShowInfoItem>
                <MovieShowInfoItem styleId={descriptionAgeLimit.style}>
                  &nbsp;&nbsp;/&nbsp;&nbsp;{descriptionAgeLimit.value}
                </MovieShowInfoItem>
                <MovieShowInfoItem styleId={descriptionRunTime.style}>
                  &nbsp;&nbsp;/&nbsp;&nbsp;{descriptionRunTime.value}
                </MovieShowInfoItem>
              </MovieShowInfo>
              {props.moviesList.length > 0 ? props.moviesList.map((item) => {
                if (item.eventId === parseInt(getWindow().location.pathname.split('-').pop())) {
                  if (item.showList !== null) {
                    const result = Object.keys(item.showList).map(key => item.showList[key]);
                    if (result.length > 0) {
                      return (
                        <MovieShowButtonGrid>
                          <Button
                            styleId={filmButton.style}
                            onClick={() => {
                              // [KOSTYL]
                              props.setReturnPathFromAfisha(getWindow().location.pathname);
                              if (filmButton.link.indexOf('/afisha') === -1) {
                                getHistory().push(`/afisha/#times=${filmButton.link}`);
                              } else {
                                getHistory().push(`/afisha/#times=${filmButton.link.split('/')[2]}`);
                              }
                            }}
                          >
                            {filmButton.value}
                          </Button>
                        </MovieShowButtonGrid>
                      );
                    }
                  }
                }
              }) : ''}
            </MovieShowContentWrapper>
          </MovieShowContainer>
        </MovieShowWrapper>
      </MovieContent>
    </MovieContentWrapper>
  );
}

export default function (componentInfo) {
  const mapStateToProps = state => ({
    moviesList: state.movies,
  });

  const mapDispatchToProps = dispatch => ({
    setReturnPathFromAfisha: (path) => dispatch(setReturnPathFromAfisha(path)),
  });

  const FullFilmInfoProviderContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(FullFilmInfoProviderView);

  return <FullFilmInfoProviderContainer componentInfo={componentInfo} />;
}
