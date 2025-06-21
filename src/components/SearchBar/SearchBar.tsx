import styles from './SearchBar.module.css';
import SearchIcon from '../../assets/search.svg';

type SearchBarProps = {
    placeholder?: string;
    onSearch: (value: string) => void;
};

const SearchBar = ({ placeholder = 'Search something...', onSearch }: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === 'Enter' && onSearch) {
            onSearch(e.currentTarget.value);
        }
    };

    return (
        <div className={styles.container}>
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
