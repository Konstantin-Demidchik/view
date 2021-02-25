import EmailSubscriptionBoxProvider from './EmailSubscriptionBoxProvider';
import HomeSliderProvider from './HomeSliderProvider';
import SectionProvider from './SectionProvider';
import GlassesContentProvider from './GlassesContentProvider';
import FullFilmInfoContainerProvider from './FullFilmInfoContainerProvider';
import MapInfoProvider from './MapInfoProvider';
import CinemaHeaderProvider from './CinemaHeaderProvider';
import NavigationMainProvider from './NavigationMainProvider';
import FooterProvider from './FooterProvider';
import NewsSectionProvider from './NewsSectionProvider';
import HeaderProvider from './HeaderProvider';
import AtmosphereInfoBlockProvider from './AtmosphereInfoBlockProvider';
import CinemaPropertyContainerProvider from './CinemaPropertyContainerProvider';
import InfoPatternSliderProvider from './InfoPatternSliderProvider';
import CinemaAdvantagesProvider from './CinemaAdvantagesProvider';
import LabelProvider from './LabelProvider';
import BannerItemProvider from './BannerItemProvider';
import PopInfoBlockProvider from './PopInfoBlockProvider';
import CareerInfoContainerProvider from './CareerInfoContainerProvider';
import RccAdvInfoProvider from './RccAdvInfoProvider';
import NewManInfoProvider from './NewManInfoProvider';
import TableProvider from './TableProvider';
import DoublePatternInfoProvider from './DoublePatternInfoProvider';
import RccAdvContainerProvider from './RccAdvContainerProvider';
import { RCCStartTableProvider, RCCClubTableProvider } from './RCCTableProvider';
import IframeProvider from './IframeProvider';
import CinemaAdvantagesHeaderProvider from './CinemaAdvantagesHeaderProvider';
import VacanciesAccordeonProvider from './VacanciesAccordeonProvider';
import TitleContainerProvider from './TitleContainerProvider';
import CinemaContactsProvider from './CinemaContactsProvider';
import RentHallContainerProvider from './RentHallContainerProvider';
import InfoBlockProvider from './InfoBlockProvider';
import GiftCardsInfoContainerProvider from './GiftCardsInfoContainerProvider';
import TextProvider from './TextProvider';
import PatternInfoGiftCardsProvider from './PatternInfoGiftCardsProvider';
import InfoFoodWithMenuProvider from './InfoFoodWithMenuProvider';
import EventShowContainerProvider from './EventShowContainerProvider';
import MovieRollerProvider from './MovieRollerProvider';
import DivProvider from './DivProvider';
import InfoFoodItemProvider from './InfoFoodItemProvider';
import FilterContainerProvider from './FilterContainerProvider';
import NewsContainerProvider from './NewsContainerProvider';
import PhotoGalleryContainerProvider from './PhotoGalleryContainerProvider';
import DescriptionProvider from './DescriptionProvider';
import ImageProvider from './ImageProvider';
import SecondNewsSectionProvider from './SecondNewsSectionProvider';
import LabelButtonContainerProvider from './LabelButtonContainerProvider';
import RulesContainerProvider from './RulesContainerProvider';
import LabelContainerProvider from './LabelContainerProvider';
import FilmContainerProvider from './FilmContainerProvider';
import TabNavProvider from './TabNavProvider';
import ResponsiveWrapperProvider from './ResponsiveWrapperProvider';
import ButtonImageProvider from './ButtonImageProvider';
import ButtonModalRenthallProvider from './ButtonModalRenthallProvider';
import ButtonModalProvider from './ButtonModalProvider';
import SearchProvider from './SearchProvider';
import ButtonProvider from './ButtonProvider';
import GuideProvider from './GuideProvider';
import GuideContainerProvider from './GuideContainerProvider';
import GuideContainerItemProvider from './GuideContainerItemProvider';
import ProfileProvider from './ProfileItemProvider';
import TabsHeaderAfishaProvider from './TabsHeaderAfishaProvider';
import AccordionProvider from './AccordionProvider';
import ModalPageProvider from './ModalPageProvider';
import EventShowFullInformationContainerProvider from './EventShowFullInformationContainerProvider';
import PaymentContainerProvider from './PaymentContainerProvider';
import PaymentFinalInfoBlockProvider from './PaymentFinalInfoBlockProvider';
import AsideProvider from './AsideProvider';
import AuditoriumInfoContainerProvider from './AuditoriumInfoContainerProvider';
import PaymentFinalInfoBlockOrderProvider from './PaymentFinalInfoBlockOrderProvider';
import OrderListProvider from './OrderListProvider';
import AsideOrderProvider from './AsideOrderProvider';
import FloatButtonProvider from './FloatButtonProvider';
import {
  PromoLandingBannerProvider,
  PromoLandingBigTextProvider,
  PromoLandingTextProvider,
  PromoLandingVideoProvider,
  PromoLandingAdvantagesProvider,
  PromoLandingFooterProvider,
  PromoLandingFloatPanelProvider,
} from './PromoLanding';

