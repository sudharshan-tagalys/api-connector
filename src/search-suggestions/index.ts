import APIConnector from "../lib/apiConnector";
import { DEFAULT_REQUEST_CALLBACKS, REQUEST_FORMAT } from "../shared/constants";
import localStorage from "../lib/localStorage";
import PopularSearches from "../popular-searches";
import {
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation,
  getURLEncodedQueryString,
  recordRecentSearch,
  removeRecentSearch,
  caseInsensitiveString,
  formatSearchItem,
  sortRecentSeaches,
  getRecentSearches,
  getEncodedQueryString
} from "../shared/helpers/common";
import debounce from "../lib/debounce";

class SearchSuggestions extends APIConnector {
  getDefaultResponseState = () => {
    return {
      products: [],
      queries: []
    }
  };

  public responseState = this.getDefaultResponseState()

  getRequestOptions() {
    let params = {
      q: this.requestOptions.params.query,
      ...SearchSuggestions.defaultRequestOptions().params.request
    }
    if (this.requestOptions.params.request) {
      params = {
        ...params,
        ...this.requestOptions.params.request
      }
    }
    return {
      path: `search_suggestions`,
      params: params,
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

  getHelpersToExpose(response, formattedResponse) {
    const queryStringHelpers = {
      getRequestParamsFromQueryString: (queryString) =>
        getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () =>
        getRequestParamsFromWindowLocation(),
      getURLEncodedQueryString: (baseUrl, params) =>
        getURLEncodedQueryString(baseUrl, params),
      getProducts: () => this.responseState.products,
      getTextSuggestions: () => this.responseState.queries
    }
    return {
      updateQuery: debounce((query) => this.updateQuery(query)),
      recordRecentSearch: (queryString) => recordRecentSearch(queryString),
      removeRecentSearch: (queryString) => removeRecentSearch(queryString),
      getRecentSearches: (limit) => this.getRecentSearches(limit),
      getPopularSearches: (limit) => this.getPopularSearches(limit),
      getRecentAndPopularSearches: (maxRecentSearches, maxTotalSearches, callbackOptions = {}) => {
        return this.getRecentAndPopularSearches(maxRecentSearches, maxTotalSearches, callbackOptions)
      },
      getEncodedQueryString: (queryParams) => getEncodedQueryString(queryParams),
      getRequestParamsFromQueryString: (queryString) => getRequestParamsFromQueryString(queryString),
      setQuery: (query) => this.setQuery(query),
      ...queryStringHelpers
    };
  }

  new(requestOptions) {
    this.requestOptions = requestOptions;
    return this.getHelpersToExpose(false, false);
  }

  getSearchesToDisplay(recentSearches, popularSearches, maxRecentSearches, maxTotalSearches) {
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
      .slice(0, maxRecentSearches)
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
      .slice(0, maxTotalSearches);
  }

  getRecentAndPopularSearches(maxRecentSearches, maxTotalSearches, callbackOptions: any = {}) {
    return new Promise((resolve, reject) => {
      let recentSearches = localStorage.getItem("tagalysRecentSearches") || {
        queries: [],
      };
      recentSearches.queries = sortRecentSeaches(recentSearches.queries)
      const popularSearches = new PopularSearches();
      popularSearches
        .fetchPopularSearches(this.requestOptions.configuration, callbackOptions)
        .then((popularSearches: any) => {
          const searchesToDisplay = this.getSearchesToDisplay(
            recentSearches.queries.slice(0, maxRecentSearches),
            popularSearches.queries,
            maxRecentSearches,
            maxTotalSearches
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

  getPopularSearches(limit) {
    return new Promise((resolve, _) => {
      const popularSearches = new PopularSearches();
      popularSearches
        .fetchPopularSearches(this.requestOptions.configuration)
        .then((popularSearches: any) => {
          resolve(popularSearches.queries.slice(0, limit))
        });
    });
  }

  getRecentSearches(limit){
    const recentSearches = getRecentSearches()
    const sortedRecentSearches = sortRecentSeaches(recentSearches.queries)
    return sortedRecentSearches.slice(0, limit)
  }

  internalSuccessCallback(_, formattedResponse){
    this.setResponseState(formattedResponse)
  }

  setResponseState(state){
    this.responseState = state
  }

  static defaultRequestOptions() {
    return {
      ...DEFAULT_REQUEST_CALLBACKS,
      params: {
        request: {
          products: { limit: 10 },
        },
      },
      configuration: {
        categorySeparator: "▸",
        hierarchySeparator: "➜",
      },
    };
  }
}

export default SearchSuggestions;
