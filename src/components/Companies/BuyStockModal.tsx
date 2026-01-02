"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DollarSign, X, ShoppingCart } from "lucide-react";
import CustomButton from "@/components/Buttons/CustomButton";
import { buyStock } from "@/state/services/stock";
import { toast } from "react-toastify";

interface BuyStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number;
  companyName: string;
  nationalId: string;
}

export default function BuyStockModal({
  isOpen,
  onClose,
  companyId,
  companyName,
  nationalId,
}: BuyStockModalProps) {
  const [quantity, setQuantity] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!quantity || Number(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setLoading(true);

    try {
      const result = await buyStock({
        national_id: nationalId,
        stock_id: companyId,
        quantity: Number(quantity),
      });

      toast.success(result.message || "Stock purchased successfully!");
      setQuantity("");
      onClose();
    } catch (error: any) {
      console.error("Error buying stock:", error);
      toast.error(
        error.response?.data?.detail || "Failed to purchase stock"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setQuantity("");
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      Buy Stock
                    </Dialog.Title>
                    <button
                      onClick={handleClose}
                      disabled={loading}
                      className="rounded-lg p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-50"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-emerald-100">
                    Invest in {companyName}
                  </p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Company Info */}
                    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm">
                          <ShoppingCart className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-600">
                            Investing in
                          </p>
                          <p className="font-semibold text-gray-900">
                            {companyName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Input */}
                    <div>
                      <label
                        htmlFor="quantity"
                        className="mb-2 block text-left text-sm font-medium text-gray-700"
                      >
                        Number of Shares
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="quantity"
                          type="number"
                          min="1"
                          step="1"
                          placeholder="Enter quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          disabled={loading}
                          className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                      <p className="mt-1 text-left text-xs text-gray-500">
                        Minimum: 1 share
                      </p>
                    </div>

                    {/* Info Box */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Your investment will be processed
                        immediately. Please ensure you have sufficient funds in
                        your wallet.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex space-x-3 border-t border-gray-200 px-6 py-4">
                  <CustomButton
                    type="button"
                    variant="solid"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading || !quantity || Number(quantity) <= 0}
                    isLoading={loading}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy {quantity || "0"} Share{Number(quantity) !== 1 ? "s" : ""}
                      </>
                    )}
                  </CustomButton>
                  <CustomButton
                    type="button"
                    variant="outlined"
                    fullWidth
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancel
                  </CustomButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
