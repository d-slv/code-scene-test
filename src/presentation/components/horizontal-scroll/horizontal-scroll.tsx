import React, {useEffect} from 'react';
import * as S from './styles';

interface ReferenceProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reference: React.MutableRefObject<any>;
}

const HorizontalScroll: React.FC<ReferenceProps> = ({children, reference}) => {
	function useHorizontalScroll() {
		useEffect(() => {
			const element = reference.current;
			if (element) {
				const onWheel = e => {
					if (e.deltaY === 0) return;
					e.preventDefault();
					element.scrollTo({
						left: element.scrollLeft + e.deltaY,
						behavior: 'smooth',
					});
				};
				element.addEventListener('wheel', onWheel);
				return () => element.removeEventListener('wheel', onWheel);
			}
			return null;
		}, []);

		return reference;
	}

	const scrollRef = useHorizontalScroll();
	return <S.Scroll ref={scrollRef}>{children}</S.Scroll>;
};

export default HorizontalScroll;
