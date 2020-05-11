import React, { useEffect, useState } from "react";
import { List, PageHeader, Timeline, Button, Modal, Spin } from "antd";
import "./App.css";
import {
  callGetDeploymenListApi,
  setAddDeploymentModalVisible,
  callDeleteDeploymentApi,
} from "./actions/deploymentActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/types";
import AddDeploymentModal from "./components/AddDeploymentModal";
import { DeleteOutlined } from "@ant-design/icons";
import Axios from "axios";
import { DEPLOYMENT_URL } from "./utils/constants";

function App() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const deployments = useSelector((state: RootState) => state.deployments);
  useEffect(() => {
    dispatch(callGetDeploymenListApi());
  }, [dispatch]);

  const {
    deploymentList,
    deploymentListLoading,
    showAddDeploymentModal,
    deleteDeploymentLoading,
  } = deployments;

  const showModal = () => dispatch(setAddDeploymentModalVisible(true));

  const hideModal = () => dispatch(setAddDeploymentModalVisible(false));

  return (
    <div className="App">
      <AddDeploymentModal
        hideModal={hideModal}
        visible={showAddDeploymentModal}
      />
      <PageHeader
        title="Deployments"
        backIcon={false}
        className="Header"
        ghost={false}
        extra={[
          <Button key="1" type="primary" onClick={showModal}>
            Add Deployment
          </Button>,
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={deploymentList}
          loading={deploymentListLoading}
          renderItem={(item) => (
            <List.Item>
              <div>
                <h3 className="TemplateName">{item.templateName}</h3>
                <Timeline>
                  {item.versions.map((v) => (
                    <Timeline.Item>
                      {v.name}
                      {deleteDeploymentLoading[v._id + item._id] ? (
                        <Spin />
                      ) : (
                        <DeleteOutlined
                          className="DeleteButton"
                          onClick={() =>
                            dispatch(
                              callDeleteDeploymentApi({
                                versionId: v._id,
                                deploymentId: item._id,
                              })
                            )
                          }
                        />
                      )}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </List.Item>
          )}
        />
      </PageHeader>
    </div>
  );
}

export default App;
