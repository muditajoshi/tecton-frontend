import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import YellowLineAmb from "../images/newshop/YellowLineAmb.png";
import YellowLineAmbdesk from "../images/newshop/yellowline_amb_desk.png";
import followerIcon from "../images/newshop/Ellipse 8.png";

const AmbasdorCarousel= ({ firstName , description , image , linkToTheAmbassador , socialMedia , whyTecton , history}) => {
  return (
    <div>
       <div className="imageContainer_ambassador_mobile" >
        <img src={image} alt={firstName} />
      </div>
      <div className="carouselItem">
          <div className="imageContainer_ambassador_desktop">
              <img src={image} alt={firstName} />
          </div>
          <div className='infocontainer_background'>
        <div className="infoContainer">
           <h2>{firstName}</h2>
           </div>
           <img className='yellowline_amb_mobile' src={YellowLineAmb}/>
          <img className='yellowline_amb_desk' src={YellowLineAmbdesk}/>
          <div className="infoContainer2">
           <h5>{description}</h5>
           <p>{whyTecton}</p>
           <a href={linkToTheAmbassador}><button>SEE HOW {firstName.toUpperCase()} USES TECTON </button></a>
           <div className='followerscontent'>
            <div>
             <img  className="followericon" src={ followerIcon  } />
            </div>
             <div className='followers'>{socialMedia?.followers} FOLLOWERS</div>
           </div>
        </div>
        </div>
        </div>
      </div>
  )
}

export default AmbasdorCarousel;
