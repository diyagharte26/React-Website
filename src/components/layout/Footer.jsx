import { AtSign } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Footer.module.css';

export function Footer() {
    const handleClick = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <span className={styles.brand}>
                    Pixel <span>Production</span>
                </span>

                <nav className={styles.links}>
                    {siteConfig.nav.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={styles.link}
                            onClick={(e) => handleClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.social}>
                    <a
                        href={siteConfig.contact.instagram.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="Instagram"
                    >
                        <AtSign size={20} />
                    </a>
                </div>

                <p className={styles.copy}>
                    © {new Date().getFullYear()} Pixel Production. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
