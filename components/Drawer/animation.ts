import gsap from "gsap";

const tweenOpts: gsap.TweenVars = {
  ease: "power3.out",
  delay: 0.1,
  transformOrigin: "right",
};

export const AnimationDrawer = (ref: HTMLElement, isOpen: boolean) => {
  if (isOpen)
    return gsap.fromTo(
      ref,

      { x: "100%", ...tweenOpts },
      { x: "0%", ...tweenOpts }
    );

  return gsap.to(ref, { x: "100%", ...tweenOpts });
};

export const AnimationOverlay = (ref: HTMLElement, isOpen: boolean) => {
  if (isOpen) return gsap.fromTo(ref, { opacity: 0 }, { opacity: 1 });
  return gsap.to(ref, { opacity: 0 });
};
