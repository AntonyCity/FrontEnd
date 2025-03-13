
const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        
        <div className="home__stats">
          <div className="home__stats-card">
            <p>Positions ouvertes</p>
            <h2>34</h2>
          </div>
          <div className="home__stats-card">
            <p>Applications reçus</p>
            <h2>542</h2>
          </div>
        </div>

        <section className="home__offers">
          <h2>Dernières offres mises en ligne</h2>
          <div className="home__offers-list">
            {/* Offer card #1 */}
            <div className="home__offer-card">
              <span className="home__offer-tag">Autre</span>
              <div className="home__offer-image">Visuelle avec description sur l'offre</div>
              <p className="home__offer-title">Chargé de projet opérationnel cités éducatives</p>
              <p className="home__offer-category">Catégorie A</p>
            </div>
            {/* Offer card #2 */}
            <div className="home__offer-card">
              <span className="home__offer-tag">CDD</span>
              <div className="home__offer-image">Blalalialalala</div>
              <p className="home__offer-title">Agent de propreté voirie polyvalent H/F</p>
              <p className="home__offer-category">Catégorie C</p>
            </div>
            {/* Offer card #3 */}
            <div className="home__offer-card">
              <span className="home__offer-tag">Stage</span>
              <div className="home__offer-image">Blalalialalala</div>
              <p className="home__offer-title">Référent jsdfjhdsgdqgf qushfrshgbu</p>
              <p className="home__offer-category">Catégorie B</p>
            </div>
          </div>
          <a href="#" className="home__offers-link">Voir toutes les offres</a>
        </section>
      </div>
    </div>
  );
};

export default Home;
