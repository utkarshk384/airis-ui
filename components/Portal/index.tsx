import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = { children: React.ReactNode };

const Portal = (props: Props) => {
  const { children } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <>
      {mounted &&
        createPortal(
          <div className="block fixed inset-0 z-20">{children}</div>,
          document.querySelector("#main-portal") as Element
        )}
    </>
  );
};

export default Portal;
