// ApiDetail.js
import React from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CONTAINER = styled.div`
//   padding: 20px;
  color: #fff;
  background-color:#41607a;
  height:100vh;
  width:100vw;
`;

const HEADER = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
`;

const API_LOGO = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const TITLE = styled.h1`
  color: #019dd2;
`;

const DESCRIPTION = styled.p`
  margin: 20px 0;
`;

const SWAGGER = styled.p`
  color: #019dd2;
  font-weight: bold;
`;

const CONTACT = styled.div`
  margin-top: 20px;
`;

const BUTTON=styled.button`
background-color:#019dd2;
color:#fff;
height:2.5em;
width:12em;
border:none;
`;

const ApiDetail = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { apiDetail } = location.state;

const handleClick = ()=>{
    navigate("/")
}

  return (
    <CONTAINER>
      <HEADER>
        {apiDetail.logo && <API_LOGO src={apiDetail.logo} alt={`${apiDetail.title} logo`} />}
        <TITLE>{apiDetail.title}</TITLE>
      </HEADER>
      
      <h2>Description</h2>
      <DESCRIPTION>{apiDetail.description}</DESCRIPTION>

      <h2>Swagger</h2>
      <SWAGGER>{apiDetail.swagger}</SWAGGER>

      <h2>Contact</h2>
      <CONTACT>
        <p>Name: {apiDetail.name || 'N/A'}</p>
        <p>Email: {apiDetail.email || 'N/A'}</p>
        <p>URL: {apiDetail.url || 'N/A'}</p>
      </CONTACT>

      <BUTTON onClick={handleClick}>Explore more APIs</BUTTON>
    </CONTAINER>
  );
};

export default ApiDetail;
