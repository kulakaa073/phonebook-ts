import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filters/selectors';
import { useDebounce } from 'use-debounce';
import { useState, useEffect, memo } from 'react';
import { setFilter } from '../../redux/filters/slice';
import styles from './SearchBox.module.css';

export const SearchBox = memo(() => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const [newFilter, setNewFilter] = useState(filter || '');
  const [debouncedFilter] = useDebounce(newFilter, 250);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilter(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  return (
    <div className={styles.container}>
      <p>Contacts search:</p>
      <input
        type="text"
        value={newFilter}
        onChange={handleFilterChange}
        className={styles.field}
        placeholder="Enter Name or Phone Number"
      />
    </div>
  );
});
