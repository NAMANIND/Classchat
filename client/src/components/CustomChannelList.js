import { ChannelList, useChatContext } from 'stream-chat-react';
import  styled  from 'styled-components';
import { useEffect, useState} from 'react';
import ChannelListContainer from './ChannelListContainer';
import Cookies from 'universal-cookie';

const Container = styled.div`
    height: 100vh ;
    background-color: #61C0BF;
    padding: 0px 10px 0px 10px;
 
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2{
            color: white;
            margin: 0 0 10px;
            font-size: 25px;
        }

        button{
            color: white;
            font-size: 30px;
            background: none;
            background: none;
            cursor: pointer;
            padding-bottom: 10px;
        }
    }
    .str-chat {
        height: max-content;
        &.str-chat-channel-list{
            float: none;
            background-color: #BBDED6;
        }

    }
    .channel-list{
        width : 100%;
        &__message{
            color: white;
    }
       
    }
    .logout{
        position: absolute;
        bottom:2vh;
    }
    .back{
        margin-top: 5px;
    }


    @media screen and (max-width: 960px){
        height: 100%;
        width:100%;
        .header{
            display: block;
        }
        h2{
            display: none;
        }
        .add{
            top: 12%;
            padding-left: 15%;
        }
        .back{
            left: 2%;
        }
        button{
            padding-left: 0.2%;
        }
        .logout{
            left:2%;
        }
        .str-chat {
            &.str-chat-channel-list{
                width:50%;
        }
    
    }

`;

const cookies = new Cookies();

const randomStr = () => Math.random.toString(36).substring(7);

export default function CustomChannelList({onClickAdd}){

    const{client} = useChatContext();
    const [channelListkey , setChannelListkey] = useState(randomStr());
    const filters = {
        members: {$in: [client.user.id]},
    }

    useEffect(() => {
        client.on("member.added",() => {
            setChannelListkey(randomStr());
        })
    },[]);

    return (
        <Container>
            <div className = "header">
            <button className='back'><img src="https://www.linkpicture.com/q/android-chrome-192x192_3.png" width="40"/></button>    
            <h2>Classes</h2>
            <button className='add' onClick={onClickAdd}>+</button>
            <button className="logout" onClick={logout}>  <img src="logout.png" width="40" alt='Logout'/></button>  
            </div>
            

        <ChannelList 
            key={channelListkey}
            List={listProp => <ChannelListContainer{... listProp} />}
            filters={filters}
        />
        </Container>
    );

  
    function logout() {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    } 

}