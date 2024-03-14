import './Chat.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { getById } from '../../services/user.service';
import React, { useEffect, useState } from 'react';
import { createMessage } from '../../services/message.service';
import { useForm } from 'react-hook-form';
import { TimeStamps } from '../../components/TimeStamps';

export const Chat = () => {
  const [provider, setProvider] = useState();
  const [userLogged, setUserLogged] = useState();
  const [activeChat, setActiveChat] = useState();
  const [resMessage, setResMessage] = useState();
  const [chatId, setChatId] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [recipientMessageId, setRecipientMessageId] = useState();
  const [messageSend, setMessageSend] = useState(false);
  console.log('activeChat:', activeChat);
  const { register, handleSubmit, reset } = useForm();
  console.log(isMobile);

  const { user } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idProvider = queryParams.get('id');
  const chatIdParams = queryParams.get('chatId');

  const checkWindowWidth = () => {
    let windowWidth = window.innerWidth;
    setIsMobile(() => (windowWidth <= 700 ? true : false));
  };

  const getByIdProvider = async (id) => {
    setProvider(null);
    const resProvider = await getById(id);

    if (resProvider?.status == 200) {
      const provider = resProvider.data;
      setProvider(provider);
    }
  };

  const getByIdUserLogged = async (id) => {
    const resUserLogged = await getById(id);

    if (resUserLogged?.status == 200) {
      const userLogged = resUserLogged.data;
      setUserLogged(userLogged);
    }
  };
  const formSubmit = async (formData) => {
    formData.type = 'private';

    setResMessage(await createMessage(formData, recipientMessageId));
    setMessageSend(true);
  };

  const handleClickChatItem = (chatId, recipientId) => {
    // if (!isMobile) {
    setRecipientMessageId(recipientId);
    setActiveChat(userLogged?.chats?.find((chat) => chat?._id == chatId));
    // } else {
    //   console.log('MB');
    // }
  };

  useEffect(() => {
    if (idProvider) {
      getByIdProvider(idProvider);
      getByIdUserLogged(user._id);
    } else {
      getByIdUserLogged(user._id);
    }
  }, []);

  useEffect(() => {
    if (chatIdParams) {
      setChatId(chatIdParams);
    }
    checkWindowWidth();
  }, []);

  useEffect(() => {
    if (chatId) {
      getByIdUserLogged(user._id);
    }
  }, [chatId]);

  useEffect(() => {
    if (messageSend) {
      getByIdUserLogged(user._id);
      handleClickChatItem(activeChat?._id, recipientMessageId);
      setMessageSend(false);
    }
  }, [messageSend]);

  useEffect(() => {
    if (userLogged) {
      chatId
        ? handleClickChatItem(chatId, idProvider)
        : handleClickChatItem(activeChat?._id, recipientMessageId);
    }
  }, [userLogged]);

  useEffect(() => {
    if (resMessage != null) {
      reset();
      setResMessage(null);
    }
  }, [resMessage]);

  return (
    <div id="chat_container">
      <aside className="actives-chats-container">
        <div className="chats-container-header">
          <h2>Tus Chats</h2>
        </div>
        <div className="chats">
          {userLogged?.chats?.map((chat) =>
            chat?.userOne[0]?._id == user?._id ? (
              <div
                className="chat-item"
                key={chat._id}
                onClick={() => handleClickChatItem(chat._id, chat?.userOne[0]._id)}
              >
                <div className="image-provider-container">
                  <img
                    src={chat?.userTwo[0]?.image}
                    alt={chat?.userTwo[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h2>{chat?.userTwo[0]?.name}</h2>
              </div>
            ) : (
              <div
                className="chat-item"
                key={chat._id}
                onClick={() => handleClickChatItem(chat._id, chat?.userOne[0]._id)}
              >
                <div className="image-provider-container">
                  <img
                    src={chat?.userOne[0]?.image}
                    alt={chat?.userOne[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h3>{chat?.userOne[0]?.name}</h3>
              </div>
            ),
          )}
        </div>
      </aside>

      {activeChat ? (
        activeChat?.userOne[0]?._id == user?._id ? (
          <div className="main-content">
            <section className="messages-container">
              <div className="messages-header-container">
                <button className="messages-header-btn" onClick={() => setActiveChat()}>
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="image-provider-container">
                  <img
                    src={activeChat?.userTwo[0]?.image}
                    alt={activeChat?.userTwo[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h2>{activeChat?.userTwo[0]?.name}</h2>
              </div>
              <div className="messages">
                {activeChat?.messages?.map((message) => (
                  <div
                    className={
                      message?.owner == user._id
                        ? 'message-container message-container--right'
                        : 'message-container message-container--left'
                    }
                    key={message._id}
                  >
                    <p className="message-content">{message?.content}</p>
                    <TimeStamps createdAt={message?.createdAt} />
                  </div>
                ))}
              </div>
              <div className="messages-footer-container">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="input-container">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      onClick={() => reset()}
                      {...register('content', { required: true })}
                    />
                    <button>Enviar</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        ) : (
          <div className="main-content">
            <section className="messages-container">
              <div className="messages-header-container">
                <div className="image-provider-container">
                  <img
                    src={activeChat?.userOne[0]?.image}
                    alt={activeChat?.userOne[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h2>{activeChat?.userOne[0]?.name}</h2>
              </div>
              <div className="messages">
                {activeChat?.messages?.map((message) => (
                  <div
                    className={
                      message?.owner == user._id
                        ? 'message-container message-container--right'
                        : 'message-container message-container--left'
                    }
                    key={message._id}
                  >
                    <p className="message-content">{message?.content}</p>
                    <TimeStamps createdAt={message?.createdAt} />
                  </div>
                ))}
              </div>
              <div className="messages-footer-container">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="input-container">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      onClick={() => reset()}
                      {...register('content', { required: true })}
                    />
                    <button>Enviar</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        )
      ) : null}
    </div>
  );
};
