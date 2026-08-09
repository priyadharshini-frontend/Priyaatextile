interface ShippingData {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Props {
  data: ShippingData;
  errors: Record<string, string>;
   onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
}

export default function ShippingForm({
  data,
  errors,
  onChange,
}: Props) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        {/* map pin icon */}

        <div>
          <h2 className="text-lg font-semibold">
            Shipping address
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4">

        {/* Address */}
        <Field label="Street address">
          <input
            name="address"
            value={data.address}
            onChange={onChange}
            placeholder="12, Anna Nagar, 3rd Cross"
            className={`${inputClass} ${
              errors.address
                ? "border-red-500"
                : ""
            }`}
          />

          {errors.address && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address}
            </p>
          )}
        </Field>

        {/* City / State / Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* City */}
          <Field label="City">
            <input
              name="city"
              value={data.city}
              onChange={onChange}
              placeholder="Chennai"
              className={`${inputClass} ${
                errors.city
                  ? "border-red-500"
                  : ""
              }`}
            />

            {errors.city && (
              <p className="mt-1 text-xs text-red-500">
                {errors.city}
              </p>
            )}
          </Field>

          {/* State */}
          <Field label="State">
            <select
              name="state"
              value={data.state}
              onChange={onChange}
              className={`${inputClass} ${
                errors.state
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="">
                Select State
              </option>

              <option value="Tamil Nadu">
                Tamil Nadu
              </option>

              <option value="Kerala">
                Kerala
              </option>

              <option value="Karnataka">
                Karnataka
              </option>

              <option value="Andhra Pradesh">
                Andhra Pradesh
              </option>

              <option value="Telangana">
                Telangana
              </option>

              <option value="Maharashtra">
                Maharashtra
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="Puducherry">
                Puducherry
              </option>

              {/* Add remaining states */}
            </select>

            {errors.state && (
              <p className="mt-1 text-xs text-red-500">
                {errors.state}
              </p>
            )}
          </Field>

          {/* Pincode */}
          <Field label="Pincode">
            <input
              name="pincode"
              value={data.pincode}
              onChange={onChange}
              placeholder="600040"
              maxLength={6}
              inputMode="numeric"
              className={`${inputClass} ${
                errors.pincode
                  ? "border-red-500"
                  : ""
              }`}
            />

            {errors.pincode && (
              <p className="mt-1 text-xs text-red-500">
                {errors.pincode}
              </p>
            )}
          </Field>

        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "h-10 rounded-xl border border-stone-200 bg-white text-sm text-gray-800 px-3 outline-none focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/10 placeholder:text-gray-300 transition";