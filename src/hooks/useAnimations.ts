import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Props {
  slideIn?: boolean,
  fadeIn?: boolean,
  popIn?: boolean,
};

export const useAnimations = (options: Props) => {
  const { slideIn = false, fadeIn = false, popIn = false } = options;

  useGSAP(() => {
    let slideInAnimation: GSAPTween, fadeInAnimation: GSAPTween, popInAnimation: GSAPTween;

    if (slideIn) {
      slideInAnimation = gsap.from('.slide-in', {
        y: 120,
        z: -100,
        opacity: 0,
        stagger: 0.3,
      });
    }

    if (fadeIn) {
      const element = document.querySelector('.fade-in');
      fadeInAnimation = gsap.from(element, {
        scale: 0.9,
        y: 100,
        opacity: 0,
        onComplete: () => {
          if (element) {
            element.removeAttribute('style');
          }
          gsap.to('.back-btn', {
            opacity: 1,
          });
        },
      });
    }

    if (popIn) {
      popInAnimation = gsap.from('.pop-in', {
        scale: 0,
        opacity: 0,
        stagger: 0.02,
        ease: 'elastic.out(1,0.5)',
      });
    }

    return () => {
      slideInAnimation?.kill();
      fadeInAnimation?.kill();
      popInAnimation?.kill();
    };
  }, [slideIn, fadeIn, popIn]);
};