import {
  TsnBannerProvider,
  TsnSliderProvider,
  TsnRolesProvider,
  TsnActorsProvider,
  TsnInfoProvider,
  TsnRedactorsProvider,
  TsnTabContainerProvider,
  TsnTabItemContent,
} from './TtshnLanding';

import {
  DolbyAtmosMainProvider,
  DolbyAtmosAdvantagesProvider,
  DolbyAtmosAfishaProvider,
  DolbyAtmosInfoBlockProvider,
  DolbyAtmosFooterProvider,
  DolbyAtmosDescriptionProvider,
} from './DolbyAtmosLanding';

export const providerByComponentTitle = (title) => {
  switch (title) {
    case 'header':
      return HeaderProvider;
    case 'footer':
      return FooterProvider;
    case 'mailer':
      return EmailSubscriptionBoxProvider;
    case 'cinemaPropertyContainer':
      return CinemaPropertyContainerProvider;
    case 'bannerContainer':
      return HomeSliderProvider;
    case 'personalGlassesMainSection':
      return GlassesContentProvider;
    case 'fullFilmInfoContainer':
      return FullFilmInfoContainerProvider;
    case 'googleMap':
      return MapInfoProvider;
    case 'cinemaPreview':
      return CinemaHeaderProvider;
    case 'helpLinkBlock':
      return NavigationMainProvider;
    case 'patternInfo':
      return NewsSectionProvider;
    case 'atmosphereInfoBlock':
      return AtmosphereInfoBlockProvider;
    case 'infoPatternSlider':
      return InfoPatternSliderProvider;
    case 'label':
      return LabelProvider;
    case 'bannerItem':
      return BannerItemProvider;
    case 'popInfoBlock':
      return PopInfoBlockProvider;
    case 'careerInfoContainer':
      return CareerInfoContainerProvider;
    case 'rccAdvInfo':
      return RccAdvInfoProvider;
    case 'newManInfo':
      return NewManInfoProvider;
    case 'table':
      return TableProvider;
    case 'doublePatternInfo':
      return DoublePatternInfoProvider;
    case 'section':
      return SectionProvider;
    case 'rccAdvContainer':
      return RccAdvContainerProvider;
    case 'rccStartTable':
      return RCCStartTableProvider;
    case 'rccClubTable':
      return RCCClubTableProvider;
    case 'iframe':
      return IframeProvider;
    case 'advantagesinfoBlock':
      return CinemaAdvantagesProvider;
    case 'filterHeader':
      return CinemaAdvantagesHeaderProvider;
    case 'accordeon':
      return VacanciesAccordeonProvider;
    case 'titleContainer':
      return TitleContainerProvider;
    case 'labelContainer':
      return LabelContainerProvider;
    case 'guideContainer':
      return GuideContainerProvider;
    case 'guideContainerItem':
      return GuideContainerItemProvider;
    case 'cinemaContacts':
      return CinemaContactsProvider;
    case 'renthallContainer':
      return RentHallContainerProvider;
    case 'infoBlock':
      return InfoBlockProvider;
    case 'infoFoodWithMenu':
      return InfoFoodWithMenuProvider;
    case 'div':
      return DivProvider;
    case 'infoFoodItem':
      return InfoFoodItemProvider;
    case 'filtersContainer':
      return FilterContainerProvider;
    case 'newsContainer':
      return NewsContainerProvider;
    case 'photoGaleryContainer':
      return PhotoGalleryContainerProvider;
    case 'description':
      return DescriptionProvider;
    case 'image':
      return ImageProvider;
    case 'secondPatternInfo':
      return SecondNewsSectionProvider;
    case 'LabelButtonContainer':
      return LabelButtonContainerProvider;
    case 'rulesContainer':
      return RulesContainerProvider;
    case 'responsiveWrapper':
      return ResponsiveWrapperProvider;
    case 'buttonImage':
      return ButtonImageProvider;
    case 'buttonModalRenthall':
      return ButtonModalRenthallProvider;
    case 'buttonModalVacancy':
      return ButtonModalProvider;
    case 'searchPage':
      return SearchProvider;
    case 'button':
      return ButtonProvider;
    case 'guide':
      return GuideProvider;
    case 'profilePage':
      return ProfileProvider;
    case 'eventShowContainer':
      return EventShowContainerProvider;
    case 'tabsHeader':
      return TabsHeaderAfishaProvider;
    case 'coveredContent':
      return AccordionProvider;
    case 'modalPage':
      return ModalPageProvider;
    case 'paymentContainer':
      return PaymentContainerProvider;
    case 'eventShowFullInformationContainer':
      return EventShowFullInformationContainerProvider;
    case 'paymentFinalInfoBlock':
      return PaymentFinalInfoBlockProvider;
    case 'aside':
      return AsideProvider;
    case 'auditoriumInfoContainer':
      return AuditoriumInfoContainerProvider;
    case 'paymentFinalInfoBlockOrder':
      return PaymentFinalInfoBlockOrderProvider;
    case 'orderList':
      return OrderListProvider;
    case 'asideOrder':
      return AsideOrderProvider;
    case 'rccTableCell':
      return FloatButtonProvider;
    case 'PromoLandingBanner':
      return PromoLandingBannerProvider;
    case 'PromoLandingBigText':
      return PromoLandingBigTextProvider;
    case 'PromoLandingText':
      return PromoLandingTextProvider;
    case 'PromoLandingVideo':
      return PromoLandingVideoProvider;
    case 'PromoLandingAdvantages':
      return PromoLandingAdvantagesProvider;
    case 'PromoLandingFooter':
      return PromoLandingFooterProvider;
    case 'PromoLandingFloatPanel':
      return PromoLandingFloatPanelProvider;
    case 'TsnBanner':
      return TsnBannerProvider;
    case 'TsnSlider':
      return TsnSliderProvider;
    case 'TsnRolesBlock':
      return TsnRolesProvider;
    case 'TsnActorsBlock':
      return TsnActorsProvider;
    case 'TsnInfoBlock':
      return TsnInfoProvider;
    case 'TsnRedactorsBlock':
      return TsnRedactorsProvider;
    case 'tabContainer':
      return TsnTabContainerProvider;
    case 'technologyMain':
      return DolbyAtmosMainProvider;
    case 'technologyAdvantages':
      return DolbyAtmosAdvantagesProvider;
    case 'technologyAfisha':
      return DolbyAtmosAfishaProvider;
    case 'technologyDescription':
      return DolbyAtmosInfoBlockProvider;
    case 'technologyFooter':
      return DolbyAtmosFooterProvider;
    case 'techologyInfo':
      return DolbyAtmosDescriptionProvider;
    case 'tabItemChildren':
      return TsnTabItemContent;
    default:
      return () => null;
  }
};

