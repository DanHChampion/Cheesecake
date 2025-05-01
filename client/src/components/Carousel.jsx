import './Carousel.scss';
import { useRef, useEffect , useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import apiRequest from '../hooks/apiRequest';
import shuffle from '../utils/shuffle';
import PropTypes from 'prop-types';
import Card from './Card';

// props include
// label
// endpoint
const Carousel = ( { label, previewObj, endpoint = undefined, loadItems = [], type = 'default' } ) => {
	const [items,setItems] = useState(null);
	const [deleteCount,setDeleteCount] = useState(0);

	const [scrollX, setScrollX] = useState(0);
	const [state, setState] = useState(
		{
			left: false,
			right: true
		}
	);
	const containerRef = useRef();
	const wrapperRef = useRef();


	const getItems = () => {
		if (endpoint === undefined) {
			setItems(orderItems(loadItems));
		} else {
			apiRequest().get( endpoint, (res, err) => {
				if(!err) {
					setItems(orderItems(res.data));
				}
			});
		}
	};

	const orderItems = (items) => {
		if (type === 'CW') {
			return items.reverse();
		}
		if (type === 'default') {
			return shuffle(items);
		}
		return items;
	};

	useEffect(() => getItems(), []);

	const goLeft = () => {
		if (scrollX >= wrapperRef.current.offsetWidth) {
			wrapperRef.current.scrollTo(scrollX - wrapperRef.current.offsetWidth, 0);
		} else {
			wrapperRef.current.scrollTo(0, 0);
			setState({
				left: false,
				right: state.right
			});
		}
	};
	const goRight = () => {
		if (scrollX - wrapperRef.current.offsetWidth <= containerRef.current.offsetWidth) {
			wrapperRef.current.scrollTo(scrollX + wrapperRef.current.offsetWidth, 0);
		} else {
			wrapperRef.current.scrollTo(containerRef.current.offsetWidth, 0);
		}
	};

	const onSlide = () => {
		setScrollX(wrapperRef.current.scrollLeft);
		setState({
			left:  scrollX > 1 ? true : false,
			right: scrollX <= containerRef.current.offsetWidth - wrapperRef.current.offsetWidth ? true : false
		});
	};

	const deleteOne = () => {
		setDeleteCount(deleteCount + 1);
	};

	if (items !== null && items.length === 0 ) return null;

	return (
		<>
			{items &&
			<div className='Carousel' style={(items.length - deleteCount) === 0?{overflowY:'hidden', height:'0px'}:{}}>
				<div className='header'>{label}</div>
				<div className="main">
					{state.left && <div className='scroll-arrow left-arrow' onClick={() => {goLeft();}}> <FontAwesomeIcon className='icon' icon={faChevronLeft}/> </div>}
					{items &&
						<div ref={wrapperRef} className='wrapper' onScroll={()=> {onSlide();}}>
							<div ref={containerRef} className='container'>
								{items.map((item) => (
									<Card key={item.id !== undefined? item.id: item._id} item={item} previewObj={previewObj} continueWatching={type === 'CW'} deleteOne={deleteOne}/>
								))}
							</div>
						</div>
					}
					{(state.right && items !== null && items.length > 7) && <div className='scroll-arrow right-arrow' onClick={() => {goRight();}}> <FontAwesomeIcon className='icon' icon={faChevronRight}/> </div>}
				</div>
			</div>
			}
		</>
	);
};

export default Carousel;

Carousel.propTypes = {
	label: PropTypes.string.isRequired,
	previewObj: PropTypes.object.isRequired,
	endpoint: PropTypes.string,
	loadItems: PropTypes.array,
	type: PropTypes.string,
};
