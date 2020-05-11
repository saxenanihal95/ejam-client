import {
  DEPLOYMENT_LIST_LOADING,
  SET_DEPLOYMENT_LIST,
  ADD_DEPLOYMENT_LOADING,
  SET_ADD_DEPLOYMENT_MODAL_VISIBLE,
  DELETE_DEPLOYMENT_LOADING,
} from "../reducers/types";
import { openNotificationWithIcon } from "../utils/helpers";
import axios from "axios";
import { DEPLOYMENT_URL } from "../utils/constants";

export const deploymentListLoading = (loading) => ({
  type: DEPLOYMENT_LIST_LOADING,
  payload: loading,
});

export const setDeploymentList = (deploymentList) => ({
  type: SET_DEPLOYMENT_LIST,
  payload: deploymentList,
});

export const addDeploymentLoading = (loading) => ({
  type: ADD_DEPLOYMENT_LOADING,
  payload: loading,
});

export const setAddDeploymentModalVisible = (visible) => ({
  type: SET_ADD_DEPLOYMENT_MODAL_VISIBLE,
  payload: visible,
});

export const deleteDeploymentLoading = (loading) => ({
  type: DELETE_DEPLOYMENT_LOADING,
  payload: loading,
});

export const callGetDeploymenListApi = () => async (dispatch) => {
  try {
    const res = await fetch(DEPLOYMENT_URL);
    const jsonRes = await res.json();
    dispatch(setDeploymentList(jsonRes));
    dispatch(deploymentListLoading(false));
  } catch (error) {
    dispatch(deploymentListLoading(false));
  }
};

export const callAddDeploymentApi = (body) => async (dispatch) => {
  try {
    dispatch(addDeploymentLoading(true));
    const res = await axios.post(DEPLOYMENT_URL, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    dispatch(callGetDeploymenListApi());
    dispatch(addDeploymentLoading(false));
    dispatch(setAddDeploymentModalVisible(false));
    openNotificationWithIcon("success", res.data.message);
  } catch (error) {
    const {
      response: {
        data: { message },
      },
    } = error;

    dispatch(addDeploymentLoading(false));
    dispatch(setAddDeploymentModalVisible(false));
    openNotificationWithIcon("error", message);
  }
};

export const callDeleteDeploymentApi = (body) => async (dispatch) => {
  try {
    debugger;
    dispatch(deleteDeploymentLoading(body.versionId + body.deploymentId));

    const res = await axios.put(DEPLOYMENT_URL, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    dispatch(callGetDeploymenListApi());
    dispatch(deleteDeploymentLoading(body.versionId + body.deploymentId));
    openNotificationWithIcon("success", res.data.message);
  } catch (error) {
    const {
      response: {
        data: { message },
      },
    } = error;

    dispatch(deleteDeploymentLoading(body.versionId + body.deploymentId));
    openNotificationWithIcon("error", message);
  }
};
