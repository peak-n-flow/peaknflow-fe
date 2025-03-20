"use client";

import type React from "react";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ fullName: "", contactInfo: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-8">
        <label htmlFor="fullName" className="text-gray-300 text-sm">
          Full Name
        </label>
        <input
          autoComplete="off"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-secondary-60 py-2 text-gray-100 focus:outline-none focus:border-primary-60"
          required
        />
      </div>

      <div className="mb-8">
        <label htmlFor="contactInfo" className="text-gray-300 text-sm">
          Phone Number/ Email
        </label>
        <input
          autoComplete="off"
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-secondary-60 py-2 text-gray-100 focus:outline-none focus:border-primary-60"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="text-gray-300 text-sm">
          Messages
        </label>
        <textarea
          autoComplete="off"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-secondary-60 py-2 text-gray-100 focus:outline-none focus:border-primary-60 resize-none"
          rows={2}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 border border-primary-60 text-primary-60 hover:bg-primary-20 transition-colors rounded-lg"
      >
        Send
      </button>
    </form>
  );
}
