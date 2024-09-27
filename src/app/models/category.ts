export class Category {
  categoryId: number;
  categoryName: string;
  urlSlug: string;
  parentCat?: Category; // Optional if it can be null
  status: string;

  constructor(
    categoryId: number,
    categoryName: string,
    urlSlug: string,
    status: string,
    parentCat?: Category
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.urlSlug = urlSlug;
    this.status = status;
    this.parentCat = parentCat;
  }
}
