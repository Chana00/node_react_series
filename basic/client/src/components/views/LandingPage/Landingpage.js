import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => { console.log(res) })
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(res => {
                console.log("로그아웃 시도");
                console.log(res.data);
                if (res.data.success) {
                    navigate('/login');
                } else {
                    alert("로그아웃 실패");
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}
        > 시작페이지

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div >
    )
}

export default Landingpage