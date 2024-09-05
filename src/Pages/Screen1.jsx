import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';


const MAINDIV = styled.div`
height:100vh;
width:100vw;
background-color:#41607a;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
position: relative;
overflow-Y:scroll;
`;
const BUTTON = styled.button`
background-color:#019dd2;
color:#fff;
height:2.5em;
width:12em;
border:none;
`;
const SIDEBAR = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 30vw;
  background-color: #41607a;
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
  padding: 20px;
  display: flex;
  color:#99c1da;
  flex-direction: column;
  overflow-Y:scroll;
`;
const PROVIDER_ITEM = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const DOWN_ARROW = styled.span`
  font-size: 1.5em;
  color: #019dd2;
  cursor:pointer;
`;
const API_LIST = styled.ul`
  list-style: none;
  padding: 0;
  color: #fff; 
  display:flex;
  flex-direction: column;
  align-items: baseline;
  gap:10px;
`;

const API_ITEM = styled.li`
  display: flex;
  padding: 5px 0;
  cursor:pointer;
`;

const API_LOGO = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;


const Screen1 = () => {

    const [providers, setProviders] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedProviderAPIs, setSelectedProviderAPIs] = useState({});
    const navigate = useNavigate();

    const handleButtonClick = () => {

        fetch('https://api.apis.guru/v2/providers.json')
            .then((response) => response.json())
            .then((data) => {

                setProviders(data.data);
                setShowSidebar(true);

            })
            .catch((error) => {
                // Handle any errors
                console.error('Error fetching data:', error);
            });
    };

    const handleArrowClick = (provider) => {
        fetch(`https://api.apis.guru/v2/${provider}.json`)
            .then((response) => response.json())
            .then((data) => {
                const apiDetails = Object.keys(data.apis).map((apiKey) => ({
                    title: data.apis[apiKey].info.title,
                    logo: data.apis[apiKey].info['x-logo'] ? data.apis[apiKey].info['x-logo'].url : '',
                    email: data.apis[apiKey].info.contact.email,
                    name: data.apis[apiKey].info.contact.name,
                    url: data.apis[apiKey].info.contact.url,
                    description: data.apis[apiKey].info.description,
                    swagger: data.apis[apiKey].swaggerUrl,
                }));
                setSelectedProviderAPIs((prevState) => ({
                    ...prevState,
                    [provider]: apiDetails,
                }));
            })
            .catch((error) => {
                console.error(`Error fetching APIs for provider ${provider}:`, error);
            });
    };


    const handleTitleClick = (apiDetail) => {
        console.log("apiDetail:", apiDetail)
        navigate('/api-detail', { state: { apiDetail } });
    };

    console.log(providers)

    return (
        <MAINDIV>
            <BUTTON onClick={handleButtonClick}>Explore Web APIs</BUTTON>
            {showSidebar && (
                <SIDEBAR>
                    <h2>Select Providers</h2>
                    {providers.map((provider, index) => (
                        <div key={index}>
                            <PROVIDER_ITEM>
                                {provider}
                                <DOWN_ARROW onClick={() => handleArrowClick(provider)}>
                                    <KeyboardArrowDownIcon />
                                </DOWN_ARROW>
                            </PROVIDER_ITEM>
                            {selectedProviderAPIs[provider] && (
                                <API_LIST>
                                    {selectedProviderAPIs[provider].map((apiDetail, i) => (
                                        <API_ITEM key={i} onClick={() => handleTitleClick(apiDetail)}>
                                            {apiDetail.logo && <API_LOGO src={apiDetail.logo} alt={`${apiDetail.title} logo`} />}
                                            {apiDetail.title}
                                        </API_ITEM>
                                    ))}
                                </API_LIST>
                            )}
                        </div>
                    ))}
                </SIDEBAR>
            )}
        </MAINDIV>
    );
};
export default Screen1