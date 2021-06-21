import { coachProgressApi } from "@/api";

export const state = () => ({
  pages: {
    profile: {
      progress: 0
    },
    package: {
      progress: 0
    },
    imageAndVideo: {
      progress: 0
    },
    geography: {
      progress: 0
    },
    availability: {
      progress: 0
    },
    review: {
      progress: 0
    }
  }
});

export const getters = {
  getProfileProgress(state) {
    return state.pages.profile.progress;
  },
  getPackageProgress(state) {
    return state.pages.package.progress;
  },
  getImageAndVideoProgress(state) {
    return state.pages.imageAndVideo.progress;
  },
  getGeographyProgress(state) {
    return state.pages.geography.progress;
  },
  getAvailabilityProgress(state) {
    return state.pages.availability.progress;
  },
  getReviewProgress(state) {
    return state.pages.review.progress;
  }
};

export const mutations = {
  SET_PROFILE_PROGRESS(state, progress) {
    state.pages.profile.progress = progress;
  },
  SET_PACKAGE_PROGRESS(state, progress) {
    state.pages.package.progress = progress;
  },
  SET_IMAGE_VIDEO_PROGRESS(state, progress) {
    state.pages.imageAndVideo.progress = progress;
  },
  SET_GEOGRAPHY_PROGRESS(state, progress) {
    state.pages.geography.progress = progress;
  },
  SET_AVAILABILITY_PROGRESS(state, progress) {
    state.pages.availability.progress = progress;
  },
  SET_REVIEW_PROGRESS(state, progress) {
    state.pages.review.progress = progress;
  }
};

export const actions = {
  setProfileProgress(context, progress) {
    context.commit("SET_PROFILE_PROGRESS", progress);
  },
  setPackageProgress(context, progress) {
    context.commit("SET_PACKAGE_PROGRESS", progress);
  },
  setImageAndVideoProgress(context, progress) {
    context.commit("SET_IMAGE_VIDEO_PROGRESS", progress);
  },
  setGeographyProgress(context, progress) {
    context.commit("SET_GEOGRAPHY_PROGRESS", progress);
  },
  setAvailabilityProgress(context, progress) {
    context.commit("SET_AVAILABILITY_PROGRESS", progress);
  },
  setReviewProgress(context, progress) {
    context.commit("SET_REVIEW_PROGRESS", progress);
  },
  async refresh({ commit }) {
    const { data } = await coachProgressApi(this.$axios).getProgressStatus();
    if (data.progress) {
      const {
        profile,
        package: packageProgress,
        imageAndVideo,
        geography,
        availability,
        review
      } = data.progress;
      commit("SET_PROFILE_PROGRESS", profile);
      commit("SET_PACKAGE_PROGRESS", packageProgress);
      commit("SET_IMAGE_VIDEO_PROGRESS", imageAndVideo);
      commit("SET_GEOGRAPHY_PROGRESS", geography);
      commit("SET_AVAILABILITY_PROGRESS", availability);
      commit("SET_REVIEW_PROGRESS", review);
    }

    let user = Object.assign(
      { ...this.$auth.user },
      {
        is_active: data.isActive
      }
    );

    this.$auth.setUser(user);
  }
};
