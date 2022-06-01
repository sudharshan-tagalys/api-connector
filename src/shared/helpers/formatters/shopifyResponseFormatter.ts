import Formatter from './formatter';

class ShopifyResponseFormatter extends Formatter {
  platformFieldTranslations(){
    return {
      __id: (data) => {
        return {
          key: 'id',
          value: parseInt(data.__id)
        }
      },
      name: 'title',
      price: 'compare_at_price',
      sale_price: 'price',
      introduced_at: 'published_at',
      shopify_tags: (data) => {
        if(Array.isArray(data.shopify_tags)){
          return {
            key: 'tags',
            value: data.shopify_tags
          }
        }
        return {
          key: 'tags',
          value: data.shopify_tags.split(", ").sort()
        }
      },
      _vendor: (data) => {
        if(Array.isArray(data._vendor)){
          return {
            key: 'vendor',
            value: data._vendor[0]
          }
        }
        return {
          key: 'vendor',
          value: data._vendor
        }
      },
      images: 'images',
      variants: 'variants'
    }
  }

  additionalPlatformFields(detail){
    return {
      handle: detail.link.split("/products/")[1]
    }
  }

  similarProducts(response){
    return {
      products: this.formatDetails(response.details)
    }
  }

  smartWidgets(response){
    return {
      name: response.name,
      widget_name: response.widget_name,
      products: this.formatDetails(response.details)
    }
  }

  searchSuggestions(response, configuration) {
    // move into searchSuggestions formatter class
    const getQueryString = (q, qf = {}) => {
      const { query, queryFilter } = configuration.queryString
      const baseQueryString = `?${query}=`;
      let str = ""
        if (typeof(qf) == 'undefined' || Object.keys(qf).length === 0) {
            return (baseQueryString + encodeURIComponent(q));
        } else {
            str = Object.keys(qf).map(function(key){
                return  encodeURIComponent(key) + "-"+ encodeURIComponent(qf[key])
            }).join('~');
            let qf_param = encodeURIComponent(`${queryFilter}`) + '=' + str;
            return baseQueryString.concat(encodeURIComponent(q) +"&"+ qf_param);
        }
    }

    const getFormattedQueries = (response) => {
      if (!response.queries) return []

      return response.queries.map((queryObj) => {
        let formattedQuery = {
          displayString: "",
          queryString: "",
          rawQuery: queryObj
        }

        if (typeof queryObj.query === 'string') {
          formattedQuery.displayString = queryObj.query
          formattedQuery.queryString = getQueryString(queryObj.query)
          return formattedQuery
        }

        if (Array.isArray(queryObj.query)) {
          if (queryObj.hasOwnProperty('in')) {
            const prefix = queryObj.query[0]
            const suffix = queryObj.in.hierarchy.map((item) => item.name).join(` ${configuration.hierachySeperator} `)
            const qf = {
              ...queryObj.filter,
              [`${queryObj.in.tag_set.id}`]: queryObj.in.hierarchy.map((item) => item.id),
            }
            formattedQuery.displayString = `${prefix} ${configuration.hierachySeperator} ${suffix}`
            formattedQuery.queryString = getQueryString(formattedQuery.displayString, qf)
          } else {
            formattedQuery.displayString = queryObj.query.join(` ${configuration.categorySeperator} `)
            formattedQuery.queryString = getQueryString(formattedQuery.displayString, queryObj.filter)
          }
        }

        return formattedQuery
      })
    }
    return {
      queries: getFormattedQueries(response),
      products: this.formatDetails(response.products)
    }
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

export default ShopifyResponseFormatter;