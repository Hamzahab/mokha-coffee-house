'use client';

export function SkeletonGrid() {
  return (
    <>
      <section className="featured-section">
        <div className="featured-header">
          <div className="order-skeleton-line w40 skeleton-heading" />
        </div>
        <div className="featured-scroll">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="order-skeleton-featured" />
          ))}
        </div>
      </section>

      <div className="order-cat-nav">
        <div className="order-cat-pills skeleton-pills-pad">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="order-skeleton-pill" />
          ))}
        </div>
      </div>

      <div className="order-grid-body">
        {[1, 2].map((section) => (
          <section key={section} className="order-cat-section">
            <div className="order-skeleton-line w40 skeleton-section-heading" />
            <div className="order-items-grid">
              {[1, 2, 3, 4].map((card) => (
                <div key={card} className="order-skeleton-card">
                  <div className="order-skeleton-info">
                    <div className="order-skeleton-line w80" />
                    <div className="order-skeleton-line w40" />
                    <div className="order-skeleton-line w60" />
                  </div>
                  <div className="order-skeleton-thumb" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
