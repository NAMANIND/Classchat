import styled from "styled-components";

import { ChannelHeader, MessageList,MessageInput } from "stream-chat-react";

const Container = styled.div`
    width: 100%;
    height: 100vh;
      
    .str-chat-header-livestream{
        width: 100%;
        height: 70vh;
       
    }
    .str-chat__header-hamburger--line{
        background: #61C0BF;
    }

  
    .str-chat__list{
        height : calc(90vh - 60px);
    }
    .str-chat__input-flat-wrapper{
        position: relative;
        bottom: 1vh;
        width: 100%;
       
    }
     @media screen and (max-width: 960px){
        .str-chat__list{
            width:100%;
           
        }
        .str-chat__input-flat-wrapper{
            position: relative;
            bottom: 5vh;
           
        }
    }
`;

export default function ChannelBody(){
    return(
        <Container>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
        </Container>
    );
}