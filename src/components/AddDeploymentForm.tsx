import React from "react";
import { Button, Form, Select, Input } from "antd";
import { RootState } from "../reducers/types";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "antd/lib/form/interface";
import { callAddDeploymentApi } from "../actions/deploymentActions";

const { Option } = Select;

export default function AddDeploymentForm() {
  const { deploymentList, addDeploymentLoading } = useSelector(
    (state: RootState) => state.deployments
  );

  const dispatch = useDispatch();
  const deploymentListWithId = deploymentList.map(({ templateName, _id }) => ({
    id: _id,
    templateName,
  }));
  const onFinish = (values: Store) => {
    const { deploymentId, version } = values;
    dispatch(callAddDeploymentApi({ deploymentId, version }));
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Template Name"
        name="deploymentId"
        rules={[{ required: true, message: "Please select template name!" }]}
      >
        <Select placeholder="Select a option and change input text above">
          {deploymentListWithId.map(({ id, templateName }) => (
            <Option value={id}>{templateName}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Version"
        name="version"
        rules={[{ required: true, message: "Please enter version!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Url" name="url">
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={addDeploymentLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
