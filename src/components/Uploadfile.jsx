import './Uploadfile.css';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
export const Uploadfile = ({ registerForm, type, multipleUpload = false }) => {
  const { register, handleSubmit } = useForm();
  const ekUpload = () => {
    const Init = () => {
      var fileSelect = document.getElementById('file-upload');
      fileSelect.addEventListener('change', fileSelectHandler, false);
    };

    const fileDragHover = (e) => {
      let fileDrag = document.getElementById('file-drag');

      e.stopPropagation();
      e.preventDefault();

      fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
    };

    const fileSelectHandler = (e) => {
      // Fetch FileList object
      let files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);
      if (multipleUpload) {
        let thumbnailsContainer = document.getElementById('thumbnails-container');
        thumbnailsContainer.innerHTML = '';
      }
      // Process all File objects
      for (let i = 0, f; (f = files[i]); i++) {
        parseFile(f);
      }
    };

    // Output
    const output = (msg) => {
      // Response
      let m = document.getElementById('messages');
      m.innerHTML = msg;
    };

    function parseFile(file) {
      output('<strong>' + encodeURI(file.name) + '</strong>');
      let imageName = file.name;

      let isGood = /\.(?=gif|jpg|png|jpeg|pdf)/gi.test(imageName);
      if (isGood) {
        document.getElementById('start').classList.add('hidden');
        document.getElementById('response').classList.remove('hidden');
        document.getElementById('notimage').classList.add('hidden');
        if (multipleUpload) {
          // Create thumbnail element
          let thumbnail = document.createElement('img');
          thumbnail.src = URL.createObjectURL(file);
          thumbnail.classList.add('thumbnail');

          // Append thumbnail to container
          let thumbnailsContainer = document.getElementById('thumbnails-container');
          thumbnailsContainer.appendChild(thumbnail);
        } else {
          // For single upload, display the selected image
          document.getElementById('file-image').classList.remove('hidden');
          document.getElementById('file-image').src = URL.createObjectURL(file);
        }
      } else {
        document.getElementById('file-image').classList.add('hidden');
        document.getElementById('notimage').classList.remove('hidden');
        document.getElementById('start').classList.remove('hidden');
        document.getElementById('response').classList.add('hidden');
        document.getElementById('file-upload-form').reset();
      }
    }
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  };

  useEffect(() => {
    ekUpload();
  });

  return (
    <div id="file-upload-form" className="uploader">
      <input
        id="file-upload"
        type="file"
        name="image"
        accept="image/*,.pdf"
        multiple={multipleUpload}
        {...registerForm}
      />

      <label htmlFor="file-upload" id="file-drag">
        {multipleUpload && (
          <div id="thumbnails-container" className="thumbnails-container"></div>
        )}
        <img id="file-image" src="#" alt="Preview" className="hidden" />
        <div id="start">
          <i
            className={type == 'image' ? 'fa fa-image' : 'fa fa-download'}
            aria-hidden="true"
          ></i>
          <div className="divSelect">Select a {type} or drag here</div>
          <div id="notimage" className="hidden">
            Please select an file
          </div>
          <span id="file-upload-btn" className="hidden btn btn-primary">
            Select a file
          </span>
        </div>
        <div id="response" className="hidden">
          <div id="messages"></div>
        </div>
      </label>
    </div>
  );
};
