import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '../api/chatApi.js';

const HeaderMessageContainer = () => {
  const { t } = useTranslation();
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const { data: messages } = useGetMessagesQuery();
  const filteredMessages = messages?.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannelName}`}</b>
      </p>
      <span className="text-muted">
        {t('countMessages.amount_of_messages', { count: filteredMessages?.length })}
      </span>
    </div>
  );
};

export default HeaderMessageContainer;
