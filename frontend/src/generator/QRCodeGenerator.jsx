import { QRCodeCanvas } from "qrcode.react";
import PropType from "prop-types";

const QRCodeGenerator = (props) => {

  return (
    <>
      <QRCodeCanvas value={props.loginLink || "http://localhost:5173/"} size={260} />
      <div className="flex gap-3 mt-5">
        <div className="flex h-6 shrink-0 items-center">
          <div className="group grid size-4 grid-cols-1">
            <input
              defaultChecked
              id="comments"
              name="comments"
              type="checkbox"
              aria-describedby="comments-description"
              className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#25D366] checked:bg-[#25D366] indeterminate:border-[#25D366] indeterminate:bg-[#25D366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto hover:cursor-pointer"
            />
            <svg
              fill="none"
              viewBox="0 0 14 14"
              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-has-[:checked]:opacity-100"
              />
              <path
                d="M3 7H11"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 group-has-[:indeterminate]:opacity-100"
              />
            </svg>
          </div>
        </div>
        <div className="text-sm/6">
          <label htmlFor="comments" className="font-medium text-slate-600">
            Stay logged in on this browser 
            <div className="relative group inline-block ms-1">
              <i className='bx bxs-info-circle hover:cursor-pointer'></i>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 text-[0.8rem]/5 bg-white shadow-xl border text-slate-700 text-center px-3 py-1 rounded hidden group-hover:block">
                If selected, you&apos;ll stay logged into WhatsApp Web after closing the browser tab.
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

QRCodeGenerator.propTypes = {
  loginLink: PropType.string,
}

export default QRCodeGenerator;
