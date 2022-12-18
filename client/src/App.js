
import {StreamChat} from "stream-chat";
import {useState,useEffect} from 'react';
import {Chat,Channel} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import styled from 'styled-components';
import CustomChannelList from "./components/CustomChannelList";
import Auth from "./components/Auth.jsx";
import ChannelBody from "./components/ChannelBody";
import AddingChannels from "./components/addingchannel/AddingChannels";
import Cookies from "universal-cookie";
const Container = styled.div `

  display: flex;
  .left-column {
    width : 300px
  }

  .right-column {
    flex: 1;
  }

  @media screen and (max-width: 960px){
    display: flex;
   .left-column {
    width : 100%;
    }

  .right-column {
    flex: 1;
  }
  }
  

`;

const cookies = new Cookies();

const API_KEY = 'z4jq9m5srmw7';

// const USER1 ={
//   id: "user1",
//   name: "user1",
//   image:"https://picsum.photos/id/1005/5760/3840",
// };
// const USER2 ={
//   id: "user2",
//   name: "user2",
//   image: "https://picsum.photos/id/1011/5472/3648",
// };
// const USER3 ={
//   id: "user3",
//   name: "user3",
//   image:"https://picsum.photos/id/1025/4951/3301",
// };

// const users = [USER1,USER2,USER3];

// const getRandomUser = ()=>{
//   const randomIndex = Math.floor(Math.random() * (users.length));
//   return users[randomIndex];
// };


function App() {

  const [chatClient,setChatClient] = useState(null);
  const [channel,setChannel] = useState(null);
  const [addingTeamChannel,setAddingTeamChannel] = useState(false);
  const authToken = cookies.get("token");
  const client = StreamChat.getInstance(API_KEY );
  useEffect(() => {
    async function initChat(){
      if(authToken) {
        const user ={
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword')
      }
      
      
      client.connectUser(user,authToken);
      const channel = client.channel("team","general",{
        name: "Class Chat",
        image:"https://www.linkpicture.com/q/android-chrome-192x192_3.png",
        desc: "This channel is for announcements!"
      });
      await channel.create();
      channel.addMembers([user.id]);
      setChannel(channel);
      setChatClient(client);
    }
    }
    initChat();
    return () => {

      if(chatClient) chatClient.disconnectUser();
    };
  },[]);


  
  if(!authToken) return <Auth />;
  
  if (!chatClient || !channel) return <> </>;

  return (
    <div>
      <Chat client={chatClient} theme={'messaging light'}>
          <Container>
            <div className="left-column">
              <CustomChannelList onClickAdd={() => setAddingTeamChannel(true)} />
            </div>
            <div className="right-column">
             <Channel>
                {addingTeamChannel ? <AddingChannels onClose={() => setAddingTeamChannel(false) } /> : <ChannelBody />}
             </Channel>
            </div>
          </Container>  
      </Chat>
    </div>
  );
}

export default App;
