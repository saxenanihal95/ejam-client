interface IVersion {
  name: String;
}

interface IDeployment {
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

export interface DeploymentState {
  deploymentList: Array<IDeployment>;
  deploymentListLoading: boolean;
}

interface GetDeploymentAction {
  type: typeof SET_DEPLOYMENT_LIST;
  payload: IDeployment;
}

interface GetDeploymentLoadingAciton {
  type: typeof DEPLOYMENT_LIST_LOADING;
  payload: boolean;
}

export type DeploymentActionTypes =
  | GetDeploymentAction
  | GetDeploymentLoadingAciton;

export interface RootState {
  deployments: DeploymentState;
}
