import { TwInput } from "@/components/Forms/FieldInput";
import { useTranslations } from "@/hooks/useTranslations";
import type { Maybe } from "@/server/generated/graphql";
import React from "react";
import { MdSearch } from "react-icons/md";

export const Search: React.FC<{
  suggestions?: (Maybe<string> | undefined)[];
  search: string;
  onSearch?: (s: string) => void;
  disabled?: boolean;
}> = ({ search, onSearch, disabled }) => {
  const intl = useTranslations();
  return (
    <div
      className={`w-full inline-flex flex-col justify-center relative text-gray-500 `}
    >
      <div className={`relative`}>
        <input
          type="text"
          className={`pl-8 ${TwInput}`}
          name="search"
          placeholder={intl("SEARCH")}
          disabled={disabled}
          onChange={(e) => onSearch?.(e.target?.value)}
          value={search ?? ""}
        />
        <MdSearch className="absolute top-5 left-2.5 w-4 h-4" />
      </div>
      {/* <ul css={tw`bg-white border border-gray-100 w-full mt-2`}>
        {suggestions?.map((s) => (
          <li
            key={s}
            css={tw`pl-8 pr-2 py-1 border-gray-100 relative cursor-pointer hover:bg-gray-50 hover:text-gray-900`}
          >
            {s}
          </li>
        ))}
      </ul> */}
    </div>
  );
};
