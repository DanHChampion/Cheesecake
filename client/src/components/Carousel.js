import './Carousel.scss';
import { useRef, useEffect , useState } from 'react';
import apiRequest from '../hooks/apiRequest';
import PropTypes from 'prop-types';
import getImage from '../utils/getImage';

// props include
// label
// endpoint
const Carousel = ( { label, previewObj, endpoint } ) => {
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
		apiRequest().get( endpoint, (res, err) => {
			if(!err) {
				setItems(res.data);
			}
		});
	};

	useEffect(() => getItems(), []);

	const goLeft = () => {
		if (scrollX >= wrapperRef.current.offsetWidth) {
			wrapperRef.current.scrollTo(scrollX - wrapperRef.current.offsetWidth, 0);
		} else {
			wrapperRef.current.scrollTo(0, 0);
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

	return (
		<>
			<span style={{fontSize:'22px', fontWeight:'bold', textAlign:'left', width:'90%', marginTop:'30px'}}>{label}</span>
			<div className="Carousel">
				{state.left && <div className='scroll-arrow left-arrow' onClick={() => {goLeft();}}> &lt; </div>}
				{items &&
					<div ref={wrapperRef} className='wrapper' onScroll={()=> {onSlide();}}>
						<div ref={containerRef} className='container'>
							{items.map((item) => (
								<div onClick={() => {previewObj.openPreview(item);}} className='item' key={item.id}>
									<p>{item.title}</p>
									<img src={getImage(item.title+'/coverphoto.jpg')} alt={item.title} onError={(e) => e.target.style.display = 'none'}/>
								</div>
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
	previewObj: PropTypes.object.isRequired,
};
