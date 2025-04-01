export type AnimationAttentionSeekersType =
  | "bounce"
  | "flash"
  | "pulse"
  | "rubberBand"
  | "shakeX"
  | "shakeY"
  | "headShake"
  | "swing"
  | "tada"
  | "wobble"
  | "jello"
  | "heartBeat";

export type AnimationBackEntrancesType =
  | "backInDown"
  | "backInLeft"
  | "backInRight"
  | "backInUp";

export type AnimationBackExitsType =
  | "backOutDown"
  | "backOutLeft"
  | "backOutRight"
  | "backOutUp";

export type AnimationBouncingEntrancesType =
  | "bounceIn"
  | "bounceInDown"
  | "bounceInLeft"
  | "bounceInRight"
  | "bounceInUp";

export type AnimationBouncingExitsType =
  | "bounceOut"
  | "bounceOutDown"
  | "bounceOutLeft"
  | "bounceOutRight"
  | "bounceOutUp";

export type AnimationFadingEntrancesType =
  | "fadeIn"
  | "fadeInDown"
  | "fadeInDownBig"
  | "fadeInLeft"
  | "fadeInLeftBig"
  | "fadeInRight"
  | "fadeInRightBig"
  | "fadeInUp"
  | "fadeInUpBig"
  | "fadeInTopLeft"
  | "fadeInTopRight"
  | "fadeInBottomLeft"
  | "fadeInBottomRight";

export type AnimationFadingExitsType =
  | "fadeOut"
  | "fadeOutDown"
  | "fadeOutDownBig"
  | "fadeOutLeft"
  | "fadeOutLeftBig"
  | "fadeOutRight"
  | "fadeOutRightBig"
  | "fadeOutUp"
  | "fadeOutUpBig"
  | "fadeOutTopLeft"
  | "fadeOutTopRight"
  | "fadeOutBottomLeft"
  | "fadeOutBottomRight";

export type AnimationFlippersType =
  | "flip"
  | "flipInX"
  | "flipInY"
  | "flipOutX"
  | "flipOutY";

export type AnimationLightspeedType =
  | "lightSpeedInRight"
  | "lightSpeedInLeft"
  | "lightSpeedOutRight"
  | "lightSpeedOutLeft";

export type AnimationRotatingEntrancesType =
  | "rotateIn"
  | "rotateInDownLeft"
  | "rotateInDownRight"
  | "rotateInUpLeft"
  | "rotateInUpRight";

export type AnimationRotatingExitsType =
  | "rotateOut"
  | "rotateOutDownLeft"
  | "rotateOutDownRight"
  | "rotateOutUpLeft"
  | "rotateOutUpRight";

export type AnimationSlidingEntrancesType =
  | "slideInUp"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight";

export type AnimationSlidingExitsType =
  | "slideOutUp"
  | "slideOutDown"
  | "slideOutLeft"
  | "slideOutRight";

export type AnimationZoomingEntrancesType =
  | "zoomIn"
  | "zoomInDown"
  | "zoomInLeft"
  | "zoomInRight"
  | "zoomInUp";

export type AnimationZoomingExitsType =
  | "zoomOut"
  | "zoomOutDown"
  | "zoomOutLeft"
  | "zoomOutRight"
  | "zoomOutUp";

export type AnimationSpecialsType =
  | "hinge"
  | "jackInTheBox"
  | "rollIn"
  | "rollOut";

export type AnimationType =
  | AnimationAttentionSeekersType
  | AnimationBackEntrancesType
  | AnimationBackExitsType
  | AnimationBouncingEntrancesType
  | AnimationBouncingExitsType
  | AnimationFadingEntrancesType
  | AnimationFadingExitsType
  | AnimationFlippersType
  | AnimationLightspeedType
  | AnimationRotatingEntrancesType
  | AnimationRotatingExitsType
  | AnimationSlidingEntrancesType
  | AnimationSlidingExitsType
  | AnimationZoomingEntrancesType
  | AnimationZoomingExitsType
  | AnimationSpecialsType;
