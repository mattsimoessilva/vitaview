import styles from './BannerGroup.module.css';
import BannerCard from '../BannerCard/BannerCard';

interface BannerGroupProps {
    banners: { imageSrc: string; title: string; text: string, button: React.ReactNode, imagePosition?: 'left' | 'right'; }[];
}

const BannerGroup: React.FC<BannerGroupProps> = ({ banners }) => (
    <div className={styles.container}>
        {banners.map((banner, index) => (
            <BannerCard key={index} {...banner} />
        ))}
    </div>
);

export default BannerGroup;