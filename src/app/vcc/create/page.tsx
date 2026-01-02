"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import MainLayout from "@/components/Layouts/MainLayout";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Instagram, 
  Linkedin, 
  Twitter, 
  User, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle
} from "lucide-react";
import CustomButton from "@/components/Buttons/CustomButton";
import { createVCC, uploadLogo } from "@/state/thunks/vccThunks";
import { selectCreatingVCC, selectUploadingLogo } from "@/state/slices/vccSlice";
import { toast } from "react-toastify";
import Stepper from "@/components/common/Stepper";

const steps = ["Basic Information", "Contact Details", "Social Media & Logo"];

export default function CreateVCCPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const creating = useSelector(selectCreatingVCC);
  const uploading = useSelector(selectUploadingLogo);

  const [currentStep, setCurrentStep] = useState(0);
  const [createdVCCId, setCreatedVCCId] = useState<number | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    // Basic Information
    vcc_name: "",
    vcc_abbreviations: "",
    vcc_short_description: "",
    region: "",
    country: "",
    
    // Contact Details
    contact_person: "",
    email: "",
    phone_number: "",
    address: "",
    
    // Social Media
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const newErrors: any = {};

    if (currentStep === 0) {
      if (!formData.vcc_name) newErrors.vcc_name = "VCC name is required";
      if (!formData.vcc_abbreviations) newErrors.vcc_abbreviations = "Abbreviation is required";
      if (!formData.vcc_short_description) newErrors.vcc_short_description = "Description is required";
      if (!formData.region) newErrors.region = "Region is required";
      if (!formData.country) newErrors.country = "Country is required";
    } else if (currentStep === 1) {
      if (!formData.contact_person) newErrors.contact_person = "Contact person is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone_number) newErrors.phone_number = "Phone number is required";
      if (!formData.address) newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const vccData = {
      vcc_name: formData.vcc_name,
      vcc_abbreviations: formData.vcc_abbreviations,
      vcc_short_description: formData.vcc_short_description,
      region: formData.region,
      country: formData.country,
      contact_person: formData.contact_person,
      email: formData.email,
      phone_number: parseInt(formData.phone_number) || 0,
      address: formData.address,
      instagram: formData.instagram || "",
      linkedin: formData.linkedin || "",
      twitter: formData.twitter || "",
    };

    const result = await dispatch(createVCC(vccData));
    
    if (result.success) {
      toast.success("VCC created successfully!");
      setCreatedVCCId(result.vccId);
      setCurrentStep(currentStep + 1);
    } else {
      toast.error(result.error || "Failed to create VCC");
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile || !createdVCCId) {
      router.push("/vcc");
      return;
    }

    const result = await dispatch(uploadLogo(createdVCCId, logoFile));
    
    if (result.success) {
      toast.success("Logo uploaded successfully!");
      router.push("/vcc");
    } else {
      toast.error(result.error || "Failed to upload logo");
    }
  };

  const handleSkipLogo = () => {
    router.push("/vcc");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about your Value Creation Challenge</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VCC Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="vcc_name"
                  value={formData.vcc_name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.vcc_name ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Old Mutual Value Creation Challenge"
                />
              </div>
              {errors.vcc_name && <p className="mt-1 text-sm text-red-500">{errors.vcc_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Abbreviation *
              </label>
              <input
                type="text"
                name="vcc_abbreviations"
                value={formData.vcc_abbreviations}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.vcc_abbreviations ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., OMVCC"
              />
              {errors.vcc_abbreviations && <p className="mt-1 text-sm text-red-500">{errors.vcc_abbreviations}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="vcc_short_description"
                  value={formData.vcc_short_description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full rounded-lg border ${errors.vcc_short_description ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Describe your VCC program..."
                />
              </div>
              {errors.vcc_short_description && <p className="mt-1 text-sm text-red-500">{errors.vcc_short_description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${errors.region ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Global">Global</option>
                  </select>
                </div>
                {errors.region && <p className="mt-1 text-sm text-red-500">{errors.region}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Zimbabwe"
                />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Details</h2>
              <p className="text-gray-600">How can participants reach you?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.contact_person ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Full name"
                />
              </div>
              {errors.contact_person && <p className="mt-1 text-sm text-red-500">{errors.contact_person}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="email@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="+263 XXX XXX XXX"
                />
              </div>
              {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Full address"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Media & Logo</h2>
              <p className="text-gray-600">Add your social links (optional) and logo</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram URL
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter URL
              </label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/yourprofile"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Logo</h2>
              <p className="text-gray-600">Add your VCC logo (optional)</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain rounded-lg" />
                ) : (
                  <Upload className="h-12 w-12 text-gray-400" />
                )}
              </div>

              <label className="cursor-pointer rounded-lg bg-white border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Logo
              </label>
              {logoFile && (
                <p className="mt-2 text-sm text-gray-600">{logoFile.name}</p>
              )}
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">VCC Created Successfully!</p>
                  <p className="text-sm text-blue-700 mt-1">
                    You can upload a logo now or skip and do it later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout footerVariant="small">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Stepper */}
            <div className="mb-8">
              <Stepper headings={steps} currentStep={currentStep} />
            </div>

            {/* Form Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                {currentStep > 0 && currentStep < 3 && (
                  <CustomButton
                    type="button"
                    variant="outlined"
                    onClick={handleBack}
                    disabled={creating || uploading}
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Back
                  </CustomButton>
                )}

                {currentStep < 2 && (
                  <CustomButton
                    type="button"
                    variant="solid"
                    onClick={handleNext}
                    className="ml-auto"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </CustomButton>
                )}

                {currentStep === 2 && (
                  <CustomButton
                    type="button"
                    variant="solid"
                    onClick={handleSubmit}
                    disabled={creating}
                    className="ml-auto"
                  >
                    {creating ? "Creating..." : "Create VCC"}
                  </CustomButton>
                )}

                {currentStep === 3 && (
                  <div className="flex gap-4 ml-auto">
                    <CustomButton
                      type="button"
                      variant="outlined"
                      onClick={handleSkipLogo}
                      disabled={uploading}
                    >
                      Skip
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="solid"
                      onClick={handleLogoUpload}
                      disabled={!logoFile || uploading}
                    >
                      {uploading ? "Uploading..." : "Upload & Finish"}
                    </CustomButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
