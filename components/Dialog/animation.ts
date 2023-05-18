import gsap from "gsap";

export const GSAPAnimation = (ref: HTMLElement, isDrawerOpen: boolean) => {
  const tweenOpts: gsap.TweenVars = {
    ease: "power3.out",
    delay: 0.1,
    transformOrigin: "right",
  };

  if (isDrawerOpen)
    return gsap.fromTo(
      ref,

      { x: "100%", ...tweenOpts },
      { x: "0%", ...tweenOpts }
    );

  return gsap.to(ref, { x: "100%", ...tweenOpts });
};
