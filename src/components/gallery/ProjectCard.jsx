import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index, onOpen }) {
    const coverImage = project.images?.[0];

    return (
        <motion.button
            type="button"
            className={styles.card}
            onClick={() => onOpen(project)}
            aria-label={`Open gallery for ${project.title}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <figure className={styles.figure}>
                {coverImage ? (
                    <div className={styles.imagePlaceholder}>
                        <img
                            src={coverImage}
                            alt={project.title}
                            className={styles.image}
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div
                        className={styles.imagePlaceholder}
                        style={{
                            background: `linear-gradient(135deg, ${project.color}22, var(--bg-elevated), ${project.color}11)`,
                        }}
                    >
                        {project.title.split(' ')[0].charAt(0)}{project.title.split(' ').at(-1)?.charAt(0)}
                    </div>
                )}
                <figcaption className={styles.caption}>
                    <span className={styles.cardTitle}>{project.title}</span>
                    <span className={styles.cardMeta}>{project.type} · {project.location}</span>
                </figcaption>
            </figure>
        </motion.button>
    );
}
