import { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, userDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';


// null = 아무나 출입 가능
// true = 로그인유저만 출입 가능
// false = 로그인 유저 출입 불가능
//adminRoute는 어드민만 출입여부, 기본값 null 
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res);


                if (!res.payload.isAuth) { //로그인 하지 않은 상태
                    if (option) {       //로그인을 하지 않았는데 로그인유저만 출입 가능한 페이지에 들어가려할 때
                        navigate('/login')
                    }

                } else if (adminRoute && !res.payload.isAdmin) {    //로그인했고 어드민이 아닌데 어드민페이지에 들어가려할 때
                    navigate('/')    //기본 페이지로 돌아간다

                } else if (option === false) {  //로그인한 유저가 출입 불가능한 페이지에 들어가려할 때
                    navigate('/')
                }

            })
        }, [])

        return <SpecificComponent />
    }
    return AuthenticationCheck
}