import React, { useState, useCallback } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './MultiStepForm.module.css';

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    senhaConfirma: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    endereco: '',
  });

  const [errors, setErrors] = useState([true, true, true]);
  const [submitted, setSubmitted] = useState(false);

  const updateData = useCallback((newData, stepIndex, isValid) => {
    setFormData(prev => ({ ...prev, ...newData }));

    setErrors(prev => {
      const newErrors = [...prev];
      newErrors[stepIndex] = !isValid;
      return newErrors;
    });
  }, []);

  const updateStep1 = useCallback((data, valid) => updateData(data, 0, valid), [updateData]);
  const updateStep2 = useCallback((data, valid) => updateData(data, 1, valid), [updateData]);
  const updateStep3 = useCallback((data, valid) => updateData(data, 2, valid), [updateData]);

  const nextStep = () => {
    if (!errors[step] && step < 2) {
      setStep(step + 1);
    }
  };

  const allValid = errors.every(err => err === false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allValid) {
      setSubmitted(true);
    } else {
      alert('Preencha todas as etapas corretamente antes de enviar.');
    }
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <h2>Formulário enviado com sucesso! 🎉</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Formulário de Cadastro</h1>

      <div className={styles.tabs}>
        {['Conta', 'Dados Pessoais', 'Endereço'].map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`${styles.tabButton} ${step === i ? styles.active : ''}`}
          >
            {label}
            {errors[i] ? (
              <span className={styles.icon} style={{ color: 'red' }}>⚠️</span>
            ) : (
              <span className={styles.icon} style={{ color: 'green' }}>✔️</span>
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <Step1 data={formData} updateData={updateStep1} />
        )}
        {step === 1 && (
          <Step2 data={formData} updateData={updateStep2} />
        )}
        {step === 2 && (
          <Step3 data={formData} updateData={updateStep3} />
        )}

        <div style={{ marginTop: 20 }}>
          {step < 2 && (
            <button type="button" onClick={nextStep} disabled={errors[step]}>
              Avançar
            </button>
          )}
          <button type="submit" disabled={!allValid} style={{ marginLeft: 10 }}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
