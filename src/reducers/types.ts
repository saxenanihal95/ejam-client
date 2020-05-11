interface IVersion {
  _id: number;
  name: String;
}

interface IDeployment {
  _id: number;
  url: String;
  templateName: {
    type: String;
    unique: true;
    required: true;
    dropDups: true;
  };
  versions: Array<IVersion>;
  deployedAt: Date;
}

export const SET_DEPLOYMENT_LIST = "SET_DEPLOYMENT_LIST";
export const DEPLOYMENT_LIST_LOADING = "DEPLOYMENT_LIST_LOADING";
export const ADD_DEPLOYMENT_LOADING = "ADD_DEPLOYMENT_LOADING";
export const SET_ADD_DEPLOYMENT_MODAL_VISIBLE =
  "SET_ADD_DEPLOYMENT_MODAL_VISIBLE";
export const DELETE_DEPLOYMENT_LOADING = "DELETE_DEPLOYMENT_LOADING";

export interface DeploymentState {
  deploymentList: Array<IDeployment>;
  deploymentListLoading: boolean;
  addDeploymentLoading: boolean;
  showAddDeploymentModal: boolean;
  deleteDeploymentLoading: { [key: string]: boolean };
}

interface GetDeploymentAction {
  type: typeof SET_DEPLOYMENT_LIST;
  payload: IDeployment;
}

interface GetDeploymentLoadingAction {
  type: typeof DEPLOYMENT_LIST_LOADING;
  payload: boolean;
}

interface AddDeploymentLoadingAction {
  type: typeof ADD_DEPLOYMENT_LOADING;
  payload: boolean;
}

interface SetDeploymentModalVisibleAction {
  type: typeof SET_ADD_DEPLOYMENT_MODAL_VISIBLE;
  payload: boolean;
}

interface DeleteDeploymentLoadingAction {
  type: typeof DELETE_DEPLOYMENT_LOADING;
  payload: number;
}

export type DeploymentActionTypes =
  | GetDeploymentAction
  | GetDeploymentLoadingAction
  | AddDeploymentLoadingAction
  | SetDeploymentModalVisibleAction
  | DeleteDeploymentLoadingAction;

export interface RootState {
  deployments: DeploymentState;
}
