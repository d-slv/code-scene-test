/* eslint-disable no-restricted-syntax */
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import React, {useState, useRef, useEffect} from 'react';
import {IoIosArrowDown} from 'react-icons/io';
import * as S from './tab-navbar.styles';

type TabNavbarProps = {
	tabNames: string[];
	callback: (tabIndex: number) => void;
	selectedIndex?: number;
};

export const TabNavbar = (props: TabNavbarProps) => {
	const {tabNames, callback, selectedIndex} = props;
	const [currentIndex, setCurrentIndex] = useState<number>(selectedIndex || 0);
	const [wasMounted, setWasMounted] = useState<boolean>(false);
	const [visibleTabs, setVisibleTabs] = useState<string[]>([]);
	const [tabs, setTabs] = useState<{tabName: string; width: number}[]>([]);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	const tabContainerRef = useRef(null);
	const tabsRefs = useRef(tabNames.map(_ => React.createRef()));

	const {width} = useWindowDimensions();

	const arrowIconSpace = 24;
	const marginRightSpace = 16;

	const chooseVisibleTabs = () => {
		setVisibleTabs([]);
		const containerWidth =
			(tabContainerRef.current as HTMLElement).clientWidth - arrowIconSpace;
		let tabsSumWidth = 0;

		for (const tab of tabs) {
			tabsSumWidth += tab.width + marginRightSpace;
			if (tabsSumWidth <= containerWidth) {
				setVisibleTabs(prev => [...prev, tab.tabName]);
			} else {
				break;
			}
		}
	};

	const setTabsInitialWidth = async () => {
		for (let index = 0; index < tabsRefs.current.length; index += 1) {
			const tabElement = tabsRefs.current[index];
			setTabs(prev => [
				...prev,
				{
					tabName: tabNames[index],
					width: (tabElement.current as HTMLElement).clientWidth,
				},
			]);
		}

		setWasMounted(true);
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	useEffect(() => {
		setTabsInitialWidth();
	}, []);

	useEffect(() => {
		if (wasMounted) chooseVisibleTabs();
	}, [width, tabs]);

	const handleSelect = (tabIndex: number) => {
		setCurrentIndex(tabIndex);
		callback(tabIndex);
	};

	return (
		<S.Container role="navigation">
			<S.TabsContainer ref={tabContainerRef}>
				{tabNames.map((tab, index) => {
					const isSelected = currentIndex === index;
					return (
						<S.TabBlock
							key={index}
							ref={tabsRefs.current[index] as React.RefObject<null>}
							isVisible={visibleTabs.includes(tab) || !wasMounted}
							isSelected={isSelected}
							onClick={() => handleSelect(index)}>
							<S.TabText isSelected={isSelected}>{tab}</S.TabText>
						</S.TabBlock>
					);
				})}

				<S.ArrowIconContainer
					isVisible={tabs.length > visibleTabs.length}
					isTabInDropdownSelected={currentIndex >= visibleTabs.length}>
					<S.ArrowCheckbox />
					<label htmlFor="arrow" onClick={toggleDropdown}>
						<IoIosArrowDown size={12} />
					</label>
				</S.ArrowIconContainer>
			</S.TabsContainer>
			<S.DropdownContainer isVisible={showDropdown}>
				{tabNames.map((tab, index) => {
					const isSelected = currentIndex === index;
					return (
						<S.DropdownTabBlock
							key={index}
							isVisible={!visibleTabs.includes(tab)}
							isSelected={isSelected}
							onClick={() => handleSelect(index)}>
							<S.TabText isSelected={isSelected}>{tab}</S.TabText>
						</S.DropdownTabBlock>
					);
				})}
			</S.DropdownContainer>
		</S.Container>
	);
};
