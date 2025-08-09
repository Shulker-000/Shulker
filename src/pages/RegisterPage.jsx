import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Check} from "lucide-react";

const X = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// --- Modal Component for Terms and Privacy Policy ---
const Modal = ({ isOpen, onClose, title, children }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50%", x: "-50%", opacity: 0, scale: 0.9 },
    visible: { y: "-50%", x: "-50%", opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { y: "-50%", x: "-50%", opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 bg-white rounded-xl shadow-2xl z-50 w-[90vw] max-w-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto text-gray-600 space-y-4 text-sm">
              {children}
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <button 
                    onClick={onClose}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Register Page Component ---
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: null });

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log(backend_url);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "This field is required.";
    } else {
      delete newErrors[name];
    }

    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and privacy policy.";
    }
    return newErrors;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formErrors = validateForm();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }
  //   setErrors({});
  //   console.log("Registration successful:", formData);
  //   // TODO: Add your registration API call here
  // };


const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  setErrors({});
// username, email, password
  try {
    const res = await fetch(`${backend_url}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.firstName + formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Backend error
      alert(data.message || "Registration failed");
      return;
    }

    // Success
    alert("Registration successful! Please log in.");
    // Optionally redirect
    window.location.href = "/login";

  } catch (error) {
    console.error("Error registering:", error);
    alert("Something went wrong. Please try again later.");
  }
};



  const openModal = (type) => {
    if (type === 'terms') {
        setModalContent({
            title: "Terms and Conditions",
            content: (
                <>
                    <p>Welcome to Shulker! These terms and conditions outline the rules and regulations for the use of Shulker's Website, located at shulker.com.</p>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Shulker if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <h4 className="font-semibold text-gray-700 pt-2">License</h4>
                    <p>Unless otherwise stated, Shulker and/or its licensors own the intellectual property rights for all material on Shulker. All intellectual property rights are reserved. You may access this from Shulker for your own personal use subjected to restrictions set in these terms and conditions.</p>
                    <p>You must not: Republish material from Shulker, Sell, rent or sub-license material from Shulker, Reproduce, duplicate or copy material from Shulker, Redistribute content from Shulker.</p>
                </>
            )
        });
    } else if (type === 'privacy') {
        setModalContent({
            title: "Privacy Policy",
            content: (
                 <>
                    <p>Your privacy is important to us. It is Shulker's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                    <h4 className="font-semibold text-gray-700 pt-2">Information We Collect</h4>
                    <p>Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
                    <p>Personal Information: We may ask for personal information, such as your: Name, Email, Social media profiles, Date of birth, Phone/mobile number.</p>
                </>
            )
        });
    }
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent.title}>
        {modalContent.content}
      </Modal>

      <div className="flex min-h-screen w-full bg-gray-50 font-sans">
        <div className="flex w-full flex-1">
          {/* Left promotional panel */}
          <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 -mt-20 -ml-20 w-72 h-72 bg-white/10 rounded-full"></div>
             <div className="absolute bottom-0 right-0 -mb-24 -mr-16 w-96 h-96 bg-white/10 rounded-full"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg z-10"
            >
              <img
                src="trial1.png"
                alt="Shulker promotional banner"
                className="w-full h-auto rounded-lg object-cover animate-pulse"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'; }}
              />
              <h1 className="mt-6 text-4xl font-bold tracking-tight">
                Join Shulker Today
              </h1>
              <p className="mt-4 text-lg text-indigo-100 max-w-sm mx-auto">
                Unlock powerful collaboration tools and streamline your workflow.
              </p>
            </motion.div>
          </div>

          {/* Right registration form panel */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              className="w-full max-w-md"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="text-center lg:text-left mb-4"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Create an Account
                </h2>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${ errors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500" }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (<p className="mt-1 text-xs text-red-600">{errors.firstName}</p>)}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur}
                      className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${ errors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500" }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (<p className="mt-1 text-xs text-red-600">{errors.lastName}</p>)}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${ errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500" }`}
                      placeholder="john.doe@company.com"
                    />
                  </div>
                  {errors.email && (<p className="mt-1 text-xs text-red-600">{errors.email}</p>)}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} onBlur={handleBlur}
                      className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${ errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500" }`}
                      placeholder="Create a password"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (<EyeOff className="h-5 w-5" />) : (<Eye className="h-5 w-5" />)}
                    </button>
                  </div>
                  {errors.password ? (<p className="mt-1 text-xs text-red-600">{errors.password}</p>) : (<div className="flex items-center mt-2 text-xs text-gray-500">
                      <Check className="w-4 h-4 mr-1.5 opacity-50" /> At least 8 characters
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleInputChange} onBlur={handleBlur}
                      className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${ errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500" }`}
                      placeholder="Confirm your password"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (<EyeOff className="h-5 w-5" />) : (<Eye className="h-5 w-5" />)}
                    </button>
                  </div>
                  {errors.confirmPassword && (<p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>)}
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start pt-2">
                  <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleInputChange}
                    className={`h-4 w-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${ errors.agreeToTerms ? "border-red-500" : "border-gray-300" }`}
                  />
                  <div className="ml-3 block text-sm text-gray-700">
                    I agree to the{" "}
                    <button type="button" onClick={() => openModal('terms')} className="font-medium text-indigo-600 hover:underline focus:outline-none">
                      Terms
                    </button>{" "}
                    and{" "}
                    <button type="button" onClick={() => openModal('privacy')} className="font-medium text-indigo-600 hover:underline focus:outline-none">
                      Privacy Policy
                    </button>
                    .
                  </div>
                </motion.div>
                {errors.agreeToTerms && ( <p className="-mt-3 ml-8 text-xs text-red-600">{errors.agreeToTerms}</p> )}

                <motion.div variants={itemVariants} className="pt-2">
                  <button type="submit" className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                    Create Account <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </motion.div>

                <motion.p variants={itemVariants} className="pt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="font-medium text-indigo-600 hover:underline">
                    Sign in here
                  </a>
                </motion.p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
