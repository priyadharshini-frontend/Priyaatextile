interface ShippingData {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Props {
  data: ShippingData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShippingForm({ data, onChange }: Props) {
  return (
    <div className="mb-7">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        <span className="text-[#7A1F3D]">
          {/* map pin icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </span>
        Shipping address
      </h2>

      <div className="flex flex-col gap-4">
        <Field label="Street address">
          <input
            name="address"
            value={data.address}
            onChange={onChange}
            placeholder="12, Anna Nagar, 3rd Cross"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="City">
            <input
              name="city"
              value={data.city}
              onChange={onChange}
              placeholder="Chennai"
              className={inputClass}
            />
          </Field>
          <Field label="State">
            <input
              name="state"
              value={data.state}
              onChange={onChange}
              placeholder="Tamil Nadu"
              className={inputClass}
            />
          </Field>
          <Field label="Pincode">
            <input
              name="pincode"
              value={data.pincode}
              onChange={onChange}
              placeholder="600040"
              className={inputClass}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "h-10 rounded-xl border border-stone-200 bg-white text-sm text-gray-800 px-3 outline-none focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/10 placeholder:text-gray-300 transition";