export class Category {
  categoryId: number;
  categoryName: string;
  urlSlug: string;
  parentCat?: Category; // Optional if it can be null
  status: string;
  isExpanded: boolean;
  subCategories:Category[];


  constructor(
    categoryId: number,
    categoryName: string,
    urlSlug: string,
    status: string,
    parentCat?: Category,
    // @ts-ignore
    isExpanded:boolean,
    // @ts-ignore
    subCategories:Category[]
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.urlSlug = urlSlug;
    this.status = status;
    this.parentCat = parentCat;
    this.isExpanded = isExpanded;
    this.subCategories=subCategories;

  }
}
