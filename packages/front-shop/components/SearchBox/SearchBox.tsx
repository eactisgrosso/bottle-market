import InputSearch from "./Input";
import React, { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import SearchWrapper, {
  SearchBoxWrapper,
  CurrentType,
} from "./SearchBox.style";
import { SearchIcon } from "../AllSvgIcon";
import { FormattedMessage } from "react-intl";

type Suggestion = {
  id: string;
  description: string;
};
type SearchBoxProps = {
  suggestions?: Suggestion[];
  buttonIcon?: React.ReactNode;
  intlButtonId?: string;
  inputStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  bordered?: boolean;
  hideType?: boolean;
  showSvg?: boolean;
  expand?: boolean;
  minimal?: boolean;
  autoSuggestion?: boolean;
  intlPlaceholderId: string;
  className?: string;
  handleSearch?: Function;
  onSuggestionSelected?: Function;
  onClick?: Function;
  value?: any;
  pathname?: string;
  intlMenuId: string;
};

const Search: React.FC<SearchBoxProps> = ({
  suggestions,
  buttonIcon,
  intlButtonId,
  inputStyle,
  style,
  bordered,
  hideType,
  showSvg,
  autoSuggestion,
  className,
  handleSearch,
  onSuggestionSelected,
  onClick,
  value,
  expand,
  minimal,
  intlMenuId,
  intlPlaceholderId,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [toggleSuggestion, setToggleSuggestion] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  let searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleSearchInput = (event: any) => {
    setSearchValue(event.target.value);
    setToggleSuggestion(true);
    handleSearch(event.target.value);
  };

  const setSuggestion = (suggestion: Suggestion) => {
    setSearchValue(suggestion.description);
    setToggleSuggestion(false);
    onSuggestionSelected(suggestion);
  };

  const handleClickOutside = (event: any) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setToggleSuggestion(false);
      setToggleSearch(false);
    }
  };

  const onClearBtnClick = () => {
    setSearchValue("");
  };

  return (
    <SearchWrapper
      className={className}
      ref={searchRef}
      style={style}
      autoSuggestion={autoSuggestion}
      hideType={hideType}
      expand={expand}
    >
      <SearchBoxWrapper
        className={`${hideType ? "hideType" : ""} ${
          expand === true ? (toggleSearch ? "expanded" : "collapsed") : ""
        } ${minimal === true ? "minimal" : ""}`}
      >
        <CurrentType>
          {" "}
          <FormattedMessage id={intlMenuId} defaultMessage={"Vinos"} />
        </CurrentType>
        <InputSearch
          type="text"
          value={value}
          onChange={handleSearchInput}
          onFocus={() => setToggleSearch(true)}
          onBlur={() => setToggleSearch(false)}
          intlPlaceholderId={intlPlaceholderId}
          buttonIcon={buttonIcon}
          intlButtonId={intlButtonId}
          style={inputStyle}
          bordered={bordered}
          showSvg={showSvg}
          onClick={() => onClick(searchValue)}
        />
      </SearchBoxWrapper>
      {autoSuggestion && toggleSuggestion ? (
        <SearchResults
          suggestions={suggestions}
          clearSearch={onClearBtnClick}
          setSuggestionValue={(suggestion: Suggestion) =>
            setSuggestion(suggestion)
          }
        />
      ) : null}
    </SearchWrapper>
  );
};

Search.defaultProps = {
  bordered: false,
  autoSuggestion: false,
  buttonIcon: <SearchIcon />,
  inputStyle: {
    width: "100%",
  },
};

export default Search;
