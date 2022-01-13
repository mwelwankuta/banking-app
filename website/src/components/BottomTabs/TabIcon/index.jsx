import { NavLink } from "react-router-dom"
import React from 'react'

import Container from '../../Container';

function TabIcon({ icon, name, route }) {
    return (
        <NavLink exact to={route} className='text-gray-400' activeClassName="text-blue-400">
            <Container className="flex flex-col items-center justify-between">
                {icon}
                <p className="text-xs">{name}</p>
            </Container>
        </NavLink>
    )
}

export default TabIcon
