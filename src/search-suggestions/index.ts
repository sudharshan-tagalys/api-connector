import APIConnector from "../lib/apiConnector";
import { DEFAULT_REQUEST_CALLBACKS, REQUEST_FORMAT } from "../shared/constants";
import localStorage from "../lib/localStorage";
import PopularSearches from "../popular-searches";
import {
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation,
  getURLEncodedQueryString,
  addToRecentSearch,
  removeRecentSearch,
  caseInsensitiveString,
  formatSearchItem,
  sortRecentSeaches
} from "../shared/helpers/common";
import debounce from "../lib/debounce";

const MAX_RECENT_SEARCHES_TO_DISPLAY = 5;
const MAX_SEARCHES_TO_DISPLAY = 10;

class SearchSuggestions extends APIConnector {
  getRequestOptions() {
    return {
      path: `ss`,
      format: REQUEST_FORMAT.JSON,
      params: {
        q: this.requestOptions.params.query,
        ...SearchSuggestions.defaultRequestOptions().params.request,
        products: this.requestOptions.params.request.products,
        queries: this.requestOptions.params.request.queries,
      },
    };
  }

  static exporterName() {
    return "SearchSuggestions";
  }

  extractAnalyticsData(response) {
    return false;
  }

  formatResponse(response: any) {
    return this.responseFormatter.searchSuggestions(
      response,
      this.requestOptions.configuration
    );
  }

  updateQuery(query) {
    this.requestOptions.params.query = query;
    this.call(this.requestOptions);
  }

  setQuery(query) {
    this.requestOptions.params.query = query
  }

  getHelpersToExpose() {
    return {
      updateQuery: debounce((query)=>this.updateQuery(query)),
      setQuery: (query) => this.setQuery(query),
      getPopularSearches: (callbackOptions = { }) => this.getPopularSearches(callbackOptions),
      addToRecentSearch: (query) => addToRecentSearch(query),
      removeRecentSearch: (query) => removeRecentSearch(query),
      getRequestParamsFromQueryString: (queryString) =>
        getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () =>
        getRequestParamsFromWindowLocation(),
      getURLEncodedQueryString: (baseUrl, params) =>
        getURLEncodedQueryString(baseUrl, params),
    };
  }

  new(requestOptions) {
    this.requestOptions = requestOptions;
    return this.getHelpersToExpose();
  }

  getSearchesToDisplay(recentSearches, popularSearches) {
    const popularSearchesDisplayStrings = popularSearches.map((popularSearch) =>
      caseInsensitiveString(popularSearch.displayString)
    );

    const commonSearches = recentSearches
      .filter((query) =>
        popularSearchesDisplayStrings.includes(
          caseInsensitiveString(query.displayString)
        )
      )
      .map((query) => caseInsensitiveString(query.displayString));

    const popularSearchesWithoutCommonSearches = popularSearches.filter(
      (query) =>
        !commonSearches.includes(caseInsensitiveString(query.displayString))
    );

    const recentSearchesToDisplay = recentSearches
      .slice(0, MAX_RECENT_SEARCHES_TO_DISPLAY)
      .map((searchItem) => {
        return {
          ...searchItem,
          type: "recent",
        };
      });
    const popularSearchesToDisplay = popularSearchesWithoutCommonSearches.map(
      (searchItem) => {
        return {
          ...searchItem,
          type: "popular",
        };
      }
    );
    return sortRecentSeaches(recentSearchesToDisplay)
      .concat(popularSearchesToDisplay)
      .slice(0, MAX_SEARCHES_TO_DISPLAY);
  }

  getPopularSearches(callbackOptions: any = {}) {
    return new Promise((resolve, reject) => {
      const recentSearches = localStorage.getItem("tagalysRecentSearches") || {
        queries: [],
      };
      const popularSearches = new PopularSearches();
      popularSearches
        .fetchPopularSearches(this.requestOptions.configuration, callbackOptions)
        .then((popularSearches: any) => {
          const searchesToDisplay = this.getSearchesToDisplay(
            recentSearches.queries,
            popularSearches.queries
          );
          resolve({
            recentSearches: searchesToDisplay.filter(
              (searchItem) => searchItem.type === "recent"
            ).map(formatSearchItem),
            popularSearches: searchesToDisplay.filter(
              (searchItem) => searchItem.type === "popular"
            ).map(formatSearchItem),
          });
        });
    });
  }

  static defaultRequestOptions() {
    return {
      ...DEFAULT_REQUEST_CALLBACKS,
      params: {
        request: {
          products: 10,
          queries: 10,
        },
      },
      configuration: {
        categorySeparator: "▸",
        hierarchySeparator: "->",
      },
    };
  }
}

export default SearchSuggestions;
