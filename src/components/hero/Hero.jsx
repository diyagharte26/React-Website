import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const bgRef = useRef(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !bgRef.current) return;

        const anim = gsap.to(bgRef.current, {
            y: 120,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
        };
    }, []);

    const handleScroll = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className={styles.hero}>
            <div ref={bgRef} className={styles.heroBg} />

            <motion.div
                className={styles.heroContent}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className={styles.brandName}>
                    Pixel<span>Production</span>
                </h1>

                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {siteConfig.tagline}
                </motion.p>

                <motion.div
                    className={styles.ctas}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a
                        href="#gallery"
                        className={styles.ctaPrimary}
                        onClick={(e) => handleScroll(e, '#gallery')}
                    >
                        View Our Work
                    </a>
                    <a
                        href="#contact"
                        className={styles.ctaSecondary}
                        onClick={(e) => handleScroll(e, '#contact')}
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </motion.div>

            <div className={styles.scrollCue}>
                <span>Scroll</span>
                <ChevronDown size={18} />
            </div>
        </section>
    );
}
