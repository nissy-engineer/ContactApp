import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInventory2 } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">社内お問い合わせシステム</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className="nav-item">
                        <NavLink to="/">
                            <AiOutlineHome className="icon" />
                            <span>ホーム</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products">
                            <MdOutlineInventory2 className="icon" />
                            <span>製品一覧</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/settings">
                            <IoSettingsOutline className="icon" />
                            <span>設定</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-user">
                <FaRegUser className="user-icon" />
                <div className="user-info">
                    <div className="user-name">山田太郎</div>
                    <div className="user-department">品質保証部</div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;