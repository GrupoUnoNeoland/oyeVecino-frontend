import React, { useEffect, useState } from 'react';
import './Statement.css';
import { getByIdStatements } from '../services/Statement.service';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

import { TimeStamps } from '../components/TimeStamps';
import { useForm } from 'react-hook-form';
import { createMessage } from '../services/message.service';
import { toggleLikeInStatement } from '../services/Statement.service';

export const Statement = () => {
  const [statement, setStatement] = useState(null);
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { id } = useParams();

  console.log(user);

  const checkUserLike = () => {
    if (statement != null) {
      console.log(statement.likes);
      const likeUser = statement?.likes.find((like) => like._id == user._id);
      likeUser ? setLike(true) : setLike(false);
    }
  };

  const formSubmit = async (formData) => {
    console.log(formData);
    formData.type = 'statement';
    setMessage(await createMessage(formData, id));
  };

  const getStatement = async (id) => {
    console.log('getStatemnt');

    const resStatement = await getByIdStatements(id);

    if (resStatement.status == 200) {
      const statementData = resStatement.data;
      console.log(resStatement);
      setStatement(statementData);
    } else {
      getStatement(id);
    }
  };

  const handleLikeClick = async (e) => {
    e.preventDefault();
    const formDataLike = JSON.stringify({ statementsFav: user._id });
    await toggleLikeInStatement(id, formDataLike);

    if (statement.likes?.find((item) => item._id == user._id)) {
      setStatement((valor) => {
        const updateLike = valor?.likes?.filter((item) => item._id != user._id);
        console.log(updateLike);
        return { ...valor, likes: updateLike };
      });
      getStatement(id);
    } else {
      setStatement((valor) => ({ ...valor, likes: [...valor.likes, user] }));
      getStatement(id);
    }
    setLike(!like);
  };

  useEffect(() => {
    getStatement(id);
  }, [message]);

  // useEffect(() => {
  //   getStatement(id);
  // }, [like]);

  useEffect(() => {
    checkUserLike();
  }, [statement]);

  useEffect(() => {
    if (message != null) {
      reset();
    }
  }, [message]);

  return (
    <div id="statementpage-container">
      {statement ? (
        <div className="statement_container" key={statement._id}>
          <div className="statement_user">
            <div className="owner-photo_container">
              <img src={statement?.owner[0]?.image} alt="" />
            </div>
            <p>{statement?.owner[0]?.name}</p>
          </div>
          <div className="statement_container-body">
            <h2 className="statement_title">{statement?.title}</h2>
            <div className="statement_description">
              <p>{statement?.description}</p>
            </div>
            <p className="statement_photos-title">FOTOS</p>
            {statement?.images?.map((image, index) => (
              <div key={index} className="statement-photo_container">
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
              <p>{statement?.likes?.length}</p>
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

              {statement?.comments.map((item, index) => (
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
