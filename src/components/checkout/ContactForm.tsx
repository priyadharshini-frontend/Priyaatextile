interface ContactData {
  fullName: string;
  email: string;
  phone: string;
}

interface Props {
  data: ContactData;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function ContactForm({ data,errors, onChange }: Props) {
  return (
    <div className="mb-7">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        <span className="text-[#7A1F3D]">
          {/* user icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </span>
        Contact information
      </h2>

      <div className="flex flex-col gap-4">
       <Field label="Full name">
  <input
    name="fullName"
    value={data.fullName}
    onChange={onChange}
    placeholder="Priya Sharma"
    className={`${inputClass} ${
      errors.fullName
        ? "border-red-500"
        : ""
    }`}
  />

  {errors.fullName && (
    <p className="mt-1 text-xs text-red-500">
      {errors.fullName}
    </p>
  )}
</Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email address">
  <input
    name="email"
    type="email"
    value={data.email}
    onChange={onChange}
    placeholder="priya@example.com"
    className={`${inputClass} ${
      errors.email
        ? "border-red-500 focus:border-red-500"
        : ""
    }`}
  />

  {errors.email && (
    <p className="mt-1 text-xs text-red-500">
      {errors.email}
    </p>
  )}
</Field>
       <Field label="Phone number">
  <input
    name="phone"
    type="tel"
    value={data.phone}
    onChange={onChange}
    placeholder="98765 43210"
    maxLength={10}
    className={`${inputClass} ${
      errors.phone
        ? "border-red-500"
        : ""
    }`}
  />

  {errors.phone && (
    <p className="mt-1 text-xs text-red-500">
      {errors.phone}
    </p>
  )}
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