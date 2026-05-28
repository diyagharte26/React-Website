import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import projects from '../../data/projects.js';
import { SlidingBgText } from '../layout/SlidingBgText';
import { ProjectLightbox } from './ProjectLightbox';
import styles from './GallerySection.module.css';

export function GallerySection() {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Flatten all images from all projects into one array
    const allImages = useMemo(
        () => projects.flatMap((p) => p.images || []),
        []
    );

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    return (
        <section id="gallery" className={styles.section}>
            <SlidingBgText text="PORTFOLIO" triggerId="#gallery" />

            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Work</h2>
                </div>

                <div className={styles.masonry}>
                    {allImages.map((src, i) => (
                        <motion.button
                            key={i}
                            type="button"
                            className={styles.photoBtn}
                            onClick={() => openLightbox(i)}
                            aria-label={`View photo ${i + 1}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: (i % 10) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={src}
                                alt={`Portfolio photo ${i + 1}`}
                                className={styles.photo}
                                loading="lazy"
                            />
                        </motion.button>
                    ))}
                </div>
            </div>

            <ProjectLightbox
                images={allImages}
                isOpen={lightboxIndex !== null}
                onClose={closeLightbox}
                imageIndex={lightboxIndex ?? 0}
                setImageIndex={setLightboxIndex}
            />
        </section>
    );
}
