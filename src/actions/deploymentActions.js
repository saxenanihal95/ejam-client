import {
  DEPLOYMENT_LIST_LOADING,
  SET_DEPLOYMENT_LIST,
} from "../reducers/types";

export const deploymentListLoading = (loading) => ({
  type: DEPLOYMENT_LIST_LOADING,
  payload: loading,
});

export const setDeploymentList = (deploymentList) => ({
  type: SET_DEPLOYMENT_LIST,
  payload: deploymentList,
});

export const callGetDeploymenListApi = () => async (dispatch, getState) => {
  try {
    const res = await fetch("/deployment");
    const jsonRes = await res.json();
    dispatch(setDeploymentList(jsonRes));
    dispatch(deploymentListLoading(false));
  } catch (error) {
    dispatch(deploymentListLoading(false));
  }
};
