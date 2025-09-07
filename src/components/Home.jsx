const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Artiste Doodles</h1>
        <p>Your one-stop solution for creative doodling!</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-section">
          <h2>Discover Amazing Doodles</h2>
          <p>
            Explore our collection of doodles, create your own, and share them
            with the world!
          </p>
          <p>Join our community of artists and doodlers today!</p>
        </div>

        <div className="content-section">
          <h2>Start Creating</h2>
          <p>
            Unleash your creativity with our easy-to-use doodling tools and
            templates.
          </p>
          <p>Get inspired by our featured artists and their unique styles.</p>
        </div>

        <div className="content-section">
          <h2>Join the Community</h2>
          <p>
            Connect with fellow artists, share your work, and get feedback
            from the community.
          </p>
          <p>Learn new techniques and improve your doodling skills.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Start Doodling?</h2>
        <p>Browse our products and begin your creative journey today!</p>
        <a href="/products" className="cta-button">
          Explore Products
        </a>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2023 Artiste Doodles. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
