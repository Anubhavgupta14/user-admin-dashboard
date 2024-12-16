import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import "../styles/new-user.css"
import {createUser, editUser, getUser} from "../api/endpoint"
import { toast } from 'sonner'

const CreateUpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!nameRegex.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone must be 10 digits";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchUserData = async () => {
        try {
          const response = await getUser(id);
          if (response.success) {
            const userData = response.data;
            setFormData({
              name: userData.name || '',
              phone: userData.phone || '',
              email: userData.email || '',
              image: userData.images[0] || null
            });

            // Set image preview if image exists
            if (userData.images[0]) {
              setImagePreview(userData.images[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data");
        }
      };

      fetchUserData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let errorMessage = "";
    switch(name) {
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'phone':
        // Allow only numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        errorMessage = validatePhone(numericValue);
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      default:
        break;
    }

    // Update errors
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));

    // For name and email, update as typed
    if (name !== 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image size (optional)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);

    const newErrors = {
      name: nameError,
      phone: phoneError,
      email: emailError
    };

    setErrors(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error !== "");

    if (hasErrors) {
      return;
    }

    try {
      const formInput = new FormData();
      formInput.append('name', formData.name);
      formInput.append('phone', formData.phone);
      formInput.append('email', formData.email);

      // Only append image if it's a new file
      if (formData.image instanceof File) {
        formInput.append('images', formData.image);
      }

      let res;
      if (isEditMode) {
        // For update, pass the ID
        res = await editUser(id, formInput);
      } else {
        // For create
        res = await createUser(formInput);
      }

      if (res.success) {
        const successMessage = isEditMode 
          ? "User Updated Successfully" 
          : "User Created Successfully";
        
        toast.success(successMessage);
        
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error(isEditMode 
        ? "Failed to update user" 
        : "Failed to create user"
      );
    }
    finally{
      setLoading(false)
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // Validate image size
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = (e) => {
    e.stopPropagation()
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <div className="user-list">
        <div className="user-head">
          <h4 className="main-head">
            {isEditMode ? 'Edit User' : 'Create New User'}
          </h4>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="create-user-form"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group image-upload">
            <label>Profile Picture</label>
            <div 
              className="image-drop-zone"
              onClick={triggerFileInput}
            >
              {imagePreview ? (
                <div className="image-preview-container">
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="image-preview"
                  />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="drop-zone-text">
                  Click to upload or drag and drop
                  <span>PNG, JPG up to 5MB</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Loading..." : isEditMode ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateUpdateUser;