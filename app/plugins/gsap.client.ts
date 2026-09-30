import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(DrawSVGPlugin, Observer, ScrollTrigger, ScrollSmoother);
});
