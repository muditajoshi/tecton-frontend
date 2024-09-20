import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import { BrowserRouter as Router} from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect,useState } from 'react';
import TagManager from 'react-gtm-module'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import OnScreenPopup from './components/onScreenPopup';
// import "./fonts/alt-gothic-cond-med.otf";
// import "./fonts/aktivgrotesk.otf";
import(/* webpackPreload: true */ './fonts/alt-gothic-cond-med.otf');
import(/* webpackPreload: true */ './fonts/aktivgrotesk.otf');
import(/* webpackPreload: true */ './fonts/aktivgrotesklight.otf');
import(/* webpackPreload: true */ './fonts/aktivgroteskExt.otf');
import(/* webpackPreload: true */ './fonts/aktiv-grotesk-Ext-Medium.otf');
import(/* webpackPreload: true */ './fonts/alt-gothic-alt.otf');
import(/* webpackPreload: true */ './fonts/aktiv-regular.otf');
// import "./fonts/aktivgrotesklight.otf"
// import "./fonts/aktivgroteskExt.otf"
// import ReactGA from "react-ga4"

// ReactGA.initialize("G-E60G6C7Z7N")

// GTM code integration
const tagManagerArgs = {
  gtmId: 'GTM-KSNBFFQ'
}


// const tagManagerArgs = {
//   gtmId: 'GTM-K98RZT4'
// }
TagManager.initialize(tagManagerArgs)

function App({history}) {
  const [userCheck, setUser] = useState(

    JSON.parse(localStorage?.getItem("userInfo"))

  ); //convert to object



 if(JSON.parse(localStorage.getItem("userInfo"))){
  const expJwt = JSON.parse(

    atob(JSON.stringify(userCheck?.accessToken).split(".")[1])

  );

  const dateNow = Math.round(Date.now() / 1000);

  if (expJwt.exp < dateNow) {

    localStorage.removeItem("userInfo");

    history.push("/login");

  }

  // console.log(expJwt.exp);

  // console.log(Math.round(Date.now() / 1000));
 }
 window.dataLayer.push({
  event: 'pageview'
});

useEffect(() => {
  // Detect the user's operating system
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isWindows = /Windows/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  // Add classes to the HTML element based on the detected OS
  if (isIOS) {
    document.documentElement.classList.add('ios');
  }

  if (isWindows) {
    document.documentElement.classList.add('windows');
  }

  if (isAndroid) {
    document.documentElement.classList.add('android');
  }

  // Clean up classes on unmount (optional)
  return () => {
    document.documentElement.classList.remove('ios');
    document.documentElement.classList.remove('windows');
    document.documentElement.classList.remove('android');
  };
}, []);

const pagePointerEvents = useSelector((state)=>state.pageStatusChange);
  return (<div style={{pointerEvents:`${pagePointerEvents}`}}>
    
    <Router>
    <Header/>
    <Body/>
    {/* <OnScreenPopup/> */}
    <Footer/>
    </Router>
    
    </div>
  );
}

export default App;
