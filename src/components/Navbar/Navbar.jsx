import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import PagesData from "../../PagesData";
import NavbarOption from "./NavbarOption";
const NavBar = () => {
  const [, setTitle] = useState(PagesData.find((val) => val.path === window.location.pathname).title);
  const navRef = useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <header>
      <i className="fas fa-bars nav-btn" onClick={showNavBar} />
      <img className='resize-fit-center' src='https://uploads-ssl.webflow.com/6321ffbc871a0f60deca5c75/639747cbae9ec699de0a2bb0_variaciones%20logo.png' />
      <nav ref={navRef}>
        {PagesData.map((page) => {
          if (page.showOnSidebar) {
            return <NavbarOption onClick={page.onClick} path={page.path} title={page.title} key={page.id} setTitle={setTitle} />;
          }
        })}
        <i className="fas fa-times nav-close-btn" onClick={showNavBar} />
      </nav>
    </header>
  );
};
export default NavBar;


// const NavBar = (props) => {
//   const navRef = useRef();
//   const showNavBar = () => {
//     navRef.current.classList.toggle("responsive_nav");
//   };
//   const role = props.role;
//   const [title, setTitle] = useState("");
//   useEffect(() => {
//     setTitle(PagesData.find((val) => val.path === window.location.pathname).title);
//   }, [window.location.pathname]);

//   return (
//     <header>
//       <i className="fas fa-bars nav-btn" onClick={showNavBar} />
//       <a href={config.Setup.linklogo}>
//         <img
//           id="logo"
//           src={props.logo}
//           alt="logo"
//           className="resize_fit_center"
//         />
//       </a>
//       <Title text={title}/>
//       <nav ref={navRef}>
//         {PagesData.map((val) => {
//           if (role !== undefined && val.roles.includes(role) && val.showOnSidebar) {
//             return (
//               <NavBarOption val={val} key={val.id}/>
//             );
//           }
//         })}
//         <i className="fas fa-times nav-close-btn" onClick={showNavBar} />
//       </nav>
//     </header>
//   );
// };
// export default NavBar;
