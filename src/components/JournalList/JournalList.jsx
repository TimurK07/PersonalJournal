import './JournalList.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context.jsx';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);
	const sortItems = (a,b) => {
		if(a.date > b.date) {
			return -1;
		} else {
			return 1;
		}
	};

	const filterdItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortItems), [items, userId]);

	if(items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}
	
	
	return <>
		{filterdItems
			.map(el => (
				<CardButton key={el.id} onClick={() => setItem(el)}>
					<JournalItem
						title={el.title}
						post={el.post}
						date={el.date}
					/>
				</CardButton>
			))}
	</>;
}

export default JournalList;