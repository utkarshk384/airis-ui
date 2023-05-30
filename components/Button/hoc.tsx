import Tooltip from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

/* Types */
import type { Props } from "./types";

type ButtonComponent = React.FC<Props>;

export const withTooltip = (Component: ButtonComponent) => {
  const ButtonWithTooltip: React.FC<Props> = (props) => {
    const { tooltip } = props;

    if (!tooltip) return <Component {...props} />;

    return (
      <Tooltip content={tooltip}>
        <Component {...props} />
      </Tooltip>
    );
  };

  return ButtonWithTooltip;
};
