import React from "react";

type Props = {
  children?: React.ReactNode;
};

const NotFound: React.FC<Props> = (props) => {
  const {} = props;
  return <div>Not Found</div>;
};

export default NotFound;
