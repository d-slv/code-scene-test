import {useState, useEffect, useRef} from 'react';

export default function useOutsideClosing(initialIsVisible) {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false);
		}
	};

	const handleClickOpen = () => {
		setIsComponentVisible(true);
	};

	const handleClickClosing = () => {
		setIsComponentVisible(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return {ref, isComponentVisible, setIsComponentVisible, handleClickClosing, handleClickOpen};
}
