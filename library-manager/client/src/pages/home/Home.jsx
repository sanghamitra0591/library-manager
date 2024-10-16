import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="banner">
        <h1>Welcome to Book Heaven</h1>
        <p>Your gateway to knowledge and adventure!</p>
      </div>

      <main className="main-content">
        <section className="features">
          <h2>Explore Our Collection</h2>
          <div className="feature-boxes">
            <div className="feature" onClick={()=>navigate("/books")}>
              <h3>📚 Extensive Collection</h3>
              <p>Discover thousands of books across various genres.</p>
            </div>
            <div className="feature" onClick={()=>navigate("/about")}>
              <h3>🌍 Community Events (Coming Soon)</h3>
              <p>Join us for workshops, readings, and more!</p>
            </div>
            <div className="feature" onClick={()=>navigate("/about")}>
              <h3>💡 Study Spaces</h3>
              <p>Enjoy quiet and comfortable spaces for studying.</p>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Join Us Today!</h2>
          <p>Sign up to access exclusive resources and events.</p>
          <button className="join-button" onClick={()=>navigate("/signup")}>Join Now</button>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Library Management System</p>
      </footer>
    </div>
  );
};

export default Home;






















































// import React from 'react';
// import './Home.css'; // Make sure to include the CSS for styling

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="banner">
//         <h1>Welcome to Our Library</h1>
//         <p>Your gateway to knowledge and adventure!</p>
//       </div>

//       <main className="main-content">
//         <section className="features">
//           <h2>Explore Our Collection</h2>
//           <div className="feature-boxes">
//             <div className="feature">
//               <h3>📚 Extensive Collection</h3>
//               <p>Discover thousands of books across various genres.</p>
//             </div>
//             <div className="feature">
//               <h3>🌍 Community Events</h3>
//               <p>Join us for workshops, readings, and more!</p>
//             </div>
//             <div className="feature">
//               <h3>💡 Study Spaces</h3>
//               <p>Enjoy quiet and comfortable spaces for studying.</p>
//             </div>
//           </div>
//         </section>

//         <section className="call-to-action">
//           <h2>Join Us Today!</h2>
//           <p>Sign up to access exclusive resources and events.</p>
//           <button className="join-button">Join Now</button>
//         </section>
//       </main>

//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} Library Management System</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;
