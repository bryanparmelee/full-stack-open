const Notification = ({ message, isError }) => {
  if (message.length === 0) {
    return null;
  }

  return <div className={isError ? "error" : "notification"}>{message}</div>;
};

export default Notification;
