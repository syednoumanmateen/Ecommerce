import { useState, useRef, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const DropDown = ({ icon }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { clearUser } = useUser()
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavigation = (path) => {
        setOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        clearUser()
        navigate('/login');
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="text-lg cursor-pointer hover:text-black"
            >
                {icon}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                    <div
                        onClick={() => handleNavigation('/profile')}
                        className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    >
                        Profile
                    </div>
                    <div
                        onClick={handleLogout}
                        className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(DropDown);
