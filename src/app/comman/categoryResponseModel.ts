export class CategoryResponseModel {


   categoryName:string;
    categoryId:number;
   productRandomImageUrl:string;
   productCountInCategory: number;


  constructor(categoryName: string, productRandomImageUrl: string, productCountInCategory: number,categoryId: number) {
    this.categoryName = categoryName;
    this.productRandomImageUrl = productRandomImageUrl;
    this.productCountInCategory = productCountInCategory;
    this.categoryId = categoryId;
  }
}
