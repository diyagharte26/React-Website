import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './ProjectLightbox.module.css';

export function ProjectLightbox({ images, project, isOpen, onClose, imageIndex, setImageIndex }) {
    const imageList = images || project?.images || [];
    const total = imageList.length || 1;

    const next = useCallback(() => setImageIndex((v) => (v + 1) % total), [total, setImageIndex]);
    const prev = useCallback(() => setImageIndex((v) => (v - 1 + total) % total), [total, setImageIndex]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, next, prev, onClose]);

    // Auto-swap every 3.5s
    useEffect(() => {
        if (!isOpen) return;
        const timer = setInterval(next, 3500);
        return () => clearInterval(timer);
    }, [isOpen, next]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                role="dialog"
                aria-modal="true"
                aria-label="Photo lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.content}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery">
                        <X size={16} /> Close
                    </button>

                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous image">
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.imageWrap}>
                        {imageList[imageIndex] ? (
                            <img
                                src={imageList[imageIndex]}
                                alt={`Photo ${imageIndex + 1}`}
                                className={styles.image}
                            />
                        ) : null}
                    </div>

                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next image">
                        <ChevronRight size={24} />
                    </button>

                    <div className={styles.info}>
                        <p className={styles.counter}>{imageIndex + 1} / {total}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
