import React, { useEffect, useState } from 'react';
import styles from './CatsAccordion.module.css';

function CatsAccordion() {
  const [cats, setCats] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch('https://cataas.com/api/cats')
      .then(res => res.json())
      .then(data => setCats(data))
      .catch(err => console.error(err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Gatos</h2>
      {cats.map((cat, index) => (
        <div key={cat.id} className={styles.card}>
          <button
            className={styles.cardButton}
            onClick={() => toggleExpand(index)}
          >
            {cat.tags.length > 0 ? `Gato: ${cat.tags[0]}` : `Gato ID: ${cat.id}`}
          </button>

          {expandedIndex === index && (
            <div className={styles.cardBody}>
              <ul className={styles.tagsList}>
                {cat.tags.map((tag, idx) => (
                  <li key={idx}>{tag}</li>
                ))}
              </ul>
              <p>Criado em: {new Date(cat.createdAt).toLocaleString()}</p>
              <p>Tipo: {cat.mimetype}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CatsAccordion;
