import services from '../../data/services.json';
import { SlidingBgText } from '../layout/SlidingBgText';
import { ServiceCard } from './ServiceCard';
import styles from './ServicesSection.module.css';

export function ServicesSection() {
    return (
        <section id="services" className={styles.section}>
            <SlidingBgText text="SERVICES" triggerId="#services" />

            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What We Offer</h2>
                    <p className={styles.subtitle}>
                        Every event is unique — our coverage adapts to your celebration
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
