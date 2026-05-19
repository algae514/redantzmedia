import { useMemo, useState } from 'react';

const SERVICE_CATEGORIES = [
  {
    id: 'venue',
    label: 'Venue and Decor',
    description: 'Luxury venue styling, floral concepts, stage design.',
    basePrice: 4500,
  },
  {
    id: 'catering',
    label: 'Catering and Desserts',
    description: 'Curated menu experiences, live stations, dessert bars.',
    basePrice: 3800,
  },
  {
    id: 'photo',
    label: 'Photography and Films',
    description: 'Cinematic coverage, same-day edits, premium albums.',
    basePrice: 3200,
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    description: 'Live bands, DJs, choreography, artist management.',
    basePrice: 2600,
  },
  {
    id: 'bridal',
    label: 'Bridal Styling',
    description: 'Makeup artists, wardrobe assistance, styling team.',
    basePrice: 2400,
  },
  {
    id: 'hospitality',
    label: 'Guest Hospitality and Logistics',
    description: 'Guest management, transfers, welcome desk operations.',
    basePrice: 2200,
  },
];

function WeddingQuotation() {
  const [coupleName, setCoupleName] = useState('');
  const [eventType, setEventType] = useState('destination');
  const [guestCount, setGuestCount] = useState(250);
  const [selectedCategories, setSelectedCategories] = useState([
    'venue',
    'catering',
    'photo',
  ]);
  const [premiumExperience, setPremiumExperience] = useState(true);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const selectedCategoryDetails = useMemo(
    () =>
      SERVICE_CATEGORIES.filter((category) =>
        selectedCategories.includes(category.id)
      ),
    [selectedCategories]
  );

  const eventMultiplier = eventType === 'destination' ? 1.35 : 1.1;
  const premiumMultiplier = premiumExperience ? 1.2 : 1;

  const estimatedTotal = useMemo(() => {
    const baseCategoryCost = selectedCategoryDetails.reduce(
      (sum, category) => sum + category.basePrice,
      0
    );
    const guestFactor = guestCount * 18;
    return Math.round(
      (baseCategoryCost + guestFactor) * eventMultiplier * premiumMultiplier
    );
  }, [
    selectedCategoryDetails,
    guestCount,
    eventMultiplier,
    premiumMultiplier,
  ]);

  const planningFee = Math.round(estimatedTotal * 0.1);
  const taxes = Math.round(estimatedTotal * 0.08);
  const grandTotal = estimatedTotal + planningFee + taxes;

  return (
    <section className="wedding-quotation-page">
      <div className="wq-hero">
        <div className="wq-hero-copy">
          <p className="wq-eyebrow">Wedding Quotations</p>
          <h2>Craft a luxury wedding experience</h2>
          <p>
            Build a tailored quote with advanced category selection, curated
            add-ons, and instant premium pricing guidance.
          </p>
        </div>
        <div className="wq-hero-metrics">
          <div>
            <span>Active Services</span>
            <strong>{selectedCategoryDetails.length}</strong>
          </div>
          <div>
            <span>Guest Volume</span>
            <strong>{guestCount}</strong>
          </div>
          <div>
            <span>Experience Tier</span>
            <strong>{premiumExperience ? 'Premium' : 'Standard'}</strong>
          </div>
        </div>
      </div>

      <div className="wq-grid">
        <article className="wq-card">
          <h3>Event Profile</h3>

          <label>
            Couple Name
            <input
              value={coupleName}
              onChange={(event) => setCoupleName(event.target.value)}
              placeholder="e.g. Aarya and Rohan"
            />
          </label>

          <label>
            Wedding Type
            <select
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
            >
              <option value="destination">Destination Wedding</option>
              <option value="classic">Classic City Wedding</option>
            </select>
          </label>

          <label>
            Guest Count
            <span className="input-hint">{guestCount} guests</span>
            <input
              className="range-input"
              type="range"
              min="50"
              max="800"
              step="10"
              value={guestCount}
              onChange={(event) => setGuestCount(Number(event.target.value))}
            />
          </label>

          <label className="toggle-row premium-toggle">
            <input
              type="checkbox"
              checked={premiumExperience}
              onChange={(event) => setPremiumExperience(event.target.checked)}
            />
            <span>
              Include premium concierge experience
              <small>Dedicated planners, wedding command center, guest helpline.</small>
            </span>
          </label>
        </article>

        <article className="wq-card">
          <h3>Advanced Service Categories</h3>
          <div className="category-list">
            {SERVICE_CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category.id);

              return (
                <label
                  key={category.id}
                  className={`category-item ${isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span>
                    <strong>{category.label}</strong>
                    <small>{category.description}</small>
                    <em>Starts at ${category.basePrice.toLocaleString()}</em>
                  </span>
                </label>
              );
            })}
          </div>
        </article>
      </div>

      <article className="wq-card wq-quote">
        <h3>Estimated Quotation</h3>
        <p>
          Prepared for{' '}
          <strong>{coupleName.trim() ? coupleName : 'your celebration'}</strong>
        </p>
        <ul className="quote-points">
          <li>Wedding Type: {eventType === 'destination' ? 'Destination' : 'Classic City'}</li>
          <li>Guest Count: {guestCount}</li>
          <li>Selected Categories: {selectedCategoryDetails.length}</li>
          <li>Experience Tier: {premiumExperience ? 'Premium Concierge' : 'Standard'}</li>
        </ul>
        <div className="quote-breakdown">
          <div>
            <span>Base Package</span>
            <strong>${estimatedTotal.toLocaleString()}</strong>
          </div>
          <div>
            <span>Planning Fee</span>
            <strong>${planningFee.toLocaleString()}</strong>
          </div>
          <div>
            <span>Taxes and Compliance</span>
            <strong>${taxes.toLocaleString()}</strong>
          </div>
        </div>
        <div className="quote-total">
          Estimated Grand Total: <strong>${grandTotal.toLocaleString()}</strong>
        </div>
        <button type="button" className="quote-cta">
          Request Detailed Proposal
        </button>
      </article>
    </section>
  );
}

export default WeddingQuotation;
