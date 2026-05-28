import { useState, useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Nav.module.css';

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Active section detection
    useEffect(() => {
        const sections = siteConfig.nav.map(n => document.querySelector(n.href)).filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection('#' + entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
        );
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <nav className={styles.navInner}>
                <a href="#hero" className={styles.logo} onClick={(e) => handleClick(e, '#hero')}>
                    Pixel <span>Production</span>
                </a>

                <div className={styles.navLinks}>
                    {siteConfig.nav.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${activeSection === link.href ? styles.active : ''}`}
                            onClick={(e) => handleClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </nav>

            <div className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ''}`}>
                {siteConfig.nav.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={styles.mobileLink}
                        onClick={(e) => handleClick(e, link.href)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </header>
    );
}
