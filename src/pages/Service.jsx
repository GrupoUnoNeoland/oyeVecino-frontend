import React, { useEffect, useState } from 'react';
import './Service.css';
import { getByIdService } from '../services/service.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { useAuth } from '../context/authContext';
import { createRating } from '../services/Rating.service';
import { TimeStamps } from '../components/TimeStamps';
import { useForm } from 'react-hook-form';
import { createMessage } from '../services/message.service';

export const Service = () => {
  const [service, setService] = useState(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { register: registerChat, handleSubmit: handleSubmitChat } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const formDataRating = JSON.stringify({ serviceId: id, stars: String(rating) });

  const formSubmit = async (formData) => {
    formData.type = 'service';

    setMessage(await createMessage(formData, id));
  };

  const getService = async (id) => {
    const resService = await getByIdService(id);
    const service = resService?.data;
    setService(service);
  };
  const checkUserRating = () => {
    if (service != null) {
      const ratingUser = service?.starReview?.find(
        (rating) => rating.userServiceTaker[0]._id == user._id,
      );

      ratingUser ? setRating(ratingUser?.stars) : setRating(0);
    }
  };
  const handleClickChat = () => {
    setShowInput(true);
  };
  const formSubmitChat = async (formData) => {
    formData.type = 'private';

    const resMessage = await createMessage(formData, service?.provider[0]?._id);
    const chatId = resMessage?.data?.chat?._id;

    navigate(`/chat?id=${service?.provider[0]?._id}&chatId=${chatId}`);
  };

  const handleRating = async () => {
    await createRating(formDataRating);
  };

  useEffect(() => {
    getService(id);
  }, [message]);

  useEffect(() => {
    if (rating != 0) {
      handleRating();
      getByIdService(id);
    }
  }, [rating]);

  useEffect(() => {
    if (message != null) {
      reset();
    }
  }, [message]);

  useEffect(() => {
    checkUserRating();
  }, [service]);

  return (
    <div id="servicepage-container">
      {service ? (
        <div className="service_container" key={service._id}>
          <div className="service_user">
            <div className="provider-photo_container">
              <img src={service.provider[0]?.image} alt="" />
            </div>
            <p>{service.provider[0]?.name}</p>
          </div>
          <div className="service_container-body">
            <h2 className="service_title">{service.title}</h2>
            <div className="service_description">
              <p>{service.description}</p>
            </div>
            <p className="service_photos-title">FOTOS</p>
            {service.images.map((image, index) => (
              <div key={index} className="service-photo_container">
                <img src={image} alt="image" />
              </div>
            ))}
            <div className="comments_container">
              <button onClick={() => handleClickChat(service?.provider[0]?._id)}>
                Chat privado
              </button>
              {showInput && (
                <form onSubmit={handleSubmitChat(formSubmitChat)}>
                  <div className="input-container">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      onClick={() => reset()}
                      {...registerChat('content', { required: true })}
                    />
                    <button>Enviar</button>
                  </div>
                </form>
              )}
              <h2>Comentário Público</h2>
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
                <div className="comment_stars">
                  <Rating
                    value={rating}
                    disabled={rating != 0 ? true : false}
                    onChange={(e) => setRating(e.value)}
                    cancel={false}
                  />
                </div>
                <button type="submit">Comentar</button>
              </form>
              {service?.comments.map((item, index) => (
                <div key={index} className="comment_allcoment">
                  <div className="comment_user-photo">
                    <img src={item?.owner?.image} alt="image-avatar" />
                  </div>
                  <div className="comment_infos">
                    <div className="comment_text">{item?.content}</div>
                    <TimeStamps createdAt={item?.createdAt} />
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
