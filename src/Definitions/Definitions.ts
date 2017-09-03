import Filter from './filters/lib/Filter';

export type FiltersMap = {[k: string]: Filter};
export type Category = { title: string, filters: string[] };
export type CategoriesMap = {[k: string]: Category};

export class Definitions {
  filters: FiltersMap;
  categories: CategoriesMap;
  categoriesList: Category[] = [];
  categoriesWithFilters: {[k: string]: Filter[]} = {};
  private sortedFilters: Filter[] = [];
  private sortedFiltersNames: string[] = [];

  constructor (filters: FiltersMap, categories: CategoriesMap) {
    this.filters = filters;
    this.categories = categories;

    this.extendCategories(categories);
    this.setCategoriesWithFilters();
    this.setSortedFilters();
    this.setSortedFiltersNames();
  }

  normalizeParamsOrder (params, addMissing = true) {
    let newParams = {};
    let sortedNames = addMissing
      ? this.sortedFiltersNames
      : this.sortNames(Object.keys(params));
    sortedNames.forEach((name) => {
      newParams[name] = params[name] || false;
    });
    return newParams;
  }

  sortNames (names) {
    return this.sortedFiltersNames.filter((v) => names.indexOf(v) !== -1);
  }

  private extendCategories (categoriesDefinitions) {
    for (let name in categoriesDefinitions) {
      categoriesDefinitions[name].name = name;
      this.categoriesList.push(categoriesDefinitions[name]);
    }
  }

  private setCategoriesWithFilters () {
    for (let cat in this.categories) {
      this.categoriesWithFilters[cat] =
        this.categories[cat].filters.map((filterName) => {
          if (this.filters[filterName]) {
            return this.filters[filterName];
          } else {
            console.warn(`Filter ${filterName} is not defined`);
          }
        });
    }
  }

  private setSortedFilters () {
    this.sortedFilters = Object.values(this.categoriesWithFilters)
      .reduce((filters, moreFilters) => filters.concat(moreFilters));
  }

  private setSortedFiltersNames () {
    this.sortedFiltersNames = this.sortedFilters.map((f) => f.name);
  }
}
