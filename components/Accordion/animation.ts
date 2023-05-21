import gsap from "gsap";

export const GSAPAnimation = (ref: HTMLDivElement) => {
  const tweenOpts: gsap.TweenVars = {
    ease: "power3.out",
    delay: 0.1,
    transformOrigin: "right",
  };

  const isOpen = ref.dataset["state"] === "open";

  if (isOpen)
    return gsap.fromTo(
      ref,
      { height: 0, ...tweenOpts },
      { height: "var(--radix-accordion-content-height)", ...tweenOpts }
    );

  return gsap.fromTo(
    ref,
    { height: "var(--radix-accordion-content-height)", ...tweenOpts },
    { height: 0, ...tweenOpts }
  );
};
