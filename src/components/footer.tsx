import Link from "next/link";

export default function Footer() {
  return (
    <div
      className={`bg-[#fafafa] dark:bg-[#0a0a0a] md:mt-16 px-[20px] md:px-16 md:pt-16 pt-7 pb-24 md:pb-9 md:h-42 flex flex-col justify-between font-medium`}
    >
      {/* <img src="inline_logo.svg" className="h-16 w-auto mr-auto" /> */}
      <div className="flex flex-col md:flex-row justify-start md:items-center space-y-[14px] md:space-y-[unset] md:space-x-9 text-[13px] md:text-[14px] text-[#727272] cursor-pointer">
        <Link href="/#" className="hover:text-[#1a73e8] font-medium">
          GDGoC WOW AP 2025
        </Link>
        <Link href="/agenda" className="hover:text-[#1a73e8] font-medium">
          Agenda
        </Link>
        {/* <Link href="/speakers" className=" hover:text-[#1a73e8] font-medium">
          Speakers
        </Link> */}
        <Link href="/faq" className="hover:text-[#1a73e8] font-medium">
          FAQ
        </Link>
        <Link
          href="/terms-conditions"
          className="hover:text-[#1a73e8] font-medium"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/privacy-policy"
          className="hover:text-[#1a73e8] font-medium"
        >
          Privacy Policy
        </Link>
        <Link href="/coc" className="hover:text-[#1a73e8] font-medium">
          Community Guidelines
        </Link>
      </div>
    </div>
  );
}
