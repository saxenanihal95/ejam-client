import {
  DeploymentState,
  DeploymentActionTypes,
  DEPLOYMENT_LIST_LOADING,
  SET_DEPLOYMENT_LIST,
  ADD_DEPLOYMENT_LOADING,
  SET_ADD_DEPLOYMENT_MODAL_VISIBLE,
  DELETE_DEPLOYMENT_LOADING,
} from "./types";

const initialState: DeploymentState = {
  deploymentList: [],
  deploymentListLoading: true,
  addDeploymentLoading: false,
  showAddDeploymentModal: false,
  deleteDeploymentLoading: {},
};

export default function (state = initialState, action: DeploymentActionTypes) {
  switch (action.type) {
    case DEPLOYMENT_LIST_LOADING:
      return { ...state, ...{ deploymentListLoading: action.payload } };
    case SET_DEPLOYMENT_LIST:
      return { ...state, ...{ deploymentList: action.payload } };
    case ADD_DEPLOYMENT_LOADING:
      return { ...state, ...{ addDeploymentLoading: action.payload } };
    case SET_ADD_DEPLOYMENT_MODAL_VISIBLE:
      return { ...state, ...{ showAddDeploymentModal: action.payload } };
    case DELETE_DEPLOYMENT_LOADING: {
      const { deleteDeploymentLoading } = state;
      let updatedDelete = {
        ...deleteDeploymentLoading,
        [action.payload]: !initialState.deleteDeploymentLoading[action.payload],
      };
      return { ...state, ...{ deleteDeploymentLoading: updatedDelete } };
    }
    default:
      return state;
  }
}
