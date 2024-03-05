import './AdminProfile.css';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { useLoginError } from '../hooks';
import { loginUser, toggleCity, updateAdressCheck, updateUser, toggleNeighborhoodInUser } from '../services/user.service';

import { getAllCity } from '../services/city.service';
import { deleteRequest, getAllRequest, toggleCityInRequest, toggleNeighborhoodInRequest, updateRequest } from '../services/request.service';

export const AdminProfile = () => {
  const { register, handleSubmit } = useForm();
  // const [send, setSend] = useState(false);
  // const [res, setRes] = useState({});
  // const [loginOk, setLoginOk] = useState(false);
  const { login, setUser, user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);  
  const [neighborhoodSelected, setNeighborhoodSelected] = useState("");
  console.log("neighborhoodSelected",neighborhoodSelected)
  console.log("citySelected",citySelected)
  console.log("requests",requests)
  // console.log(neighborhoods)

  const getRequests = async () => {
    const resRequests = await getAllRequest()
    const allRequests = resRequests.data.dataUpdate
    const waitingRequests = allRequests.filter(request => request.state == "waiting")
    setRequests(waitingRequests)
    // console.log(allRequests)
  }

  const getCities = async () => {
    const resCity = await getAllCity()
    const cities = resCity.data.dataUpdate
    setCities(cities)
    console.log(cities)
  }

  const getNeighborhoods = (citySelected) => {
    console.log("oi")
    const allCity = cities.find(city => city._id == citySelected)
    console.log("nei",allCity?.neighborhoods)
    setNeighborhoods(allCity?.neighborhoods)
  }

  const handleClickRequest = async (state, requestId, userId) => {
    const formDataRequest = JSON.stringify({state: state})
    const formDataNeighborhoodUser = JSON.stringify({neighborhoods: neighborhoodSelected})
    const formDataCityUser = JSON.stringify({city: citySelected})
    const formDataNeighborhoodRequest = JSON.stringify({neighborhoodId: neighborhoodSelected})
    const formDataCityRequest = JSON.stringify({cityId: citySelected})
    const formDataUserUpdate = JSON.stringify({state: state == "accepted" ? true : false})
    if(state == "accepted") {
      await updateRequest(formDataRequest, requestId)
      await toggleNeighborhoodInUser(formDataNeighborhoodUser, userId)
      await toggleCity(formDataCityUser, userId)
      await toggleNeighborhoodInRequest(requestId, formDataNeighborhoodRequest)
      await toggleCityInRequest(requestId, formDataCityRequest)
      await updateAdressCheck(formDataUserUpdate, userId)
      console.log(state, requestId)
    } else if(state == "rejected") {      
      await updateAdressCheck(formDataUserUpdate, userId)
      await deleteRequest(requestId)
    }
  }

  const toggleNeighborhood = async (formData, userId) => {
    await toggleNeighborhood()
  }

  // const formSubmit = async (formData) => {
  //   console.log('FORMDATA', formData);
  //   setSend(true);
  //   setRes(await loginUser(formData));
  //   setSend(false);
  // };

  // useEffect(() => {
  //   console.log(res);
  //   useLoginError(res, setRes, login, setLoginOk);
  // }, [res]);

  // useEffect(() => {
  //   setUser(() => null);
  //   localStorage.removeItem('user');
  // }, []);

   useEffect(() => {
    getCities()
    getRequests()
    console.log(user)
  }, []);

  useEffect(() => {
    getNeighborhoods(citySelected)
  }, [citySelected]);

  // if (loginOk) {
  //   if (res.data?.user?.confirmationCodeChecked == false) {
  //     return <Navigate to="/checkCode" />;
  //   } else {
  //     return <Navigate to="/dashboard" />;
  //   }
  // }
  return (
    <div id="profile-container">
       {requests.length > 0 && requests.map(request => (
      <div key={request._id} className="request_container">
          <img className="request__user-photo" src={request.user[0].image} alt={request.user[0].name} />
          <div className="request-info">
            <p>usuario: {request.user[0].name}</p>
            <p>state: {request.state}</p>
            <a href={request.document} target='_blank'>Documento</a>
          </div>
          <div className="request-btns">
            <button onClick={() => handleClickRequest("accepted", request._id, request.user[0]._id)}>Aprobar</button>
            <button onClick={() => handleClickRequest("rejected", request._id, request.user[0]._id)}>Rechazar</button>
          </div>
        <div className="request__city-neighborhood-buttons">
          <div className="city_select">
          <label htmlFor="city" className="city_select__label  select-label">Ciudade</label>
            <select id="city_select__input"  name="city" onClick={(e) => setCitySelected(e.target.value)} {...register('city', { required: true })}>
              {cities && cities?.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
            </select>
          </div>
          <div className="neighborhood_select">
            <label htmlFor="neighborhood" className="neighborhood_select__label select-label">Barrio</label>
              <select id="neighborhood_select__input" onClick={(e) => setNeighborhoodSelected(e.target.value)}  name="neighborhood" {...register('neighborhoods', { required: true })}>
                {neighborhoods?.length > 0 && neighborhoods?.map((neighborhood) => <option key={neighborhood?._id} value={neighborhood?._id}>{neighborhood?.name}</option>)}
              </select>
          </div>
        </div>
      </div>
      ))
    }
      {/* <div className="form-wrap">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
          </div>
          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#4b4848' : '#000000'  }}
            >
              LOGIN
            </button>
          </div>
          <div>
            <p className="bottom-text">
              <small>Have you forgotten the password?</small>
            </p>
            <p className="bottom-text">
              <small>
                <Link to="/forgotpassword" className="anchorCustom">
                  Change password
                </Link>
              </small>
            </p>
          </div>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">Are you not registered?</p>
        <p className="parrafoLogin">
          <Link to="/register">Register Here</Link>
        </p>
      </div> */}
    </div>
  );
};
