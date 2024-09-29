export class CategoryTree {

  categoryName: string;
  categoryId: number;
  subCategories:CategoryTree[];


  constructor(
    categoryName: string,
    categoryId: number,
    subCategories:CategoryTree[]
  ) {

    this.categoryName = categoryName;
    this.categoryId= categoryId;
    this.subCategories=subCategories;

  }
}
