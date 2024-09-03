import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeChannel, setChannelModal, selectCurrentChannelId } from '../store/slice/appSlice';

const Channel = (props) => {
  const { channel } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(selectCurrentChannelId);

  const handleShowModal = (modalName) => {
    dispatch(setChannelModal({ modalName, id: channel.id, name: channel.name }));
  };

  const switchChannel = () => {
    if (channel.id !== currentChannelId) {
      dispatch(changeChannel(channel));
    }
  };

  const isActive = channel.id === currentChannelId;
  const buttonClass = isActive ? 'secondary' : '';

  return channel.removable ? (
    <ButtonGroup className="d-flex" role="group">
      <Button onClick={switchChannel} variant={buttonClass} className="w-100 rounded-0 text-start text-truncate">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant={buttonClass} id="channel-management-dropdown" className="flex-grow-0">
          <span className="visually-hidden">{t('dropdown.text')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleShowModal('remove', channel)}>{t('dropdown.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => handleShowModal('renaming', channel)}>{t('dropdown.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  ) : (
    <ButtonGroup className="d-flex" role="group">
      <Button onClick={switchChannel} variant={buttonClass} className="w-100 rounded-0 text-start text-truncate">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </ButtonGroup>
  );
};

export default Channel;
