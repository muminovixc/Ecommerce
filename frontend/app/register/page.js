// Register.js
'use client';
import React, { useState } from 'react';
import '../../stylesheet/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    user_type:'',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ime je obavezno';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Prezime je obavezno';
    }

    if (!formData.email) {
      newErrors.email = 'Email je obavezan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nije validan';
    }

    if (!formData.password) {
      newErrors.password = 'Lozinka je obavezna';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Lozinka mora imati najmanje 6 karaktera';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Potvrdite lozinku';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Lozinke se ne podudaraju';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Morate prihvatiti uslove korištenja';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Submitting registration with data:", formData);
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include'
  });
  console.log("Response received from server:", response);

  if (response.ok) {
    window.location.href = '/homepage';
  }
  const text = await response.text();

  
  let data;
  try {
    data = JSON.parse(text);
   
  } catch {
    throw new Error("Server returned HTML instead of JSON");
  }

  if (!response.ok) {
    throw new Error(data.error || "Greška pri registraciji");
  }

  
  
  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    user_type:"",
    confirmPassword: "",
    agreeToTerms: false
  });

} catch (err) {
  console.error("Registration error:", err);
  alert(err.message);
} finally {
  setIsLoading(false);
}

  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registracija</h2>
        <p className="form-subtitle">Kreirajte svoj račun</p>
        
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Ime</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Unesite vaše ime"
                disabled={isLoading}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Prezime</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Unesite vaše prezime"
                disabled={isLoading}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Unesite vaš email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
  <label htmlFor="user_type">Tip korisnika</label>
  <select
    id="user_type"
    name="user_type"
    value={formData.user_type}
    onChange={handleChange}
    className={errors.user_type ? 'error' : ''}
    disabled={isLoading}
  >
    <option value="">-- Odaberite tip --</option>
    <option value="Seller">Seller</option>
    <option value="Buyer">Buyer</option>
  </select>
  {errors.user_type && <span className="error-message">{errors.user_type}</span>}
</div>


          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Unesite vašu lozinku"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Potvrdi lozinku</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Ponovite vašu lozinku"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Prihvatam <a href="/terms" className="terms-link">uslove korištenja</a> i <a href="/privacy" className="terms-link">politiku privatnosti</a>
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? 'Registrujem...' : 'Registruj se'}
            
          </button>
        </form>

        <div className="register-links">
          <p>
            Već imate račun? <a href="/login">Prijavite se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;