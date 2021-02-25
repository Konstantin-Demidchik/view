import * as actionsTypes from './actionsTypes';

const profileUpdateLoading = status => ({
  type: actionsTypes.PROFILE_UPDATE_LOADING,
  status,
});

const profileUpdateEmailLoading = status => ({
  type: actionsTypes.PROFILE_UPDATE_EMAIL_LOADING,
  status,
});

const profileUpdateSubscriptionLoading = status => ({
  type: actionsTypes.PROFILE_UPDATE_SUBSCRIPTION_LOADING,
  status,
});

const profileUpdatePasswordLoading = status => ({
  type: actionsTypes.PROFILE_UPDATE_PASSWORD_LOADING,
  status,
});

export {
  profileUpdateLoading,
  profileUpdateEmailLoading,
  profileUpdateSubscriptionLoading,
  profileUpdatePasswordLoading,
};