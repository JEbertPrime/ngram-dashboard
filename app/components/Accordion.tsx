import { FunctionComponent, Key, useId, useState } from "react";

const Accordion: FunctionComponent<{ label: string; open: boolean }> = (
  props,
) => {
  const { label, open, ...rest } = props;
  const [isOpen, setOpen] = useState(open);

  const toggleOpen = () => setOpen(!isOpen);
  const divId = useId();
  const buttonId = useId();
  return (
    <div {...rest}>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          className="accordion-trigger"
          aria-controls={divId}
          id={buttonId}
        >
          <span>{label}</span>
        </button>
      </h3>
      <div
        id={divId}
        role="region"
        aria-labelledby={buttonId}
        className="accordion-panel"
        hidden={!isOpen}
      ></div>
    </div>
  );
};
export default Accordion;
