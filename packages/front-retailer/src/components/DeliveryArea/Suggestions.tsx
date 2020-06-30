import React from "react";
import { SuggestionsWrapper, ItemWrapper } from "./DeliveryArea.style";

type SuggestionsProps = {
  suggestions?: any;
  itemStyle?: any;
  wrapperStyle?: any;
  setSuggestionValue?: any;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  itemStyle,
  wrapperStyle,
  setSuggestionValue,
}) => {
  const setSuggestion = (suggestion: any) => {
    setSuggestionValue(suggestion);
  };

  return (
    <SuggestionsWrapper {...wrapperStyle}>
      {suggestions.map((suggestion: any) => (
        <ItemWrapper
          {...itemStyle}
          key={suggestion.id}
          onClick={() => setSuggestion(suggestion)}
        >
          {suggestion.description}
        </ItemWrapper>
      ))}
    </SuggestionsWrapper>
  );
};

export default Suggestions;
