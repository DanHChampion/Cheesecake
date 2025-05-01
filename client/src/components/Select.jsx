import './Select.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSelect = () => setIsOpen(!isOpen);

    // Close the select when clicking outside of it
    const handleClickOutside = (event) => {
        if (event.target.closest('.Select') === null) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return(
        <div className="Select">
            <div className={`current-option ${isOpen? 'active': ''}`} onClick={() => toggleSelect()}>
                {props.value}
                <div className={`arrow ${isOpen? 'active': ''}`}><FontAwesomeIcon icon={faChevronDown}/></div>
            </div>
            <div className={`options-container ${isOpen? 'active': ''}`} onClick={() => setIsOpen(false)}>
                {props.options.map((option, index) => (
                    <div key={index} className={`option ${props.value === option ? 'selected' : ''}`} onClick={() => props.setState(option)}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
};

export default Select;