export {
  AsideProvider,
  AuditoriumInfoContainerProvider,
  EmailSubscriptionBoxProvider,
  HomeSliderProvider,
  GlassesContentProvider,
  SectionProvider,
  FullFilmInfoContainerProvider,
  MapInfoProvider,
  HeaderProvider,
  CinemaHeaderProvider,
  NavigationMainProvider,
  FooterProvider,
  NewsSectionProvider,
  AtmosphereInfoBlockProvider,
  CinemaPropertyContainerProvider,
  InfoPatternSliderProvider,
  CinemaAdvantagesProvider,
  LabelProvider,
  BannerItemProvider,
  PopInfoBlockProvider,
  CareerInfoContainerProvider,
  RccAdvInfoProvider,
  NewManInfoProvider,
  TableProvider,
  DoublePatternInfoProvider,
  RccAdvContainerProvider,
  RCCStartTableProvider,
  IframeProvider,
  CinemaAdvantagesHeaderProvider,
  VacanciesAccordeonProvider,
  TitleContainerProvider,
  CinemaContactsProvider,
  RentHallContainerProvider,
  InfoBlockProvider,
  GiftCardsInfoContainerProvider,
  TextProvider,
  PatternInfoGiftCardsProvider,
  InfoFoodWithMenuProvider,
  RCCClubTableProvider,
  EventShowContainerProvider,
  MovieRollerProvider,
  DivProvider,
  InfoFoodItemProvider,
  FilterContainerProvider,
  NewsContainerProvider,
  PhotoGalleryContainerProvider,
  DescriptionProvider,
  ImageProvider,
  SecondNewsSectionProvider,
  LabelButtonContainerProvider,
  RulesContainerProvider,
  LabelContainerProvider,
  FilmContainerProvider,
  TabNavProvider,
  ResponsiveWrapperProvider,
  ButtonImageProvider,
  ButtonModalRenthallProvider,
  ButtonModalProvider,
  ButtonProvider,
  GuideProvider,
  ModalPageProvider,
  GuideContainerProvider,
  GuideContainerItemProvider,
  ProfileProvider,
  TabsHeaderAfishaProvider,
  AccordionProvider,
  PaymentContainerProvider,
  EventShowFullInformationContainerProvider,
  PaymentFinalInfoBlockProvider,
  FloatButtonProvider,
  PromoLandingBannerProvider,
};
