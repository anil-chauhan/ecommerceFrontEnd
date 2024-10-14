export class CategoryResponseModel {


   categoryName:string;
   productRandomImageUrl:string;
   productCountInCategory: number;


  constructor(categoryName: string, productRandomImageUrl: string, productCountInCategory: number) {
    this.categoryName = categoryName;
    this.productRandomImageUrl = productRandomImageUrl;
    this.productCountInCategory = productCountInCategory;
  }
}
