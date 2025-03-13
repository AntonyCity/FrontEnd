
const PertinentOffers = () => {
  return (
    <div className="pertinentOffers">
      {/* Header Section */}
      <div className="pertinentOffers__header">
        <h1>Offres Pertinentes</h1>
        <a href="#" className="pertinentOffers__allOffersLink">
          Voir toutes les offres
        </a>
      </div>

      {/* Refine Search Section */}
      <div className="pertinentOffers__refine">
        <h2>Refine your search</h2>
        <div className="pertinentOffers__buttons">
          <button className="pertinentOffers__clearBtn">Clear Filters</button>
          <button className="pertinentOffers__applyBtn">Apply Filters</button>
        </div>

        <div className="pertinentOffers__filters">
          <div className="pertinentOffers__filterGroup">
            <p>Category</p>
            <div className="pertinentOffers__chips">
              <button>Electronics</button>
              <button>Clothing</button>
              <button>Home Goods</button>
            </div>
          </div>

          <div className="pertinentOffers__filterGroup">
            <p>Price Range</p>
            <div className="pertinentOffers__chips">
              <button>$0 - $50</button>
              <button>$50 - $100</button>
              <button>$100+</button>
            </div>
          </div>

          <div className="pertinentOffers__filterGroup">
            <p>Brand</p>
            <div className="pertinentOffers__chips">
              <button>Brand A</button>
              <button>Brand B</button>
              <button>Brand C</button>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="pertinentOffers__offers">
        <div className="pertinentOffers__offersList">
          {/* Offer Card #1 */}
          <div className="pertinentOffers__offerCard">
            <span className="pertinentOffers__offerTag">Autre</span>
            <div className="pertinentOffers__offerImage">
              Visuelle avec description sur l'offre
            </div>
            <p className="pertinentOffers__offerTitle">
              Chargé de projet opérationnel cités éducatives
            </p>
            <p className="pertinentOffers__offerCategory">Catégorie A</p>
          </div>

          {/* Offer Card #2 */}
          <div className="pertinentOffers__offerCard">
            <span className="pertinentOffers__offerTag">CDD</span>
            <div className="pertinentOffers__offerImage">Blalalialalala</div>
            <p className="pertinentOffers__offerTitle">
              Agent de propreté voirie polyvalent H/F
            </p>
            <p className="pertinentOffers__offerCategory">Catégorie C</p>
          </div>

          {/* Offer Card #3 */}
          <div className="pertinentOffers__offerCard">
            <span className="pertinentOffers__offerTag">Stage</span>
            <div className="pertinentOffers__offerImage">Blalalialalala</div>
            <p className="pertinentOffers__offerTitle">
              Référent jsdfjhdsgdqgf qushfrshgbu
            </p>
            <p className="pertinentOffers__offerCategory">Catégorie B</p>
          </div>

          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default PertinentOffers;
