import { motion } from 'framer-motion';
import { MessageCircle, Mail, AtSign } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { SlidingBgText } from '../layout/SlidingBgText';
import styles from './ContactSection.module.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export function ContactSection() {
    const { contact } = siteConfig;

    const cards = [
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: contact.whatsapp.number,
            href: contact.whatsapp.link,
            target: '_blank',
        },
        {
            icon: Mail,
            label: 'Email',
            value: contact.email,
            href: `mailto:${contact.email}`,
        },
        {
            icon: AtSign,
            label: 'Instagram',
            value: contact.instagram.handle,
            href: contact.instagram.link,
            target: '_blank',
        },
    ];

    return (
        <section id="contact" className={styles.section}>
            <SlidingBgText text="CONNECT" triggerId="#contact" />

            <div className={styles.inner}>
                <motion.h2
                    className={styles.heading}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    Tell us your date. We'll turn it into a film.
                </motion.h2>

                <motion.p
                    className={styles.subtext}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Available for weddings & destination events across India
                </motion.p>

                <div className={styles.cards}>
                    {cards.map((card, i) => (
                        <motion.a
                            key={card.label}
                            className={styles.card}
                            href={card.href}
                            target={card.target}
                            rel={card.target ? 'noopener noreferrer' : undefined}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                        >
                            <div className={styles.cardIcon}>
                                <card.icon size={28} />
                            </div>
                            <span className={styles.cardLabel}>{card.label}</span>
                            <span className={styles.cardValue}>{card.value}</span>
                        </motion.a>
                    ))}
                </div>

                <motion.p
                    className={styles.closing}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Every love story deserves a beautiful film.
                </motion.p>
            </div>
        </section>
    );
}
