// src/Formulario.js
import React from 'react';

function Formulario() {
  return (
    <div>
      <h2>Formulário</h2>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
