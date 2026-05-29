import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SlidingBgText.module.css';

gsap.registerPlugin(ScrollTrigger);

export function SlidingBgText({ text, triggerId }) {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const anim = gsap.fromTo(el,
            { xPercent: -30, yPercent: -50, force3D: true },
            {
                xPercent: 30,
                yPercent: -50,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: triggerId,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
        };
    }, [triggerId]);

    return (
        <span ref={textRef} className={styles.bgText} aria-hidden="true">
            {text}
        </span>
    );
}
