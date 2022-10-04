import React, { useRef, useState } from 'react'
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

import {uploadImage, uploadPost} from "../../api/UploadRequests"
import { useInfoContext } from '../../context/Context';

export const PostShare = () => {

  const {user, loading, serverPublic} = useInfoContext()
  const [image, setImage] = useState(null);

  const desc = useRef();
  const imageRef = useRef();

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //post data
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
  
      // if there is an image with post
      if (image) {
        const data = new FormData();
        data.append("image", image);
        
        try {
          let res = await uploadImage(data);
          newPost.image = res.data;
        } catch (err) {
          console.log(err);
        }
      }
      await uploadPost(newPost);
      
      resetShare();      
    } catch (error) {
      console.log(error);
    }
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className='post-share'>
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        <div className="post-options">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>

          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>

          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} required/>
          </div>


        </div>
        
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  )
}
