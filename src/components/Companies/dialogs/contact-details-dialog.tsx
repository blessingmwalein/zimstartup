"use client"

import { Fragment } from "react"
import { Dialog, Transition, Tab } from "@headlessui/react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import clsx from "clsx"
import { Mail, MapPin, AtSign } from "lucide-react"

import TextField from "../ui/text-field"
import CustomButton from "../ui/custom-button"

const zimbabwePhoneRegex = /^(?:\+263|0)?7[1-8][0-9]{7}$/;

const contactSchema = Yup.object({
  company_id: Yup.number().required("Company ID is required"),
  instagram: Yup.string().url("Please enter a valid URL"),
  linkedin: Yup.string().url("Please enter a valid URL"),
  twitter: Yup.string().url("Please enter a valid URL"),
  email: Yup.string().email("Please enter a valid email"),
  work_email: Yup.string().email("Please enter a valid email"),
  phone1: Yup.string()
    .trim()
    .matches(
      zimbabwePhoneRegex,
      "Please enter a valid Zimbabwean phone number (e.g., 0771234567 or +263771234567)"
    )
    .nullable(),
  phone2: Yup.string()
    .trim()
    .matches(
      zimbabwePhoneRegex,
      "Please enter a valid Zimbabwean phone number (e.g., 0771234567 or +263771234567)"
    )
    .nullable(),
  phone3: Yup.string()
    .trim()
    .matches(
      zimbabwePhoneRegex,
      "Please enter a valid Zimbabwean phone number (e.g., 0771234567 or +263771234567)"
    )
    .nullable(),
  address: Yup.string().required("Address is required"),
  address_city: Yup.string().required("City is required"),
  state_code: Yup.number().required("State code is required"),
  region: Yup.string().required("Region is required"),
  country: Yup.string().required("Country is required"),
});


interface ContactDetailsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialData: any
  companyId: number
  onSave: (data: any) => void
}

export default function ContactDetailsDialog({
  isOpen,
  onOpenChange,
  initialData,
  companyId,
  onSave,
}: ContactDetailsDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      company_id: companyId,
      instagram: initialData?.instagram || "https://instagram.com/",
      linkedin: initialData?.linkedin || "https://linkedin.com/",
      twitter: initialData?.twitter || "https://twitter.com/",
      email: initialData?.email || "",
      work_email: initialData?.work_email || "",
      phone1: initialData?.phone1 || "",
      phone2: initialData?.phone2 || "",
      phone3: initialData?.phone3 || "",
      address: initialData?.address || "",
      address_city: initialData?.address_city || "",
      state_code: initialData?.state_code || "",
      region: initialData?.region || "",
      country: initialData?.country || "",
    },
  })

  const onSubmit = (data: any) => onSave(data)

  const tabData = [
    { label: "Contact", icon: <Mail className="w-4 h-4" /> },
    { label: "Address", icon: <MapPin className="w-4 h-4" /> },
    { label: "Social Media", icon: <AtSign className="w-4 h-4" /> },
  ]

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onOpenChange}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Contact Details</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground mb-4">Update the contact information for this company.</Dialog.Description>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Tab.Group>
                  <Tab.List className="grid w-full grid-cols-3 border rounded-md mb-4">
                    {tabData.map((tab, i) => (
                      <Tab key={i} className={({ selected }) =>
                        clsx("flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md", selected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100")}>
                        {tab.icon}
                        {tab.label}
                      </Tab>
                    ))}
                  </Tab.List>

                  <Tab.Panels>
                    {/* Contact Tab */}
                    <Tab.Panel className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Email" placeholder="company@example.com" error={errors.email?.message} />
                          )}
                        />
                        <Controller
                          name="work_email"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Work Email" placeholder="work@example.com" error={errors.work_email?.message} />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {["phone1", "phone2", "phone3"].map((field, i) => (
                          <Controller
                            key={field}
                            name={field}
                            control={control}
                            render={({ field: controllerField }) => (
                              <TextField
                                {...controllerField}
                                label={`Phone ${i + 1}`}
                                placeholder="e.g. 0771234567"
                                error={errors[field]?.message}
                              />
                            )}
                          />
                        ))}

                      </div>
                    </Tab.Panel>

                    {/* Address Tab */}
                    <Tab.Panel className="space-y-4">
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Street Address" placeholder="123 Main St" />
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Controller
                          name="address_city"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="City" placeholder="New York" />
                          )}
                        />
                        <Controller
                          name="region"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Region" placeholder="Northeast" />
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Controller
                          name="country"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="Country" placeholder="United States" />
                          )}
                        />
                        <Controller
                          name="state_code"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label="State Code" placeholder="NY" />
                          )}
                        />
                      </div>
                    </Tab.Panel>

                    {/* Social Media Tab */}
                    <Tab.Panel className="space-y-4">
                      {["linkedin", "twitter", "instagram"].map((field) => (
                        <Controller
                          key={field}
                          name={field}
                          control={control}
                          render={({ field: controllerField }) => (
                            <TextField
                              {...controllerField}
                              label={field.charAt(0).toUpperCase() + field.slice(1)}
                              placeholder={`https://${field}.com/example`}
                              error={errors[field]?.message?.toString()}
                            />
                          )}
                        />
                      ))}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="mt-6 flex justify-end gap-2">
                  <CustomButton type="button" variant="outlined" onClick={() => onOpenChange(false)}>
                    Cancel
                  </CustomButton>
                  <CustomButton type="submit" variant="solid" isLoading={isSubmitting}>
                    Save Changes
                  </CustomButton>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
