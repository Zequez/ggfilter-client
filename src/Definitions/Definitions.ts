import * as filters from './filters';
import categories from './categories';
import Filter from './filters/lib/Filter';
import { filter } from '../FilterApp/filter/selectors';
import { Columns } from '../Api';

export type FiltersNames = keyof typeof filters; // Sorry, much simpler than using a generic type everywhere
export type FiltersMap = Map<FiltersNames, Filter>;
export type CategoriesNames = keyof typeof categories;
export type Category = { title: string, name: CategoriesNames, filters: FiltersNames[] };
export type CategoriesMap = Map<CategoriesNames, Category>;

export class Definitions {
  filters: FiltersMap;
  categories: CategoriesMap;
  categoriesList: Category[] = [];
  categoriesWithFilters: Map<CategoriesNames, Filter[]> = new Map();
  sortedFilters: Filter[] = [];
  sortedFiltersNames: FiltersNames[] = [];

  constructor (filters: FiltersMap, categories: CategoriesMap) {
    filters.forEach((filter, name) => filter.name = name);
    categories.forEach((category, name) => category.name = name);

    this.filters = filters;
    this.categories = categories;
    this.categoriesList = Array.from(categories.values());

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

  private setCategoriesWithFilters () {
    this.categories.forEach((category, categoryName) => {
      this.categoriesWithFilters.set(
        categoryName,
        category.filters.map((filterName) => {
          if (!this.filters.get(filterName)) throw `Filter ${filterName} is not defined`;
          return this.filters.get(filterName);
        })
      );
    });
  }

  private setSortedFilters () {
    this.sortedFilters = Array.from(this.categoriesWithFilters.values())
      .reduce((filters, moreFilters) => filters.concat(moreFilters));
  }

  private setSortedFiltersNames () {
    this.sortedFiltersNames = this.sortedFilters.map((f) => f.name);
  }
}

let namedFilters = new Map(<[FiltersNames, Filter][]>Object.entries(filters));
let mappedCategories = new Map(<[CategoriesNames, Category][]>Object.entries(categories));

export default new Definitions(namedFilters, mappedCategories);
