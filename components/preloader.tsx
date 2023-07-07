import { Player } from "@lottiefiles/react-lottie-player";

/* Components */
import { Heading } from "./Typography";

/* Animations */
import * as animationData from "@src/animations/preloader.json";
import Portal from "./Portal";

export const Preloader: React.FC = () => {
  return (
    <Portal>
      <div className="h-screen w-screen fixed grid place-items-center bg-white">
        <div className="flex flex-col relative items-center gap-4 w-64 h-54">
          <Player autoplay src={animationData} loop />
          <Heading
            className="w-fit absolute top-2/3 translate-y-8 left-0 right-0 mx-auto"
            size="lg"
            weight="600"
          >
            Loading...
          </Heading>
        </div>
      </div>
    </Portal>
  );
};
