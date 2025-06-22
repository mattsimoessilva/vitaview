import styles from './SearchBar.module.css';
import SearchIcon from '../../assets/search.svg';

type SearchBarProps = {
    placeholder?: string;
    onSearch: (value: string) => void;
    long?: boolean;
};

const SearchBar = ({ placeholder = 'Search something...', onSearch, long = false }: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(e.currentTarget.value);
        }
    };

    const containerClass = long
        ? `${styles.container} ${styles.long}`
        : styles.container;

    return (
        <div className={containerClass}>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                onKeyDown={handleKeyDown}
            />
            <span className={styles.icon} aria-hidden="true">
                <img src={SearchIcon} alt="" />
            </span>
        </div>
    );
};

export default SearchBar;

