import React, { useEffect, useState } from 'react';
import './Event.css';
import { getByIdEvents, toggleLikeInEvent } from '../services/Events.service';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { TimeStamps } from '../components/TimeStamps';
import { useForm } from 'react-hook-form';
import { createMessage } from '../services/message.service';

export const Event = () => {
  const [event, setEvent] = useState(null);
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { id } = useParams();
  console.log(user);

  const checkUserLike = () => {
    if (event != null) {
      console.log(event.likes);
      const likeUser = event?.likes.find((like) => like._id == user._id);
      likeUser ? setLike(true) : setLike(false);
    }
  };

  const formSubmit = async (formData) => {
    console.log(formData);
    formData.type = 'event';
    setMessage(await createMessage(formData, id));
  };

 const getEvent = async (id) => {
    console.log('getEvent');

    const resEvent = await getByIdEvents(id);

    if (resEvent.status == 200) {
      const eventData = resEvent.data;
      console.log(resEvent);
      setEvent(eventData);
    } else {
      getEvent(id);
    }
  };

  const handleLikeClick = async () => {
    const formDataLike = JSON.stringify({ eventsFav: user._id });
    await toggleLikeInEvent(id, formDataLike);

     if (event.likes?.find((item) => item._id == user._id)) {
      setEvent((value) => {
        const updateLike = value?.likes?.filter((item) => item._id != user._id);
        console.log(updateLike);
        return { ...value, likes: updateLike };
      });
      getEvent(id);
    } else {
      setEvent((value) => ({ ...value, likes: [...value.likes, user] }));
      getEvent(id);
    }
    setLike(!like);
  };
  

  useEffect(() => {
    getEvent(id);
  }, [message]);

  useEffect(() => {
    checkUserLike();
  }, [event]);

  useEffect(() => {
    if (message != null) {
      reset();
    }
  }, [message]);

  return (
    <div id="eventpage-container">
      {event ? (
        <div className="event_container" key={event._id}>
          <div className="event_user">
            <div className="organizer-photo_container">
              <img src={event?.organizer[0]?.image} alt="" />
            </div>
            <p>{event?.organizer[0]?.name}</p>
          </div>
          <div className="event_container-body">
            <h2 className="event_title">{event?.title}</h2>
            <div className="event_description">
              <p>{event?.description}</p>
            </div>
            <p className="event_photos-title">FOTOS</p>
            {event?.images?.map((image, index) => (
              <div key={index} className="event-photo_container">
                <img src={image} alt="image" />
              </div>
            ))}
            <div className="like_button_container">
              <button
                className={like ? 'like-button liked' : 'like-button'}
                onClick={(e) => handleLikeClick(e)}
              >
                <span role="img" aria-label="heart" className="heart-icon">
                  &#x2665;
                </span>
              </button>
              <p>{event?.likes?.length}</p>
            </div>
            <div className="comments_container">
              <h2>Comentario Público</h2>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="comment_input">
                  <div className="comment_avatar">
                    <img src={user.image} alt="image-user" />
                  </div>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    onClick={() => reset()}
                    {...register('content', { required: true })}
                  />
                </div>
                <button type="submit">Comentar</button>
              </form>
              
              {event?.comments.map((item, index) => (
                <div key={index} className="comment_allcoment">
                  <div className="comment_user-photo">
                    <img src={item.organizer.image} alt="image-avatar" />
                  </div>
                  <div className="comment_infos">
                    <div className="comment_text">{item.content}</div>
                    <TimeStamps createdAt={item.createdAt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
    );
};