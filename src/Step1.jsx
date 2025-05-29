import React, { useEffect, useState } from 'react';

export default function Step1({ data, updateData }) {
  const [email, setEmail] = useState(data.email || '');
  const [senha, setSenha] = useState(data.senha || '');
  const [senhaConfirma, setSenhaConfirma] = useState(data.senhaConfirma || '');

  const [errors, setErrors] = useState({
    email: true,
    senha: false,
    senhaConfirma: false
  });

  useEffect(() => {
    const emailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const senhaValid = emailValid ? senha.length >= 6 : true;
    const senhaConfirmaValid = emailValid ? senhaConfirma === senha && senhaConfirma !== '' : true;

    // Atualiza erros só se mudar, para evitar render loops
    setErrors(prevErrors => {
      const newErrors = {
        email: !emailValid,
        senha: !senhaValid,
        senhaConfirma: !senhaConfirmaValid,
      };

      // Verifica se houve mudança real nos erros antes de atualizar
      if (
        prevErrors.email === newErrors.email &&
        prevErrors.senha === newErrors.senha &&
        prevErrors.senhaConfirma === newErrors.senhaConfirma
      ) {
        return prevErrors;
      }
      return newErrors;
    });

    // Atualiza dados e validação no pai
    updateData(
      { email, senha, senhaConfirma },
      emailValid && senhaValid && senhaConfirmaValid
    );
  }, [email, senha, senhaConfirma, updateData]);

  return (
    <div>
      <div>
        <label>Email (obrigatório):</label><br />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            borderColor: email === ''
              ? undefined
              : errors.email
                ? 'red'
                : 'green'
          }}
        />
        {email !== '' && errors.email && (
          <p style={{ color: 'red' }}>Email inválido</p>
        )}
      </div>

      <div>
        <label>Senha (obrigatório, min 6 caracteres):</label><br />
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          style={{ borderColor: errors.senha ? 'red' : 'green' }}
          disabled={!email.trim()}
        />
        {errors.senha && <p style={{ color: 'red' }}>Senha inválida</p>}
      </div>

      <div>
        <label>Confirmação de senha (obrigatório):</label><br />
        <input
          type="password"
          value={senhaConfirma}
          onChange={e => setSenhaConfirma(e.target.value)}
          style={{ borderColor: errors.senhaConfirma ? 'red' : 'green' }}
          disabled={!email.trim()}
        />
        {errors.senhaConfirma && <p style={{ color: 'red' }}>As senhas não coincidem</p>}
      </div>
    </div>
  );
}
