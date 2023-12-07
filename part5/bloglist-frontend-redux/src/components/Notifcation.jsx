import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notifcation = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? (
    <Alert severity={notification.type}>{notification.message}</Alert>
  ) : null;
};

export default Notifcation;
