import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../state/features/appSlice';
import ChatInput from './ChatInput';
import { db } from '../firebase';
import { collection, doc, orderBy, query } from '@firebase/firestore';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(roomId && doc(db, 'rooms', roomId));

  const [roomMessages, loading] = useCollection(
    roomId &&
      query(
        collection(db, 'rooms', roomId, 'messages'),
        orderBy('timestamp', 'asc')
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {!roomId && (
        <>
          <Header>
            <HeaderLelft>
              <h4>
                <strong>Select a Channel</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLelft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> No Channel Selected
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            <h1>Please, enter a chat by selecting the channel.</h1>
          </ChatMessages>
        </>
      )}

      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLelft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLelft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map(doc => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 20px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLelft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }
  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div`
  > h1 {
    position: absolute;
    left: 28%;
    text-align: center;
    margin-top: 200px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.24), 1px 2px 3px rgba(0, 0, 0, 0.12);
    width: 60%;
    color: white;
    background-color: #49274b;
    border-radius: 10px;
    padding: 10px;
  }
`;
