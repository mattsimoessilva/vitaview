import { useState } from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '../../assets/search.svg';

type SearchBarProps = {
    placeholder?: string;
    onSearch: (value: string) => void;
    long?: boolean;
};

const SearchBar = ({ placeholder = 'Search something...', onSearch, long = false }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmed = inputValue.trim();
            if (!trimmed) {
                setError(''); // force re-render by clearing first
                setTimeout(() => setError('Please enter a search term'), 10);
            } else {
                setError('');
                onSearch(trimmed);
            }
        }
    };


    const containerClass = long
        ? `${styles.container} ${styles.long}`
        : styles.container;

    return (
        <>
            {error && <div className={styles.floatingError}>{error}</div>}
            <div className={containerClass}>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={styles.input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <span className={styles.icon} aria-hidden="true">
                    <img src={SearchIcon} alt="" />
                </span>
            </div>
        </>
    );
};

export default SearchBar;
