import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { getById } from '../../services/user.service';
import './Chat.css';
import React, { useEffect, useState } from 'react';
import { createMessage } from '../../services/message.service';
import { useForm } from 'react-hook-form';
import { Register } from '../Register';
import { TimeStamps } from '../../components/TimeStamps';

export const Chat = () => {
  const [provider, setProvider] = useState();
  const [userLogged, setUserLogged] = useState();
  const [activeChat, setActiveChat] = useState();
  const [resMessage, setResMessage] = useState();
  const [chatId, setChatId] = useState();
  const [recipientMessageId, setRecipientMessageId] = useState();
  const [messageSend, setMessageSend] = useState(false);
  console.log('activeChat:', activeChat);
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();
  //console.log('🚀userLogged:', userLogged);
  //console.log('activeChat:', activeChat);
  //console.log('resMe', resMessage);
  // console.log('2', chatId);
  //console.log('6', userLogged);
  //console.log('8', recipientMessageId);
  //console.log('9', activeChat);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idProvider = queryParams.get('id');
  const chatIdParams = queryParams.get('chatId');

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
    //console.log('4');
    if (resUserLogged?.status == 200) {
      //console.log('5');
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
    //console.log('7', chatId);

    setRecipientMessageId(recipientId);
    setActiveChat(userLogged?.chats?.find((chat) => chat?._id == chatId));
  };

  useEffect(() => {
    if (idProvider) {
      getByIdProvider(idProvider);
      getByIdUserLogged(user._id);
    } else {
      getByIdUserLogged(user._id);
    }
    //getByIdUserLogged(user._id);
  }, []);

  useEffect(() => {
    if (chatIdParams) {
      //console.log('1', chatIdParams);
      setChatId(chatIdParams);
    }
  }, []);
  useEffect(() => {
    if (chatId) {
      //console.log('3', chatId);
      getByIdUserLogged(user._id);
      //handleClickChatItem(chatId, idProvider);
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
      //console.log('useEfUserLogged');
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
        <header>
          <h2>Tus Chats</h2>
        </header>
        {userLogged?.chats?.map((chat) =>
          chat?.userOne[0]?._id == user?._id ? (
            <div
              className="chat-item"
              key={chat._id}
              onClick={() => handleClickChatItem(chat._id, chat?.userTwo[0]._id)}
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
              <h2>{chat?.userOne[0]?.name}</h2>
            </div>
          ),
        )}
      </aside>
      <div className="main-content">
        {activeChat ? (
          activeChat?.userOne[0]?._id == user?._id ? (
            <section className="messages-container">
              <header>
                <div className="image-provider-container">
                  <img
                    src={activeChat?.userTwo[0]?.image}
                    alt={activeChat?.userTwo[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h2>{activeChat?.userTwo[0]?.name}</h2>
              </header>
              {activeChat?.messages?.map((message) => (
                <div className="message-container" key={message._id}>
                  <p>{message?.content}</p>
                  <TimeStamps createdAt={message?.createdAt} />
                </div>
              ))}
            </section>
          ) : (
            <section className="messages-container">
              <header>
                <div className="image-provider-container">
                  <img
                    src={activeChat?.userOne[0]?.image}
                    alt={activeChat?.userOne[0]?.name}
                    className="image-provider"
                  />
                </div>
                <h2>{activeChat?.userOne[0]?.name}</h2>
              </header>
              {activeChat?.messages?.map((message) => (
                <div className="message-container" key={message._id}>
                  <p>{message?.content}</p>
                  <TimeStamps createdAt={message?.createdAt} />
                </div>
              ))}
            </section>
          )
        ) : null}

        <footer>
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
        </footer>
      </div>
    </div>
  );
};
