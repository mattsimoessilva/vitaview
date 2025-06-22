import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/">
                <img src={logo} alt="VitaView logo" className={styles.logo} />
            </Link>
        </header>
    );
};

export default Header;