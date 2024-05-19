import {FC} from "react";
import {NavLink} from 'react-router-dom';
import './navigation.scss'
import './media.scss'
import Logo from '../../app/assets/images/logo-1.png'
import MenuTop from "../../shared/menu-top/MenuTop";


const Navigation: FC = () => {

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__inner">
                    <div className="navbar__logo">
                        <NavLink to="/" className="navbar__logo-link">
                            <img className="navbar__logo-img" src={Logo} alt="Logo"/>
                        </NavLink>
                    </div>
                    <MenuTop/>
                </div>
            </div>
        </div>
    )
}

export default Navigation