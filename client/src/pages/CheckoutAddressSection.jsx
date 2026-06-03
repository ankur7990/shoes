import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createAddress,
  updateAddress,
  getAddresses,
} from "../api/addressService";
import { handleApiError } from "../api/errorHandler";
import toast from "react-hot-toast";

const CheckoutAddressSection = ({
  addresses = [],
  setAddresses,
  selectedAddressId,
  setSelectedAddressId,
}) => {
  const { user } = useAuth();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setIsEditOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress({
      street: "",
      area: "",
      society_name: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      location: "",
      address_type: "Home",
    });
    setIsEditOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveAddress = async () => {
    try {
      if (!editingAddress) return;

      const payload = {
        street: editingAddress.street,
        area: editingAddress.area,
        society_name: editingAddress.society_name,
        landmark: editingAddress.landmark,
        city: editingAddress.city,
        state: editingAddress.state,
        pincode: editingAddress.pincode,
        location: editingAddress.location,
        address_type: editingAddress.address_type || "Home",
      };

      if (editingAddress.id) {
        await updateAddress(editingAddress.id, payload);
      } else {
        await createAddress(payload);
      }

      const res = await getAddresses();
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.results)
          ? res.data.results
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

      setAddresses(list);

      if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }

      setIsEditOpen(false);
      setEditingAddress(null);
      toast.success("Address saved");
    } catch (error) {
      console.log("save address error:", error.response?.data);
      handleApiError(error);
    }
  };

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const res = await getAddresses();
  //       console.log("address response:", res.data);

  //       const list = Array.isArray(res.data)
  //         ? res.data
  //         : Array.isArray(res.data?.results)
  //           ? res.data.results
  //           : Array.isArray(res.data?.data)
  //             ? res.data.data
  //             : [];

  //       setAddresses(list);

  //       if (list.length > 0) {
  //         setSelectedAddressId(list[0].id);
  //       }
  //     } catch (error) {
  //       console.log("address error:", error.response?.data);
  //       handleApiError(error);
  //     }
  //   };

  //   fetchAddresses();
  // }, []);

  return (
    <>
      <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Ship To</h2>

          <button
            type="button"
            onClick={handleAddNewAddress}
            className="text-sm text-[#43e77f] hover:underline"
          >
            + Add New Address
          </button>
        </div>

        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((address, index) => {
              const active = selectedAddressId === address.id;

              return (
                <div
                  key={address.id}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    active
                      ? "border-[#43e77f] bg-white/10"
                      : "border-white/20 bg-white/5"
                  }`}
                  onClick={() => handleSelectAddress(address)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={active}
                      onChange={() => handleSelectAddress(address)}
                      className="mt-1 accent-[#43e77f]"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold">
                          {/* Address {index + 1} */}
                          {address.address_type || "Address"}
                        </h3>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(address);
                          }}
                          className="text-sm text-[#43e77f] hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      <p className="mt-2 text-sm text-white/80">
                        {address.street}
                      </p>
                      <p className="text-sm text-white/80">{address.area}</p>
                      <p className="text-sm text-white/80">
                        {address.society_name}
                      </p>
                      <p className="text-sm text-white/80">
                        {address.landmark}
                      </p>
                      <p className="text-sm text-white/80">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-white/70">
                        {address.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/70">No saved addresses found.</p>
          )}
        </div>
      </div>

      {isEditOpen && editingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#111827] p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {editingAddress.id ? "Edit Address" : "Add Address"}
              </h2>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Address Type
                </label>
                <select
                  name="address_type"
                  value={editingAddress.address_type}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
                >
                  <option value="home" className="text-black">
                    Home
                  </option>
                  <option value="office" className="text-black">
                    Office
                  </option>
                </select>
              </div>
              <Input
                label="Street"
                name="street"
                value={editingAddress.street}
                onChange={handleChange}
              />
              <Input
                label="Area"
                name="area"
                value={editingAddress.area}
                onChange={handleChange}
              />
              <Input
                label="Society Name"
                name="society_name"
                value={editingAddress.society_name}
                onChange={handleChange}
              />
              <Input
                label="Landmark"
                name="landmark"
                value={editingAddress.landmark}
                onChange={handleChange}
              />
              <Input
                label="City"
                name="city"
                value={editingAddress.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={editingAddress.state}
                onChange={handleChange}
              />
              <Input
                label="Pincode"
                name="pincode"
                value={editingAddress.pincode}
                onChange={handleChange}
              />
              <Input
                label="Location"
                name="location"
                value={editingAddress.location}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="w-full rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveAddress}
                className="w-full rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
      />
    </div>
  );
};

export default CheckoutAddressSection;
