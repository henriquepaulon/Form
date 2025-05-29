import React, { useEffect, useState } from 'react';
import styles from './CatsAccordion.module.css';

function CatsAccordion() {
  const [tags, setTags] = useState([]);
  const [cats, setCats] = useState([]);
  const [expandedTag, setExpandedTag] = useState(null);
  const [loading, setLoading] = useState({ tags: true, cats: true });
  const [error, setError] = useState(null);

  // Busca todas as tags
  useEffect(() => {
    fetch('https://cataas.com/api/tags')
      .then(res => res.json())
      .then(data => {
        const filteredTags = data.filter(tag => tag && tag.trim() !== '');
        setTags(filteredTags);
        setLoading(prev => ({ ...prev, tags: false }));
      })
      .catch(err => {
        console.error('Erro ao buscar tags:', err);
        setError('Erro ao carregar tags');
        setLoading(prev => ({ ...prev, tags: false }));
      });
  }, []);

  // Busca todos os gatos
  useEffect(() => {
    fetch('https://cataas.com/api/cats')
      .then(res => res.json())
      .then(data => {
        setCats(data);
        setLoading(prev => ({ ...prev, cats: false }));
      })
      .catch(err => {
        console.error('Erro ao buscar gatos:', err);
        setError('Erro ao carregar gatos');
        setLoading(prev => ({ ...prev, cats: false }));
      });
  }, []);

  const toggleExpand = (tag) => {
    setExpandedTag(prevTag => (prevTag === tag ? null : tag));
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (loading.tags || loading.cats) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gatos por Tag</h1>
      
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => {
          const catsWithTag = cats.filter(cat => cat.tags?.includes(tag));
          
          return (
            <div 
              key={index} 
              className={`${styles.tagCard} ${expandedTag === tag ? styles.expanded : ''}`}
            >
              <button
                className={styles.tagHeader}
                onClick={() => toggleExpand(tag)}
                aria-expanded={expandedTag === tag}
              >
                <span className={styles.tagName}>{tag}</span>
                <span className={styles.tagCount}>({catsWithTag.length})</span>
                <span className={styles.arrowIcon}>
                  {expandedTag === tag ? '▼' : '►'}
                </span>
              </button>

              {expandedTag === tag && (
                <div className={styles.tagBody}>
                  {catsWithTag.length > 0 ? (
                    <div className={styles.catsContainer}>
                      {catsWithTag.map(cat => (
                        <div key={cat.id} className={styles.catCard}>
                          <h3 className={styles.catTitle}>Gato ID: {cat.id}</h3>
                          
                          <div className={styles.catDetails}>
                            <div className={styles.detailSection}>
                              <h4>Informações Básicas</h4>
                              <ul>
                                <li><strong>ID:</strong> {cat.id}</li>
                                {cat.createdAt && (
                                  <li><strong>Criado em:</strong> {new Date(cat.createdAt).toLocaleString()}</li>
                                )}
                                {cat.mimetype && (
                                  <li><strong>Tipo:</strong> {cat.mimetype}</li>
                                )}
                              </ul>
                            </div>

                            <div className={styles.detailSection}>
                              <h4>Tags</h4>
                              <div className={styles.tagsList}>
                                {cat.tags?.map((t, i) => (
                                  <span key={i} className={styles.tagItem}>{t}</span>
                                ))}
                              </div>
                            </div>

                            <div className={styles.detailSection}>
                              <h4>Imagem</h4>
                              <div className={styles.imageWrapper}>
                                <img
                                  src={`https://cataas.com/cat/${cat.id}`}
                                  alt={`Gato ${cat.id}`}
                                  className={styles.catImage}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                                />
                                <p className={styles.imageError}>Imagem não disponível</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noCats}>Nenhum gato encontrado com esta tag</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CatsAccordion;