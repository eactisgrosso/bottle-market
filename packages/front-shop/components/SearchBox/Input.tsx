import React, { useRef, useEffect } from 'react';
import { SearchBox, SearchButton, SearchInputWrapper } from './SearchBox.style';
import { FormattedMessage, useIntl } from 'react-intl';

type InputProps = {
  type?: string;
  value?: number | string;
  buttonText?: string;
  inputClass?: string;
  buttonIcon?: React.ReactNode;
  intlButtonId?: string;
  placeholder?: React.ReactNode;
  intlPlaceholderId?: string;
  bordered?: boolean;
  showSvg?: boolean;
  style?: React.CSSProperties;
  onChange?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  onClick?: (e: any) => void;
};

const InputSearch: React.FC<InputProps> = ({
  type,
  value,
  buttonIcon,
  onChange,
  style,
  onKeyPress,
  onBlur,
  onClick,
  onFocus,
  bordered,
  showSvg,
  inputClass,
  intlPlaceholderId,
  intlButtonId,
}) => {
  const intl = useIntl();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [intlPlaceholderId]);

  return (
    <>
      <SearchInputWrapper
        style={style}
        bordered={bordered}
        showSvg={showSvg}
        className={`${inputClass} ${bordered === true ? 'bordered' : ''}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {showSvg && (
            <span className="searchIcon" onClick={onClick}>
              {buttonIcon}
            </span>
          )}
          <SearchBox
            ref={inputRef}
            type={type}
            value={value}
            placeholder={intl.formatMessage({
              id: intlPlaceholderId || 'enterAddress',
              defaultMessage: 'Enter your delivery address',
            })}
            onChange={onChange}
            onFocus={onFocus}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
          />
          {showSvg !== true ? (
            <SearchButton onClick={onClick}>
              {buttonIcon}
              <span className="buttonText">
                {intlButtonId && (
                  <FormattedMessage id={intlButtonId} defaultMessage={''} />
                )}
              </span>
            </SearchButton>
          ) : (
            ''
          )}
        </form>
      </SearchInputWrapper>
    </>
  );
};
export default InputSearch;
