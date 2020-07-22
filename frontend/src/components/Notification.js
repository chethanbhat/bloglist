import React from "react";
import { Alert } from "reactstrap";

const Notification = ({ notification }) => {
  return (
    <Alert color={notification.isError === true ? "danger" : "success"}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
