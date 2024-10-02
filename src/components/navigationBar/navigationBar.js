import React, { useState, useCallback, useRef, useEffect } from 'react';
import filterIcon from '../../assets/images/Tuning.svg';
import downIcon from '../../assets/images/Down.svg';
import './navigationBar.css';

export default function Navbar(props) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dropdownRef = useRef(null); // Create a reference for the dropdown

    const toggleDisplayDropdown = useCallback((e) => {
        setIsFilterVisible((prev) => !prev);
        if (e.target.value !== undefined) {
            props.handleGroupValue(e.target.value);
        }
    }, [props]);

    const toggleOrderingDropdown = useCallback((e) => {
        setIsFilterVisible((prev) => !prev);
        if (e.target.value !== undefined) {
            props.handleOrderValue(e.target.value);
        }
    }, [props]);

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsFilterVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <section className="nav">
            <div className="nav-container">
                <div>
                    <div className="nav-disp-btn" onClick={toggleDisplayDropdown}>
                        <div className="nav-disp-icon nav-disp-filter">
                            <img src={filterIcon} alt="Filter Icon" />
                        </div>
                        <div className="nav-disp-heading">Display</div>
                        <div className="nav-disp-icon nav-disp-drop">
                            <img src={downIcon} alt="Dropdown Icon" />
                        </div>
                    </div>
                    <div 
                        ref={dropdownRef} // Attach the ref to the dropdown
                        className={isFilterVisible ? "nav-disp-dropdown nav-disp-dropdown-show" : "nav-disp-dropdown"}
                    >
                        <div className="nav-disp-filters">
                            <div className="nav-dropdown-category">Grouping</div>
                            <div className="nav-dropdown-selector">
                                <select
                                    value={props.groupValue}
                                    onChange={toggleDisplayDropdown}
                                    className='nav-selector'
                                    name="grouping"
                                    id=""
                                >
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>
                            </div>
                        </div>
                        <div className="nav-disp-filters">
                            <div className="nav-dropdown-category">Ordering</div>
                            <div className="nav-dropdown-selector">
                                <select
                                    value={props.orderValue}
                                    onChange={toggleOrderingDropdown}
                                    className='nav-selector'
                                    name="ordering"
                                    id=""
                                >
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
