import React, { useState } from "react";
import "./App.css";

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
  const [result, setResult] = useState(null);

  const handleInputChange = (matrix, setMatrix, row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const addMatrices = () => {
    const res = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
    setResult(res);
  };

  const subtractMatrices = () => {
    const res = matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
    setResult(res);
  };

  const multiplyMatrices = () => {
    const res = [
      [
        matrixA[0][0] * matrixB[0][0] + matrixA[0][1] * matrixB[1][0],
        matrixA[0][0] * matrixB[0][1] + matrixA[0][1] * matrixB[1][1],
      ],
      [
        matrixA[1][0] * matrixB[0][0] + matrixA[1][1] * matrixB[1][0],
        matrixA[1][0] * matrixB[0][1] + matrixA[1][1] * matrixB[1][1],
      ],
    ];
    setResult(res);
  };

  const calculateDeterminant = (matrix) => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  };

  const transposeMatrix = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  };

  return (
    <div className="App">
      <h1>Kalkulator Matriks 2x2</h1>
      <div className="matrix-inputs">
        <div>
          <h3>Matriks A</h3>
          {[0, 1].map((row) => (
            <div key={row} className="matrix-row">
              {[0, 1].map((col) => (
                <input
                  key={col}
                  type="number"
                  value={matrixA[row][col]}
                  onChange={(e) =>
                    handleInputChange(matrixA, setMatrixA, row, col, e.target.value)
                  }
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3>Matriks B</h3>
          {[0, 1].map((row) => (
            <div key={row} className="matrix-row">
              {[0, 1].map((col) => (
                <input
                  key={col}
                  type="number"
                  value={matrixB[row][col]}
                  onChange={(e) =>
                    handleInputChange(matrixB, setMatrixB, row, col, e.target.value)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button onClick={addMatrices}>Penjumlahan</button>
        <button onClick={subtractMatrices}>Pengurangan</button>
        <button onClick={multiplyMatrices}>Perkalian</button>
        <button onClick={() => setResult(calculateDeterminant(matrixA))}>
          Determinan A
        </button>
        <button onClick={() => setResult(transposeMatrix(matrixA))}>
          Transpos A
        </button>
      </div>

      <div className="result">
        <h3>Hasil:</h3>
        {result && Array.isArray(result) ? (
          result.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((val, j) => (
                <span key={j} className="matrix-value">
                  {val}
                </span>
              ))}
            </div>
          ))
        ) : (
          <span>{result}</span>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;