import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import ownerImg from '../../images/owner.jpg';
import { SlidingBgText } from '../layout/SlidingBgText';
import styles from './FounderSection.module.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export function FounderSection() {
    const { founder } = siteConfig;

    return (
        <section id="founder" className={styles.section}>
            <SlidingBgText text="FILMMAKER" triggerId="#founder" />

            <div className={styles.inner}>
                <motion.div
                    className={styles.portraitWrap}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.portrait}>
                        <img src={ownerImg} alt={founder.name} />
                    </div>
                    <div className={styles.portraitAccent} />
                </motion.div>

                <div className={styles.content}>
                    <motion.span
                        className={styles.label}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Meet the Filmmaker
                    </motion.span>

                    <motion.h2
                        className={styles.name}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {founder.name}
                    </motion.h2>

                    <motion.p
                        className={styles.role}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {founder.role}
                    </motion.p>

                    <motion.p
                        className={styles.bio}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {founder.bio}
                    </motion.p>

                    <motion.div
                        className={styles.certification}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Award size={24} className={styles.certIcon} />
                        <div className={styles.certText}>
                            ✦ {founder.certification}
                            <span>{founder.certificationDetail}</span>
                        </div>
                    </motion.div>

                    <motion.p
                        className={styles.quote}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        {founder.quote}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
