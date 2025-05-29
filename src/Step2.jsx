import React, { useEffect, useState } from 'react';

export default function Step2({ data, updateData }) {
  const [nome, setNome] = useState(data.nome || '');
  const [sobrenome, setSobrenome] = useState(data.sobrenome || '');
  const [dataNascimento, setDataNascimento] = useState(data.dataNascimento || '');

  const [errors, setErrors] = useState({
    nome: false,
    sobrenome: false,
    dataNascimento: false,
  });

  useEffect(() => {
    const nomeValid = nome.trim() !== '';
    const sobrenomeValid = sobrenome.trim() !== '';
    const dataNascimentoValid = dataNascimento.trim() !== '';

    setErrors({
      nome: !nomeValid,
      sobrenome: !sobrenomeValid,
      dataNascimento: !dataNascimentoValid,
    });

    const formValid = nomeValid && sobrenomeValid && dataNascimentoValid;

    updateData(
      { nome, sobrenome, dataNascimento },
      formValid
    );
  }, [nome, sobrenome, dataNascimento, updateData]);

  return (
    <div>
      <div>
        <label>Nome (obrigatório):</label><br />
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{ borderColor: errors.nome ? 'red' : nome ? 'green' : undefined }}
        />
        {errors.nome && <p style={{ color: 'red' }}>Preencha o nome</p>}
      </div>

      <div>
        <label>Sobrenome (obrigatório):</label><br />
        <input
          type="text"
          value={sobrenome}
          onChange={e => setSobrenome(e.target.value)}
          style={{ borderColor: errors.sobrenome ? 'red' : sobrenome ? 'green' : undefined }}
        />
        {errors.sobrenome && <p style={{ color: 'red' }}>Preencha o sobrenome</p>}
      </div>

      <div>
        <label>Data de nascimento (obrigatória):</label><br />
        <input
          type="date"
          value={dataNascimento}
          onChange={e => setDataNascimento(e.target.value)}
          style={{ borderColor: errors.dataNascimento ? 'red' : dataNascimento ? 'green' : undefined }}
        />
        {errors.dataNascimento && <p style={{ color: 'red' }}>Preencha a data de nascimento</p>}
      </div>
    </div>
  );
}
