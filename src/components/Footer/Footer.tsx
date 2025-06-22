import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt="VitaView logo" className={styles.logo} />
            <p className={styles.trademark}>A project by @mattsimoessilva</p>
        </footer>
    );
};

export default Header;