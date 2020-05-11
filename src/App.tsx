import React, { useEffect } from "react";
import { List, PageHeader, Timeline, Button } from "antd";
import "./App.css";
import { callGetDeploymenListApi } from "./actions/deploymentActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers/types";

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

function App() {
  const dispatch = useDispatch();
  const deployments = useSelector((state: RootState) => state.deployments);
  useEffect(() => {
    dispatch(callGetDeploymenListApi());
  }, [dispatch]);

  const { deploymentList, deploymentListLoading } = deployments;

  return (
    <div className="App">
      <PageHeader
        title="Deployments"
        backIcon={false}
        className="Header"
        ghost={false}
        extra={[
          <Button key="1" type="primary">
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
                    <Timeline.Item>{v.name}</Timeline.Item>
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
