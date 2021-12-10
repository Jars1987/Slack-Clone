import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../state/features/appSlice';

function SiderbarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      await addDoc(collection(db, 'rooms'), { name: channelName });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon fontSize='small' style={{ padding: 8 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SideBarOptionChanel>
          <span>#</span> {title}
        </SideBarOptionChanel>
      )}
    </SidebarOptionContainer>
  );
}

export default SiderbarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionChanel = styled.h3`
  padding: 10px 0;
  font-weight: 300; ;
`;