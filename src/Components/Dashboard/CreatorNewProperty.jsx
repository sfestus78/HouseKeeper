import React, { useState } from 'react';
import { ArrowLeft, Upload, MapPin, DollarSign } from 'lucide-react';

const CreatorNewProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: '',
    price: '',
    description: '',
    amenities: [],
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating property:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="creatordashboard-container" style={{ backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            <ArrowLeft style={{ width: '24px', height: '24px', color: '#6b7280' }} />
          </button>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', fontFamily: 'Lato, sans-serif' }}>
              Create New Property
            </h1>
            <p style={{ color: '#6b7280', fontFamily: 'Lato, sans-serif', marginTop: '4px' }}>
              Add a new property to your portfolio
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Basic Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', fontFamily: 'Lato, sans-serif' }}>
                Basic Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'Lato, sans-serif', outline: 'none' }}
                    placeholder="Enter property name"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                    Property Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'Lato, sans-serif', outline: 'none' }}
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                  Address
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9ca3af' }} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{ width: '100%', paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'Lato, sans-serif', outline: 'none' }}
                    placeholder="Enter full address"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                  Monthly Rent
                </label>
                <div style={{ position: 'relative' }}>
                  <DollarSign style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9ca3af' }} />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ width: '100%', paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'Lato, sans-serif', outline: 'none' }}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'Lato, sans-serif', outline: 'none', resize: 'vertical' }}
                  placeholder="Describe your property..."
                />
              </div>
            </div>

            {/* Image Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', fontFamily: 'Lato, sans-serif' }}>
                Property Images
              </h2>

              <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <Upload style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px', fontFamily: 'Lato, sans-serif' }}>
                  Upload Property Images
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '16px', fontFamily: 'Lato, sans-serif' }}>
                  Drag and drop images here, or click to browse
                </p>
                <button
                  type="button"
                  style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', fontFamily: 'Lato, sans-serif', cursor: 'pointer', transition: 'background-color 0.2s' }}
                >
                  Choose Files
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  style={{ padding: '12px 32px', border: '1px solid #d1d5db', color: '#374151', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Lato, sans-serif', transition: 'background-color 0.2s' }}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px 32px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif', transition: 'background-color 0.2s' }}
                >
                  Create Property
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatorNewProperty;