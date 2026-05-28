import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './WhatsAppFloat.module.css';

export function WhatsAppFloat() {
    return (
        <a
            href={siteConfig.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.float}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={26} />
        </a>
    );
}
