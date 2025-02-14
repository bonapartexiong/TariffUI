import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({ description: '', value: '' });
  const [calculationResult, setCalculationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/calculate`, 
        formData
      );
      setCalculationResult(response.data);
    } catch (error) {
      console.error('Error calculating duty:', error);
    }
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#2d3748',
        textAlign: 'center'
      }}>
        Duty Calculator
      </h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '1rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.2s',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '1rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Value ($)
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.2s',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            alignSelf: 'flex-start'
          }}
        >
          Calculate Duty
        </button>
      </form>

      {calculationResult && (
        <div style={{ 
          marginTop: '2.5rem',
          padding: '1.5rem',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#2d3748'
          }}>
            Calculation Results
          </h2>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <p><strong>Matched Description:</strong> {calculationResult.matched_description}</p>
            <p><strong>Tariff Rate:</strong> {(calculationResult.tariff * 100).toFixed(2)}%</p>
            <p><strong>Custom Duty:</strong> ${calculationResult.duty.toFixed(2)}</p>
            <p><strong>Mechandise Processing Fee:</strong> ${calculationResult.merchandise_processing_fee.toFixed(2)}</p>
            <p><strong>Habor Maintenance Fee:</strong> ${calculationResult.harbor_maintenance_fee.toFixed(2)}</p>
            <div style={{ 
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                color: '#2d3748'
              }}>
                Subtotal: ${calculationResult.subtotal.toFixed(2)}
              </h3>
              <p style={{ 
                fontSize: '0.875rem',
                color: '#718096',
                lineHeight: '1.5'
              }}>
                {calculationResult.footnote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}