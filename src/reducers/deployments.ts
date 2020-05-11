import {
  DeploymentState,
  DeploymentActionTypes,
  DEPLOYMENT_LIST_LOADING,
  SET_DEPLOYMENT_LIST,
} from "./types";

const initialState: DeploymentState = {
  deploymentList: [],
  deploymentListLoading: true,
};

export default function (state = initialState, action: DeploymentActionTypes) {
  switch (action.type) {
    case DEPLOYMENT_LIST_LOADING:
      return { ...state, ...{ deploymentListLoading: action.payload } };
    case SET_DEPLOYMENT_LIST:
      return { ...state, ...{ deploymentList: action.payload } };
    default:
      return state;
  }
}
