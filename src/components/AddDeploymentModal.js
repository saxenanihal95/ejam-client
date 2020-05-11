import React from "react";
import { Modal } from "antd";
import AddDeploymentForm from "./AddDeploymentForm.tsx";

export default function AddDeploymentModal({ visible, hideModal }) {
  return (
    <Modal
      title="Add Deployment"
      visible={visible}
      footer={null}
      onCancel={hideModal}
    >
      <AddDeploymentForm />
    </Modal>
  );
}
