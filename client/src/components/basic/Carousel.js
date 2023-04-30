import './Carousel.css';
import { useRef, useEffect , useState } from 'react';
import apiRequest from '../hooks/apiRequest';
import PropTypes from 'prop-types';

// props include
// label
// endpoint
const Carousel = (props) => {
	const [items,setItems] = useState(null);

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
		apiRequest().get( props.endpoint, (res, err) => {
			if(!err) {
				setItems(res.data);
			}
		});
	};

	useEffect(() => getItems(), []);

	const goLeft = () => {
		if (scrollX >= 1000) {
			wrapperRef.current.scrollTo(scrollX - 1000, 0);
		} else {
			wrapperRef.current.scrollTo(0, 0);
		}
	};
	const goRight = () => {
		if (scrollX - 1000 <= containerRef.current.offsetWidth) {
			wrapperRef.current.scrollTo(scrollX + 1000, 0);
		} else {
			wrapperRef.current.scrollTo(containerRef.current.offsetWidth, 0);
		}
	};

	const onSlide = () => {
		console.log('Bruh');
		setScrollX(wrapperRef.current.scrollLeft);
		setState({
			left:  scrollX > 1 ? true : false,
			right: scrollX <= containerRef.current.offsetWidth - 1200 ? true : false
		});
		console.log(scrollX);
	};

	return (
		<>
			<p>{props.label}</p>
			<div className="Carousel">
				{state.left && <div className='scroll-arrow left-arrow' onClick={() => {goLeft();}}> &lt; </div>}
				{items &&
					<div ref={wrapperRef} className='wrapper' onScroll={()=> {onSlide();}}>
						<div ref={containerRef} className='container'>
							{items.map((item) => (
								<a href={'/watch/?id=' + item.id}className='item' key={item.id}>
									<img src={'./'} alt={item.title +' Poster'}/>
								</a>
							))}
						</div>
					</div>
				}
				{state.right && <div className='scroll-arrow right-arrow' onClick={() => {goRight();}}> &gt; </div>}
			</div>
		</>
	);
};

export default Carousel;

Carousel.propTypes = {
	label: PropTypes.string.isRequired,
	endpoint: PropTypes.string.isRequired,
};
