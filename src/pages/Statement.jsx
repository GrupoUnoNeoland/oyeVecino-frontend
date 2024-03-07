import React, { useEffect, useState } from 'react';
import './Statement.css';
import { getByIdService } from '../services/service.service';
import { useParams } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { useAuth } from '../context/authContext';
import { createRating } from '../services/Rating.service';
import { TimeStamps } from '../components/TimeStamps';
import { useForm } from 'react-hook-form';
import { createMessage } from '../services/message.service';

export const Statement = () => {
  const [service, setService] = useState(null);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const { id } = useParams();
  const formDataRating = JSON.stringify({ serviceId: id, stars: rating });

  const formSubmit = async (formData) => {
    formData.type = 'service';
    console.log('FORMDATA', formData);
    setMessage(await createMessage(formData, id));
  };

  const getService = async (id) => {
    setService(null);
    const resService = await getByIdService(id);
    const service = resService.data;
    setService(service);
  };

  useEffect(() => {
    getService(id);
  }, [message]);

  useEffect(() => {
    if (rating != null) {
      createRating(formDataRating);
    }
  }, [rating]);

  useEffect(() => {
    if (message != null) {
      reset();
    }
  }, [message]);

  return (
    <div id="servicepage-container">
      {service ? (
        <div className="service_container" key={service._id}>
          <div className="service_user">
            <div className="provider-photo_container">
              <img src={service.provider[0].image} alt="" />
            </div>
            <p>{service.provider[0].name}</p>
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
                    disabled={rating != null && true}
                    onChange={(e) => setRating(e.value)}
                    cancel={false}
                  />
                </div>
                <button type="submit">Comentar</button>
              </form>
              {service?.comments.map((item, index) => (
                <div key={index} className="comment_allcoment">
                  <div className="comment_user-photo">
                    <img src={item.owner.image} alt="image-avatar" />
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
