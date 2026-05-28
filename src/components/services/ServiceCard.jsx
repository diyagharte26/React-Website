import { motion } from 'framer-motion';
import { Camera, Film, Heart, Sparkles, Palette, Plus, MapPin } from 'lucide-react';
import styles from './ServiceCard.module.css';

const iconMap = {
    Camera, Film, Heart, Sparkles, Palette, Plus, MapPin,
};

export function ServiceCard({ service, index }) {
    const Icon = iconMap[service.icon] || Camera;

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className={styles.iconWrap}>
                <Icon size={24} />
            </div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>
            <div className={styles.items}>
                {service.items.map((item) => (
                    <span key={item} className={styles.item}>{item}</span>
                ))}
            </div>
        </motion.div>
    );
}
