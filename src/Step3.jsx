import React, { useEffect, useState } from 'react';

export default function Step3({ data, updateData }) {
  const [endereco, setEndereco] = useState(data.endereco || '');

  const [error, setError] = useState(false); // começa sem erro

  useEffect(() => {
    const enderecoHasText = endereco.trim() !== '';

    // mostra erro só se digitou e está vazio
    setError(endereco !== '' && !enderecoHasText);

    // para formulário ser válido, endereço precisa estar preenchido
    updateData(
      { endereco },
      enderecoHasText
    );
  }, [endereco, updateData]);

  return (
    <div>
      <div>
        <label>Endereço completo (obrigatório):</label><br />
        <textarea
          rows={3}
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
          style={{ borderColor: error ? 'red' : endereco ? 'green' : undefined, width: '100%' }}
        />
        {error && <p style={{ color: 'red' }}>Preencha o endereço completo</p>}
      </div>
    </div>
  );
}
