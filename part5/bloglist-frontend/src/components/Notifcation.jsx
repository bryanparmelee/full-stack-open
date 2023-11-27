import { useSelector } from "react-redux";

const Notifcation = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? (
    <div className={notification.type}>{notification.message}</div>
  ) : null;
};

export default Notifcation;
