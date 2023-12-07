const Notifcation = ({ message, type }) => {
  return <div className={`${type}`}>{message}</div>;
};

export default Notifcation;
