import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { useEffect } from 'react';


const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState (true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    },[usersData])

    return (
            <li className='card-container' key={post._id}>
                {isLoading ?(
                    <i className='fas fa-spinner fa-spin'></i>
                ) : (
                    <h1>test</h1>
                )}
            </li>
        );
};

export default Card;